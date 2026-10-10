// Checkout helpers. There is no payment provider: the customer pays by Mobile Money,
// quotes a reference, and Exia matches it against her MoMo history before dispatch.

import { formatPrice, SITE } from '@/data/site';

const REF_KEY = 'exia-order-ref';
// No 0/O or 1/I/L, so a reference read aloud or typed into MoMo can't be misread.
const REF_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

const newReference = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(4));
    return 'EXA-' + [...bytes].map((b) => REF_ALPHABET[b % REF_ALPHABET.length]).join('');
};

/** One reference per checkout: survives a refresh, replaced after an order is placed. */
export function getOrderReference() {
    try {
        const existing = sessionStorage.getItem(REF_KEY);
        if (existing) return existing;
        const ref = newReference();
        sessionStorage.setItem(REF_KEY, ref);
        return ref;
    } catch {
        return newReference();
    }
}

export function resetOrderReference() {
    try {
        sessionStorage.removeItem(REF_KEY);
    } catch {
        // nothing stored
    }
}

/** Accepts 0XX XXX XXXX or +233 XX XXX XXXX, ignoring spaces and dashes. */
export const isValidGhanaPhone = (value) => /^(?:\+?233|0)\d{9}$/.test(String(value).replace(/[\s-]/g, ''));

/** MoMo transaction IDs vary by network; require something ID-shaped rather than a guess at the format. */
export const isPlausibleTransactionId = (value) => /^[A-Za-z0-9.-]{6,30}$/.test(String(value).trim());

/**
 * The order as Exia reads it, in both the email and the WhatsApp message.
 * `order` is what CheckoutPage builds: { reference, customer, lines, subtotal, deliveryFee, total, payment, note }.
 */
export function formatOrderMessage(order) {
    const { reference, customer, lines, subtotal, deliveryFee, total, payment, note } = order;
    const items = lines.map((l) => `• ${l.qty} × ${l.product.name} — ${formatPrice(l.lineTotal)}`).join('\n');
    const delivery = deliveryFee == null ? 'to be confirmed' : formatPrice(deliveryFee);

    return [
        `NEW ORDER ${reference}`,
        '',
        `Customer: ${customer.name}`,
        `Phone: ${customer.phone}`,
        `Deliver to: ${customer.area} — ${customer.address}`,
        '',
        'Items:',
        items,
        '',
        `Subtotal: ${formatPrice(subtotal)}`,
        `Delivery: ${delivery}`,
        `Total paid: ${formatPrice(total)}`,
        '',
        `MoMo transaction ID: ${payment.transactionId}`,
        `Paid from: ${payment.senderName}`,
        `Sent to: ${SITE.momo.number} (${SITE.momo.networks})`,
        note ? `\nNote: ${note}` : '',
    ].join('\n').trim();
}

/**
 * Posts the order to Netlify Forms, which emails it to Exia. The matching hidden
 * <form name="order"> in index.html is what lets Netlify detect these fields at deploy.
 * Resolves true on success, false otherwise (e.g. local dev or a network failure).
 */
export async function submitOrder(order) {
    const fields = {
        'form-name': 'order',
        subject: `New order ${order.reference} — ${formatPrice(order.total)}`,
        reference: order.reference,
        customer_name: order.customer.name,
        customer_phone: order.customer.phone,
        delivery_area: order.customer.area,
        delivery_address: order.customer.address,
        items: order.lines.map((l) => `${l.qty} × ${l.product.name}`).join('; '),
        total: formatPrice(order.total),
        momo_transaction_id: order.payment.transactionId,
        momo_sender: order.payment.senderName,
        note: order.note,
        summary: formatOrderMessage(order),
    };

    try {
        const res = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(fields).toString(),
            signal: AbortSignal.timeout?.(10000),
        });
        return res.ok;
    } catch {
        return false;
    }
}

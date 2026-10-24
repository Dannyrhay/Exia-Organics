import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, LoaderCircle, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/cart/cart-context';
import {
    formatOrderMessage,
    getOrderReference,
    isPlausibleTransactionId,
    isValidGhanaPhone,
    resetOrderReference,
    submitOrder,
} from '@/cart/order';
import { shortName } from '@/data/products';
import { formatPrice, SITE, whatsappTextUrl } from '@/data/site';
import SectionHeading from '@/components/brand/SectionHeading';
import CopyButton from '@/components/ui/CopyButton';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import { useSeo } from '@/lib/seo';

const EMPTY_FORM = { name: '', phone: '', zone: '', area: '', address: '', note: '', transactionId: '', senderName: '' };

function validate(form, hasZones) {
    const errors = {};
    if (form.name.trim().length < 2) errors.name = 'Enter your full name.';
    if (!isValidGhanaPhone(form.phone)) errors.phone = 'Enter a Ghana number, e.g. 024 123 4567.';
    if (hasZones && !form.zone) errors.zone = 'Choose where we should deliver.';
    if (!hasZones && form.area.trim().length < 2) errors.area = 'Enter your town or area.';
    if (form.address.trim().length < 4) errors.address = 'Add a street, house number or landmark.';
    if (!isPlausibleTransactionId(form.transactionId)) errors.transactionId = 'Enter the transaction ID from your MoMo confirmation message.';
    if (form.senderName.trim().length < 2) errors.senderName = 'Enter the name on the MoMo account you paid from.';
    return errors;
}

const inputClass = (invalid) =>
    cn(
        'block w-full rounded-md bg-paper px-4 py-3 text-base text-ink ring-1 placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-indigo',
        invalid ? 'ring-destructive' : 'ring-line',
    );

function Field({ id, label, hint, error, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-medium text-ink">{label}</label>
            {children}
            {error ? (
                <p id={`${id}-error`} className="text-sm text-destructive">{error}</p>
            ) : hint ? (
                <p id={`${id}-hint`} className="text-xs text-ink-soft">{hint}</p>
            ) : null}
        </div>
    );
}

function Step({ n, title, children }) {
    return (
        <section aria-labelledby={`step-${n}`} className="flex flex-col gap-6 border-t border-line pt-8">
            <h2 id={`step-${n}`} className="flex items-baseline gap-3 font-display text-3xl text-indigo-deep">
                <span className="font-mono text-sm text-wood">{n}.</span>
                {title}
            </h2>
            {children}
        </section>
    );
}

function OrderSummary({ lines, subtotal, deliveryFee, total }) {
    return (
        <div className="rounded-md bg-paper p-5 ring-1 ring-line">
            <h2 className="font-display text-2xl text-indigo-deep">Your order</h2>
            <ul className="mt-4 divide-y divide-line">
                {lines.map(({ product, qty, lineTotal }) => (
                    <li key={product.id} className="flex items-center gap-3 py-3">
                        <img src={product.imageUrl} alt="" className="size-14 shrink-0 rounded-sm bg-shea-deep object-cover object-[50%_72%]" />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-ink">{shortName(product)}</p>
                            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
                                {qty} × {formatPrice(product.price)}{product.onSale ? ' (sale)' : ''}{product.size ? ` · ${product.size}` : ''}
                            </p>
                        </div>
                        <p className="whitespace-nowrap font-mono text-sm text-indigo">{formatPrice(lineTotal)}</p>
                    </li>
                ))}
            </ul>
            <dl className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-sm">
                <div className="flex justify-between"><dt className="text-ink-soft">Subtotal</dt><dd className="font-mono">{formatPrice(subtotal)}</dd></div>
                <div className="flex justify-between gap-4">
                    <dt className="text-ink-soft">Delivery</dt>
                    <dd className="text-right font-mono">{deliveryFee == null ? 'Confirmed on WhatsApp' : formatPrice(deliveryFee)}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3 text-base">
                    <dt className="font-semibold text-indigo-deep">To pay now</dt>
                    <dd className="font-mono text-lg text-indigo-deep">{formatPrice(total)}</dd>
                </div>
            </dl>
            <Link to="/products" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-indigo underline underline-offset-4">
                <ArrowLeft className="size-4" aria-hidden="true" /> Keep shopping
            </Link>
        </div>
    );
}

function OrderPlaced({ order, emailed }) {
    const headingRef = useRef(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        headingRef.current?.focus();
    }, []);

    return (
        <section className="mx-auto flex max-w-2xl flex-col gap-8 px-4 pb-24 pt-12 sm:px-6 md:pt-16">
            <div className="flex flex-col gap-4">
                <p className="eyebrow text-wood">Order {order.reference}</p>
                <h1 ref={headingRef} tabIndex={-1} className="font-display text-[clamp(2.4rem,7vw,4rem)] leading-[1.02] text-indigo-deep focus:outline-none">
                    {emailed ? 'Order received.' : 'Almost done.'} <em className="italic text-indigo">{emailed ? 'Thank you.' : 'One more tap.'}</em>
                </h1>
                <p className="text-base leading-relaxed text-ink-soft md:text-lg">
                    {emailed
                        ? 'We have your order. Send it to us on WhatsApp too, so we can confirm your payment and delivery faster.'
                        : "We couldn't reach our order inbox. Send your order on WhatsApp to complete it. Everything is already written for you."}
                </p>
            </div>

            <a
                href={whatsappTextUrl(formatOrderMessage(order))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-leaf px-8 text-base font-semibold text-shea hover:bg-leaf/90"
            >
                <WhatsAppIcon className="size-5" /> Send order on WhatsApp
            </a>

            <div className="rounded-md bg-paper p-6 ring-1 ring-line">
                <h2 className="font-display text-2xl text-indigo-deep">What happens next</h2>
                <ol className="mt-5 flex flex-col gap-4 text-sm leading-relaxed text-ink">
                    {[
                        `We check that ${formatPrice(order.total)} with reference ${order.reference} has arrived in our MoMo account.`,
                        order.deliveryFee == null
                            ? 'We message you on WhatsApp to confirm your payment and agree the delivery fee.'
                            : 'We message you on WhatsApp to confirm your payment and delivery time.',
                        'Your order is packed and sent to you.',
                    ].map((step, i) => (
                        <li key={step} className="grid grid-cols-[2rem_1fr] items-baseline gap-3">
                            <span className="font-mono text-wood">{i + 1}.</span>
                            <span>{step}</span>
                        </li>
                    ))}
                </ol>
                <p className="mt-5 text-xs text-ink-soft">
                    Questions? Call {SITE.phoneDisplay} ({SITE.hours}) and quote {order.reference}.
                </p>
            </div>

            <Link to="/products" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-indigo hover:underline hover:underline-offset-4">
                Back to the shop <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
        </section>
    );
}

export default function CheckoutPage() {
    const { lines, subtotal, clear } = useCart();
    const zones = SITE.deliveryZones;
    const hasZones = zones.length > 0;

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | submitting | done
    const [placed, setPlaced] = useState(null); // { order, emailed }
    const [reference] = useState(getOrderReference);
    const formRef = useRef(null);
    useSeo({ title: 'Checkout', noindex: true });

    const zone = zones.find((z) => z.id === form.zone);
    const deliveryFee = hasZones ? (zone?.fee ?? 0) : null;
    const total = subtotal + (deliveryFee ?? 0);
    const momoDigits = useMemo(() => SITE.momo.number.replace(/\s/g, ''), []);

    if (placed) return <OrderPlaced order={placed.order} emailed={placed.emailed} />;

    if (lines.length === 0) {
        return (
            <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center gap-6 px-4 py-20 sm:px-6">
                <SectionHeading as="h1" eyebrow="Checkout" title="Your cart is" accent="empty.">
                    Add a few products first, then come back here to pay with Mobile Money.
                </SectionHeading>
                <Link to="/products" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-indigo px-6 text-sm font-semibold text-shea hover:bg-indigo-deep">
                    Browse the shop <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
            </section>
        );
    }

    const update = (key) => (e) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        if (errors[key]) setErrors((errs) => ({ ...errs, [key]: undefined }));
    };

    const fieldProps = (key) => ({
        id: `checkout-${key}`,
        name: key,
        value: form[key],
        onChange: update(key),
        'aria-invalid': Boolean(errors[key]),
        'aria-describedby': errors[key] ? `checkout-${key}-error` : `checkout-${key}-hint`,
        className: inputClass(errors[key]),
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        const found = validate(form, hasZones);
        setErrors(found);
        const firstInvalid = Object.keys(found)[0];
        if (firstInvalid) {
            formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
            return;
        }

        const order = {
            reference,
            customer: {
                name: form.name.trim(),
                phone: form.phone.trim(),
                area: hasZones ? zone.label : form.area.trim(),
                address: form.address.trim(),
            },
            lines,
            subtotal,
            deliveryFee,
            total,
            payment: { transactionId: form.transactionId.trim(), senderName: form.senderName.trim() },
            note: form.note.trim(),
        };

        setStatus('submitting');
        const emailed = await submitOrder(order);
        clear();
        resetOrderReference();
        setPlaced({ order, emailed });
    };

    return (
        <div className="pb-24 pt-12 md:pt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading as="h1" eyebrow="Checkout" title="Pay with" accent="Mobile Money.">
                    Three short steps. No account needed.
                </SectionHeading>

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
                    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex min-w-0 flex-col gap-12 lg:col-span-7">
                        <Step n={1} title="Your details">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <Field id="checkout-name" label="Full name" error={errors.name}>
                                    <input {...fieldProps('name')} autoComplete="name" />
                                </Field>
                                <Field id="checkout-phone" label="Phone number" hint="We'll confirm your order on this number." error={errors.phone}>
                                    <input {...fieldProps('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="024 123 4567" />
                                </Field>
                                {hasZones ? (
                                    <Field id="checkout-zone" label="Delivery area" error={errors.zone}>
                                        <select {...fieldProps('zone')}>
                                            <option value="">Choose an area</option>
                                            {zones.map((z) => (
                                                <option key={z.id} value={z.id}>{z.label} · {formatPrice(z.fee)}</option>
                                            ))}
                                        </select>
                                    </Field>
                                ) : (
                                    <Field id="checkout-area" label="Town or area" hint={SITE.deliveryNote} error={errors.area}>
                                        <input {...fieldProps('area')} autoComplete="address-level2" placeholder="e.g. East Legon, Accra" />
                                    </Field>
                                )}
                                <Field id="checkout-address" label="Street, house or landmark" error={errors.address}>
                                    <input {...fieldProps('address')} autoComplete="street-address" placeholder="e.g. House 12, opposite the Shell station" />
                                </Field>
                                <div className="sm:col-span-2">
                                    <Field id="checkout-note" label="Note (optional)" hint="Delivery times, gate codes, anything we should know.">
                                        <textarea {...fieldProps('note')} rows={2} className={cn(inputClass(false), 'resize-y')} />
                                    </Field>
                                </div>
                            </div>
                        </Step>

                        <Step n={2} title="Send the payment">
                            <div className="flex flex-col gap-5 rounded-md bg-indigo-deep p-6 text-shea">
                                <div className="flex flex-wrap items-end justify-between gap-4">
                                    <div>
                                        <p className="eyebrow text-lid">Amount</p>
                                        <p className="font-mono text-3xl">{formatPrice(total)}</p>
                                    </div>
                                    <p className="eyebrow text-shea/60">{SITE.momo.networks}</p>
                                </div>
                                <dl className="grid grid-cols-1 gap-4 border-t border-shea/15 pt-5 sm:grid-cols-2">
                                    <div>
                                        <dt className="eyebrow text-lid">Send to</dt>
                                        <dd className="flex items-center gap-1">
                                            <span className="font-mono text-xl">{SITE.momo.number}</span>
                                            <CopyButton value={momoDigits} label="MoMo number" className="text-shea hover:bg-shea/10" />
                                        </dd>
                                        <dd className="text-sm text-shea/70">{SITE.momo.accountName}</dd>
                                    </div>
                                    <div>
                                        <dt className="eyebrow text-lid">Reference</dt>
                                        <dd className="flex items-center gap-1">
                                            <span className="font-mono text-xl tracking-wider">{reference}</span>
                                            <CopyButton value={reference} label="order reference" className="text-shea hover:bg-shea/10" />
                                        </dd>
                                        <dd className="text-sm text-shea/70">Type this in the payment note</dd>
                                    </div>
                                </dl>
                            </div>
                            <ol className="flex flex-col gap-3 text-sm leading-relaxed text-ink">
                                {[
                                    'Open your MoMo app, or dial your network’s MoMo short code.',
                                    `Send ${formatPrice(total)} to ${SITE.momo.number}. Check the name shows as ${SITE.momo.accountName}.`,
                                    `Use ${reference} as the reference.`,
                                    'Copy the transaction ID from the confirmation message you receive.',
                                ].map((s, i) => (
                                    <li key={s} className="grid grid-cols-[2rem_1fr] items-baseline gap-3">
                                        <span className="font-mono text-wood">{i + 1}.</span>
                                        <span>{s}</span>
                                    </li>
                                ))}
                            </ol>
                        </Step>

                        <Step n={3} title="Confirm your payment">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <Field id="checkout-transactionId" label="MoMo transaction ID" hint="From your MoMo confirmation SMS." error={errors.transactionId}>
                                    <input {...fieldProps('transactionId')} autoComplete="off" spellCheck={false} placeholder="e.g. 52867130947" className={cn(inputClass(errors.transactionId), 'font-mono')} />
                                </Field>
                                <Field id="checkout-senderName" label="Name on the MoMo account you paid from" error={errors.senderName}>
                                    <input {...fieldProps('senderName')} autoComplete="off" />
                                </Field>
                            </div>
                            <p className="flex items-start gap-2 text-sm text-ink-soft">
                                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-leaf" aria-hidden="true" />
                                We check every payment against our MoMo account before sending your order. We will never ask for your MoMo PIN.
                            </p>
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-indigo px-8 text-base font-semibold text-shea hover:bg-indigo-deep disabled:opacity-70 sm:w-auto sm:self-start"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> Placing order…
                                    </>
                                ) : (
                                    <>Place order · {formatPrice(total)}</>
                                )}
                            </button>
                            {/* New tab, so reading them doesn't throw away what's been typed here. */}
                            <p className="text-sm text-ink-soft">
                                By placing your order you agree to our{' '}
                                <a href="/terms" target="_blank" rel="noopener" className="text-indigo underline underline-offset-4">terms &amp; conditions</a>{' '}
                                and{' '}
                                <a href="/privacy" target="_blank" rel="noopener" className="text-indigo underline underline-offset-4">privacy policy</a>.
                            </p>
                        </Step>
                    </form>

                    <aside className="min-w-0 lg:col-span-5">
                        <div className="lg:sticky lg:top-24">
                            <OrderSummary lines={lines} subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

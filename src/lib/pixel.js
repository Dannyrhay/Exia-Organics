// Meta (Facebook) Pixel, for measuring Facebook and Instagram ads. It stays off until
// both are true: a Pixel ID is entered under "Site → Contact, payment & delivery" in the
// dashboard, and the visitor taps "Accept" on the cookie banner. Until then nothing is
// loaded from Meta and no cookies are set. Only shopping events are sent (which products,
// cart value) — never names, phone numbers, addresses or MoMo details.
import settings from '/content/settings.json';

const rawId = String(settings.metaPixelId ?? '').trim();
// Pixel IDs are all digits; anything else (a pasted snippet, a typo) leaves the pixel off.
const PIXEL_ID = /^\d{10,20}$/.test(rawId) ? rawId : '';
const CONSENT_KEY = 'exia-tracking-consent';
export const CONSENT_EVENT = 'exia-consent-change';

export const pixelEnabled = Boolean(PIXEL_ID);

let started = false;
let lastPage = null;

/** 'granted', 'denied', or null while the visitor hasn't chosen. */
export function getConsent() {
    try {
        return localStorage.getItem(CONSENT_KEY);
    } catch {
        return null;
    }
}

/** Records the visitor's choice; null asks again (the footer's "Cookie settings"). */
export function setConsent(value) {
    try {
        if (value) localStorage.setItem(CONSENT_KEY, value);
        else localStorage.removeItem(CONSENT_KEY);
    } catch {
        // storage blocked: the choice lasts for this page view only
    }
    if (value === 'granted') start();
    else if (started) window.fbq('consent', 'revoke');
    window.dispatchEvent(new Event(CONSENT_EVENT));
}

function start() {
    if (!PIXEL_ID) return;
    if (started) {
        window.fbq('consent', 'grant');
        return;
    }
    started = true;

    // Meta's standard loader: queue calls until fbevents.js arrives, then it replays them.
    if (!window.fbq) {
        const fbq = function () {
            if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
            else fbq.queue.push(arguments);
        };
        window.fbq = fbq;
        window._fbq = window._fbq || fbq;
        fbq.push = fbq;
        fbq.loaded = true;
        fbq.version = '2.0';
        fbq.queue = [];
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        document.head.appendChild(script);
    }
    window.fbq('init', PIXEL_ID);
    trackPage(window.location.pathname + window.location.search, true);
}

/** Starts the pixel on page load for visitors who accepted on an earlier visit. */
export function initPixel() {
    if (getConsent() === 'granted') start();
}

/** One PageView per address. The app is a single page, so route changes report themselves. */
export function trackPage(path, force = false) {
    if (path === lastPage && !force) return;
    lastPage = path;
    if (started) window.fbq('track', 'PageView');
}

/** A standard event such as 'AddToCart' or 'Purchase'. Does nothing while the pixel is off. */
export function track(event, params) {
    if (started) window.fbq('track', event, params);
}

/** Meta's product fields for a list of { product, qty } cart lines. */
export const cartParams = (lines, value) => ({
    content_type: 'product',
    content_ids: lines.map((l) => l.product.id),
    contents: lines.map((l) => ({ id: l.product.id, quantity: l.qty })),
    num_items: lines.reduce((n, l) => n + l.qty, 0),
    value,
    currency: 'GHS',
});

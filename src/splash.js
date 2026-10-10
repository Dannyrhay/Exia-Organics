// Drives the inline splash in index.html: advances the gold progress line at real
// milestones (app code → fonts → hero photo), then lifts the indigo curtain.

const SEEN_KEY = 'exia-splash-seen';
const MIN_VISIBLE_MS = 1200; // long enough for the leaf to finish drawing
const MAX_VISIBLE_MS = 3000; // never hold the page hostage on a slow connection

let started = false;

const heroLoaded = () =>
    new Promise((resolve) => {
        const img = document.querySelector('img[fetchpriority="high"]');
        if (!img || img.complete) return resolve();
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
    });

export function runSplash() {
    if (started) return; // StrictMode runs effects twice in development
    started = true;

    const el = document.getElementById('splash');
    if (!el) return;
    if (document.documentElement.classList.contains('no-splash')) {
        el.remove();
        return;
    }

    const progress = (value) => el.style.setProperty('--p', String(value));
    progress(0.4); // the app has booted

    const fonts = (document.fonts?.ready ?? Promise.resolve()).then(() => {
        el.classList.add('fonts-ready');
        progress(0.7);
    });
    const ready = Promise.all([fonts, heroLoaded()]);
    // performance.now() counts from navigation start, so both limits are page-relative.
    const timeout = new Promise((resolve) => setTimeout(resolve, Math.max(0, MAX_VISIBLE_MS - performance.now())));

    Promise.race([ready, timeout]).then(() => {
        progress(1);
        const hold = Math.max(0, MIN_VISIBLE_MS - performance.now()) + 250; // let the line finish
        setTimeout(() => {
            el.classList.add('fonts-ready', 'is-leaving');
            try {
                sessionStorage.setItem(SEEN_KEY, '1');
            } catch {
                // storage blocked (private mode): the splash simply shows again next load
            }
            const remove = () => el.remove();
            el.addEventListener('transitionend', remove, { once: true });
            setTimeout(remove, 1200);
        }, hold);
    });
}

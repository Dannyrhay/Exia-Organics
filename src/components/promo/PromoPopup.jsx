import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { isLive } from '@/lib/schedule';
import { useOverlay } from '@/lib/useOverlay';
import promotions from '/content/promotions.json';
import PromoLink from './PromoLink';

// Each visitor sees a given popup once; editing its headline or start date counts as a new popup.
const seenKey = (p) => `exia-popup-seen:${p.headline}|${p.start ?? ''}`;
// Never interrupt someone paying, or the admin.
const QUIET_PATHS = ['/checkout'];

function alreadySeen(p) {
    try {
        return localStorage.getItem(seenKey(p)) === '1';
    } catch {
        return false;
    }
}

/** A one-time promo popup, switched on under Promotions in the dashboard. */
export default function PromoPopup() {
    const p = promotions.popup;
    const { pathname } = useLocation();
    const reduce = useReducedMotion();
    const [open, setOpen] = useState(false);
    const closeRef = useRef(null);

    const eligible = isLive(p) && Boolean(p.headline) && !QUIET_PATHS.includes(pathname);

    useEffect(() => {
        if (!eligible || alreadySeen(p)) return undefined;
        const timer = setTimeout(() => setOpen(true), Math.max(0, Number(p.delaySeconds) || 0) * 1000);
        return () => clearTimeout(timer);
    }, [eligible, p]);

    const close = useCallback(() => {
        setOpen(false);
        try {
            localStorage.setItem(seenKey(p), '1');
        } catch {
            // storage blocked: it may show again on a later visit
        }
    }, [p]);

    useOverlay(open, close);
    useEffect(() => {
        if (open) closeRef.current?.focus();
    }, [open]);

    return createPortal(
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
                    <motion.div
                        aria-hidden="true"
                        className="absolute inset-0 bg-indigo-deep/60 backdrop-blur-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="promo-popup-title"
                        className="relative w-full max-w-md overflow-hidden rounded-md bg-shea shadow-2xl"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <button
                            ref={closeRef}
                            type="button"
                            onClick={close}
                            aria-label="Close"
                            className="absolute right-3 top-3 z-10 inline-flex size-11 items-center justify-center rounded-full bg-paper/90 text-indigo-deep hover:bg-paper"
                        >
                            <X className="size-5" aria-hidden="true" />
                        </button>
                        {p.image && <img src={p.image} alt="" className="aspect-[16/10] w-full bg-shea-deep object-cover object-[50%_62%]" />}
                        <div className="flex flex-col gap-4 p-6 sm:p-8">
                            <h2 id="promo-popup-title" className="font-display text-3xl leading-tight text-indigo-deep">
                                {p.headline}
                            </h2>
                            {p.text && <p className="leading-relaxed text-ink-soft">{p.text}</p>}
                            <div className="mt-2 flex flex-wrap items-center gap-3">
                                {p.buttonText && p.buttonUrl && (
                                    <PromoLink
                                        href={p.buttonUrl}
                                        onClick={close}
                                        className="inline-flex min-h-12 items-center rounded-full bg-indigo px-7 text-base font-semibold text-shea hover:bg-indigo-deep"
                                    >
                                        {p.buttonText}
                                    </PromoLink>
                                )}
                                <button type="button" onClick={close} className="min-h-11 px-2 text-sm text-ink-soft underline underline-offset-4 hover:text-indigo">
                                    No thanks
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body,
    );
}

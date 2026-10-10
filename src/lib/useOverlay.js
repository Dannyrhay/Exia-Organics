import { useEffect } from 'react';

// Counted, so two overlays (menu + cart) can't unlock each other early.
let locks = 0;

/** Stops the page behind an open overlay from scrolling, and runs `onEscape` on Esc. */
export function useOverlay(active, onEscape) {
    useEffect(() => {
        if (!active) return undefined;
        locks += 1;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => e.key === 'Escape' && onEscape?.();
        window.addEventListener('keydown', onKey);
        return () => {
            locks -= 1;
            if (locks === 0) document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [active, onEscape]);
}

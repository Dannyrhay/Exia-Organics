import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONSENT_EVENT, getConsent, pixelEnabled, setConsent, trackPage } from '@/lib/pixel';

/**
 * Reports page views to the Meta Pixel and asks first-time visitors for permission.
 * Renders nothing when no Pixel ID is set in the dashboard.
 */
export default function Tracking() {
    const { pathname, search } = useLocation();
    const [consent, setConsentState] = useState(getConsent);

    useEffect(() => {
        trackPage(pathname + search);
    }, [pathname, search]);

    useEffect(() => {
        const sync = () => setConsentState(getConsent());
        window.addEventListener(CONSENT_EVENT, sync);
        return () => window.removeEventListener(CONSENT_EVENT, sync);
    }, []);

    if (!pixelEnabled || consent) return null;

    return (
        <section
            aria-label="Cookie choice"
            className="fixed inset-x-3 bottom-3 z-[60] flex flex-col gap-4 rounded-md bg-indigo-deep p-5 text-shea shadow-2xl sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-md"
        >
            <p className="text-sm leading-relaxed text-shea/85">
                May we use Meta (Facebook) cookies to see which of our ads brought you here? Nothing is shared unless you accept.{' '}
                <Link to="/privacy" className="text-lid underline underline-offset-4">
                    Privacy policy
                </Link>
            </p>
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => setConsent('granted')}
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-lid px-5 text-sm font-semibold text-indigo-deep hover:bg-shea sm:flex-none"
                >
                    Accept
                </button>
                <button
                    type="button"
                    onClick={() => setConsent('denied')}
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-5 text-sm font-semibold text-shea ring-1 ring-shea/40 hover:bg-shea/10 sm:flex-none"
                >
                    No thanks
                </button>
            </div>
        </section>
    );
}

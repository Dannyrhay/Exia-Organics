import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isLive } from '@/lib/schedule';
import promotions from '/content/promotions.json';
import PromoLink from './PromoLink';

const STYLES = {
    indigo: { bar: 'bg-indigo-deep text-shea', link: 'text-lid' },
    gold: { bar: 'bg-lid text-indigo-deep', link: 'text-indigo-deep' },
    leaf: { bar: 'bg-leaf text-shea', link: 'text-shea' },
    wood: { bar: 'bg-wood text-shea', link: 'text-shea' },
};

// Dismissing hides this message for the rest of the visit; a new message shows again.
const keyFor = (a) => `exia-announcement-hidden:${a.message}`;

/** The thin strip above the navigation, switched on under Promotions in the dashboard. */
export default function AnnouncementBar() {
    const a = promotions.announcement;
    const [hidden, setHidden] = useState(() => {
        try {
            return sessionStorage.getItem(keyFor(a ?? {})) === '1';
        } catch {
            return false;
        }
    });

    if (!isLive(a) || !a.message || hidden) return null;
    const style = STYLES[a.style] ?? STYLES.indigo;

    const dismiss = () => {
        setHidden(true);
        try {
            sessionStorage.setItem(keyFor(a), '1');
        } catch {
            // storage blocked: it simply shows again on the next page load
        }
    };

    return (
        <div role="region" aria-label="Announcement" className={cn('relative', style.bar)}>
            <div className="mx-auto flex min-h-11 max-w-7xl items-center justify-center gap-x-3 gap-y-1 px-12 py-2 text-center text-sm font-medium max-sm:flex-col">
                <p>{a.message}</p>
                {a.linkText && a.linkUrl && (
                    <PromoLink href={a.linkUrl} className={cn('inline-flex items-center gap-1 font-semibold underline underline-offset-4', style.link)}>
                        {a.linkText} <ArrowRight className="size-3.5" aria-hidden="true" />
                    </PromoLink>
                )}
            </div>
            <button
                type="button"
                onClick={dismiss}
                aria-label="Hide announcement"
                className="absolute right-1 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full opacity-80 hover:opacity-100"
            >
                <X className="size-4" aria-hidden="true" />
            </button>
        </div>
    );
}

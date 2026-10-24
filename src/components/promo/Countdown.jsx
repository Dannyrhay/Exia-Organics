import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const pad = (n) => String(n).padStart(2, '0');

function partsUntil(end, now) {
    const ms = Math.max(0, end - now);
    const s = Math.floor(ms / 1000);
    return { ms, days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}

/** Live "ends in" timer for a promo. Renders nothing once the end time has passed. */
export default function Countdown({ end, tone = 'light', className }) {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    const t = partsUntil(end, now);
    if (t.ms <= 0) return null;

    const units = [
        ['Days', t.days],
        ['Hrs', t.hours],
        ['Min', t.minutes],
        ['Sec', t.seconds],
    ];

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <p className={cn('eyebrow', tone === 'light' ? 'text-lid' : 'text-wood')}>Ends in</p>
            {/* Screen readers get one calm sentence instead of a number changing every second. */}
            <p className="sr-only">
                {t.days} days, {t.hours} hours and {t.minutes} minutes left.
            </p>
            <ol aria-hidden="true" className="flex gap-2">
                {units.map(([label, value]) => (
                    <li
                        key={label}
                        className={cn(
                            'flex min-w-16 flex-col items-center rounded-md px-3 py-2',
                            tone === 'light' ? 'bg-shea/10 text-shea ring-1 ring-shea/15' : 'bg-paper text-indigo-deep ring-1 ring-line',
                        )}
                    >
                        <span className="font-mono text-2xl tabular-nums leading-none sm:text-3xl">{label === 'Days' ? value : pad(value)}</span>
                        <span className="mt-1 font-mono text-[11px] uppercase tracking-wider opacity-70">{label}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}

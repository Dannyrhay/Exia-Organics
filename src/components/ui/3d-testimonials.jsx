import React, { useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';

export function Marquee({
    className,
    reverse = false,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
    ariaLabel,
    ariaLive = 'off',
    ariaRole = 'marquee',
    ...props
}) {
    const marqueeRef = useRef(null);

    const repeatedContent = useMemo(
        () => (
            <>
                {Array.from({ length: repeat }, (_, i) => (
                    <div
                        key={i}
                        className={cn(
                            'marquee-track flex shrink-0 justify-around [gap:var(--gap)]',
                            !vertical ? 'flex-row animate-marquee' : 'flex-col',
                            vertical && (reverse ? 'animate-marquee-vertical-reverse' : 'animate-marquee-vertical'),
                        )}
                    >
                        {children}
                    </div>
                ))}
            </>
        ),
        [repeat, children, vertical, reverse],
    );

    return (
        <div
            {...props}
            ref={marqueeRef}
            data-slot="marquee"
            className={cn(
                'flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
                vertical ? 'h-full min-h-0 flex-col' : 'flex-row',
                pauseOnHover && 'marquee-root',
                className,
            )}
            aria-label={ariaLabel}
            aria-live={ariaLive}
            role={ariaRole}
            tabIndex={0}
        >
            {repeatedContent}
        </div>
    );
}

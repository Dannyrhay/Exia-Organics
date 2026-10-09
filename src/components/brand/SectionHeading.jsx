import { cn } from '@/lib/utils';

/**
 * Mono eyebrow + Bodoni heading. Pass `accent` for the italic second phrase,
 * e.g. <SectionHeading eyebrow="Shop" title="Start with" accent="your hair." />
 */
export default function SectionHeading({ eyebrow, title, accent, children, align = 'left', tone = 'dark', as: Tag = 'h2', className }) {
    const light = tone === 'light';
    return (
        <div className={cn('flex max-w-2xl flex-col gap-4', align === 'center' && 'mx-auto items-center text-center', className)}>
            {eyebrow && (
                <p className={cn('font-mono text-xs uppercase tracking-[0.18em]', light ? 'text-lid' : 'text-wood')}>
                    {eyebrow}
                </p>
            )}
            <Tag
                className={cn(
                    'font-display text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.02] tracking-[-0.01em]',
                    light ? 'text-shea' : 'text-indigo-deep',
                )}
            >
                {title}
                {accent && (
                    <>
                        {' '}
                        <em className={cn('italic', light ? 'text-lid' : 'text-indigo')}>{accent}</em>
                    </>
                )}
            </Tag>
            {children && (
                <p className={cn('max-w-xl text-base leading-relaxed md:text-lg', light ? 'text-shea/75' : 'text-ink-soft')}>
                    {children}
                </p>
            )}
        </div>
    );
}

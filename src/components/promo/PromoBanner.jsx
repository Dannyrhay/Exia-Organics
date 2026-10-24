import { ArrowRight } from 'lucide-react';
import { endsAt, isLive } from '@/lib/schedule';
import promotions from '/content/promotions.json';
import Reveal from '@/components/brand/Reveal';
import Countdown from './Countdown';
import PromoLink from './PromoLink';

/** The home-page promo, switched on under Promotions in the dashboard. */
export default function PromoBanner() {
    const b = promotions.banner;
    if (!isLive(b) || !b.headline) return null;
    const end = endsAt(b);

    return (
        <section aria-label="Current promotion" className="px-4 pb-16 sm:px-6 lg:px-8">
            <Reveal className="relative mx-auto grid max-w-7xl overflow-hidden rounded-md bg-indigo-deep text-shea md:grid-cols-2">
                {/* Soft lid-gold glow, the brand's accent, behind the copy. */}
                <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-lid/20 blur-3xl" />

                <div className="relative flex flex-col gap-6 p-6 sm:p-10 lg:p-14">
                    {b.eyebrow && <p className="eyebrow text-lid">{b.eyebrow}</p>}
                    <h2 className="font-display text-[clamp(2.1rem,5.5vw,3.6rem)] leading-[1.02] tracking-[-0.01em]">{b.headline}</h2>
                    {b.text && <p className="max-w-md text-base leading-relaxed text-shea/80 md:text-lg">{b.text}</p>}
                    {b.countdown && end && <Countdown end={end} />}
                    {b.buttonText && b.buttonUrl && (
                        <PromoLink
                            href={b.buttonUrl}
                            className="inline-flex min-h-12 items-center gap-2 self-start rounded-full bg-lid px-7 text-base font-semibold text-indigo-deep transition-colors hover:bg-shea"
                        >
                            {b.buttonText} <ArrowRight className="size-4" aria-hidden="true" />
                        </PromoLink>
                    )}
                </div>

                {b.image && (
                    <div className="relative min-h-64 md:min-h-full">
                        <img src={b.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover object-[50%_62%]" />
                        {/* Blend the photo into the indigo panel on wide screens. */}
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-indigo-deep/60 to-transparent md:bg-gradient-to-r md:from-indigo-deep md:via-indigo-deep/10" />
                    </div>
                )}
            </Reveal>
        </section>
    );
}

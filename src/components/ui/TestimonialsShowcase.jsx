import { Play } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/Card';
import { Marquee } from '@/components/ui/3d-testimonials';
import { cn } from '@/lib/utils';

function TestimonialCard({ img, name, username, body, country, isVideo }) {
    return (
        <Card className="w-[280px] shrink-0 border-line bg-paper shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4">
                <div className="flex items-center gap-2.5">
                    <Avatar className="size-9 ring-2 ring-wood/20">
                        <AvatarImage src={img} alt={name} />
                        <AvatarFallback className="bg-indigo/10 text-indigo font-semibold">
                            {name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                        <figcaption className="text-sm font-semibold text-indigo flex items-center gap-1 truncate">
                            {name}
                            <span className="text-xs font-normal">{country}</span>
                        </figcaption>
                        <p className="text-xs font-medium text-wood truncate">{username}</p>
                    </div>
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-4">
                    {body}
                </blockquote>
                {isVideo && (
                    <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-indigo/5 px-2.5 py-1 text-xs font-medium text-indigo">
                        <Play className="size-3 fill-current" />
                        Video review
                    </span>
                )}
            </CardContent>
        </Card>
    );
}

function MarqueeColumn({ testimonials, reverse = false, className }) {
    return (
        <div className={cn('h-full min-h-0 w-[280px] shrink-0', className)}>
            <Marquee
                vertical
                pauseOnHover
                reverse={reverse}
                repeat={4}
                className="h-full min-h-0 [--duration:45s] [--gap:1.25rem]"
                ariaLabel="Customer testimonials"
            >
                {testimonials.map((review) => (
                    <TestimonialCard key={`${review.name}-${review.username}`} {...review} />
                ))}
            </Marquee>
        </div>
    );
}

export default function TestimonialsShowcase({ testimonials, className }) {
    const columnOne = testimonials.filter((_, index) => index % 2 === 0);
    const columnTwo = testimonials.filter((_, index) => index % 2 === 1);

    return (
        <div
            className={cn(
                'relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center overflow-hidden rounded-3xl border border-line bg-paper px-4 py-8 shadow-sm',
                'h-[520px] sm:h-[560px] md:h-[600px]',
                className,
            )}
        >
            <div
                className="relative flex h-full w-full max-w-[900px] flex-row items-center justify-center gap-3 overflow-hidden [perspective:300px] md:gap-4"
                style={{
                    transform:
                        'translateX(-40px) translateY(0px) translateZ(-80px) rotateX(18deg) rotateY(-8deg) rotateZ(8deg)',
                }}
            >
                <div className="h-full min-h-0 hidden sm:block">
                    <MarqueeColumn testimonials={columnOne} />
                </div>
                <div className="h-full min-h-0">
                    <MarqueeColumn testimonials={columnTwo} reverse />
                </div>
                <div className="h-full min-h-0 hidden md:block">
                    <MarqueeColumn testimonials={columnOne} />
                </div>
                <div className="h-full min-h-0 hidden lg:block">
                    <MarqueeColumn testimonials={columnTwo} reverse />
                </div>

                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white to-transparent" />
            </div>
        </div>
    );
}

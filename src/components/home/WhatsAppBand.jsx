import { SITE } from '@/data/site';
import WhatsAppButton from '@/components/brand/WhatsAppButton';
import Reveal from '@/components/brand/Reveal';

export default function WhatsAppBand() {
    return (
        <section className="bg-wood py-16 text-shea md:py-20">
            <Reveal className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                <div className="max-w-2xl">
                    <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.05]">
                        Not sure where to start? <em className="italic">Tell us about your hair.</em>
                    </h2>
                    <p className="mt-4 text-shea/80">
                        Send a message on WhatsApp and we'll suggest a routine. {SITE.hours}.
                    </p>
                </div>
                <WhatsAppButton variant="light" className="min-h-13 shrink-0 px-7 text-base">
                    Chat on WhatsApp
                </WhatsAppButton>
            </Reveal>
        </section>
    );
}

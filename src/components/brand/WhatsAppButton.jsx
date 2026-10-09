import { cn } from '@/lib/utils';
import { whatsappUrl } from '@/data/site';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';

const variants = {
    solid: 'bg-leaf text-shea hover:bg-leaf/90',
    outline: 'border border-current text-leaf hover:bg-leaf hover:text-shea',
    light: 'bg-shea text-indigo-deep hover:bg-paper',
};

/** Opens a WhatsApp chat pre-filled with an order for `product` (or a general enquiry). */
export default function WhatsAppButton({ product, children = 'Order on WhatsApp', variant = 'solid', className, ...props }) {
    return (
        <a
            href={whatsappUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors',
                variants[variant],
                className,
            )}
            {...props}
        >
            <WhatsAppIcon className="size-4 shrink-0" aria-hidden="true" />
            {children}
        </a>
    );
}

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Icon button that copies `value`; `label` names it for screen readers ("Copy phone"). */
export default function CopyButton({ value, label, className }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef();
    useEffect(() => () => clearTimeout(timer.current), []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
        } catch {
            return; // clipboard blocked (e.g. insecure context); the text stays selectable
        }
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? `${label} copied` : `Copy ${label}`}
            className={cn('inline-flex size-11 shrink-0 items-center justify-center rounded-full text-indigo hover:bg-shea-deep', className)}
        >
            {copied ? <Check className="size-4 text-leaf" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        </button>
    );
}

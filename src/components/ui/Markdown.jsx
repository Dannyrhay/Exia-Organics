import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// No typography plugin: style the plain tags the dashboard's editor produces.
const proseClass = [
    'max-w-[65ch] text-lg leading-[1.75] text-ink',
    '[&_p]:mb-6 [&_p:last-child]:mb-0',
    '[&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:text-indigo-deep',
    '[&_h3]:mb-3 [&_h3]:mt-10 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:text-indigo-deep',
    '[&_ul]:mb-6 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-6',
    '[&_ol]:mb-6 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-6 [&_li]:marker:text-wood',
    '[&_strong]:font-semibold [&_strong]:text-indigo-deep',
    '[&_a]:text-indigo [&_a]:underline [&_a]:underline-offset-4',
    '[&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-lid [&_blockquote]:pl-5 [&_blockquote]:font-display [&_blockquote]:text-xl [&_blockquote]:italic',
    '[&_img]:my-8 [&_img]:rounded-md',
].join(' ');

// Site links navigate in-app; everything else opens in a new tab.
function SmartLink({ href = '', children }) {
    if (href.startsWith('/')) return <Link to={href}>{children}</Link>;
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
}

/** Renders admin-written Markdown. Raw HTML is ignored, so pasted markup can't break the page. */
export default function Markdown({ children, className, prose = true }) {
    return (
        <div className={cn(prose && proseClass, className)}>
            <ReactMarkdown components={{ a: SmartLink }}>{children ?? ''}</ReactMarkdown>
        </div>
    );
}

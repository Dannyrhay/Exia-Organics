import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPost, posts } from '@/data/blog';
import WhatsAppButton from '@/components/brand/WhatsAppButton';
import NotFoundPage from './NotFoundPage';
import JsonLd from '@/components/seo/JsonLd';
import { absoluteUrl, breadcrumbSchema, siteOrigin, useSeo } from '@/lib/seo';

// No typography plugin: style the post body's plain tags here.
const prose = [
    'max-w-[65ch] text-lg leading-[1.75] text-ink',
    '[&_p]:mb-6',
    '[&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:text-indigo-deep',
    '[&_ul]:mb-6 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-6 [&_li]:marker:text-wood',
    '[&_strong]:font-semibold [&_strong]:text-indigo-deep',
].join(' ');

const BlogPostDetail = () => {
    const { id } = useParams();
    const post = getPost(id);
    useSeo(post ? { title: post.title, description: post.summary, image: post.imageUrl, type: 'article' } : { title: 'Article not found', noindex: true });
    if (!post) return <NotFoundPage title="We couldn't find that article." />;

    const next = posts[(posts.indexOf(post) + 1) % posts.length];

    return (
        <article className="pb-24 pt-10 md:pt-14">
            <JsonLd
                data={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.title,
                        description: post.summary,
                        image: absoluteUrl(post.imageUrl),
                        datePublished: new Date(post.date).toISOString().slice(0, 10),
                        author: { '@type': 'Organization', name: 'Exia Organics', url: siteOrigin() },
                        publisher: { '@type': 'Organization', name: 'Exia Organics', logo: { '@type': 'ImageObject', url: absoluteUrl('/apple-touch-icon.png') } },
                        mainEntityOfPage: `${siteOrigin()}/blog/${post.id}`,
                    },
                    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: post.title, path: `/blog/${post.id}` }]),
                ]}
            />
            <header className="mx-auto max-w-4xl px-4 sm:px-6">
                <Link to="/blog" className="inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-soft hover:text-indigo">
                    <ArrowLeft className="size-3.5" aria-hidden="true" /> Journal
                </Link>
                <p className="mt-8 eyebrow text-wood">
                    {post.category} · {post.date} · {post.readTime} min read
                </p>
                <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,4.4rem)] leading-[1.02] tracking-[-0.01em] text-indigo-deep">
                    {post.title}
                </h1>
                <p className="mt-6 max-w-2xl font-display text-xl italic leading-snug text-indigo">{post.summary}</p>
            </header>

            <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
                <img src={post.imageUrl} alt="" fetchPriority="high" className="aspect-[16/9] w-full rounded-md bg-shea-deep object-cover" />
            </div>

            <div className="mx-auto mt-14 grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_300px]">
                <div className={prose}>{post.content}</div>

                <aside className="flex flex-col gap-4 self-start rounded-md bg-indigo-deep p-6 text-shea lg:sticky lg:top-24">
                    <p className="font-display text-2xl leading-snug">Want a routine built around <em className="italic text-lid">your</em> hair?</p>
                    <p className="text-sm text-shea/75">Message us and we'll suggest the right products.</p>
                    <WhatsAppButton variant="light" className="w-full">Ask on WhatsApp</WhatsAppButton>
                    <Link to="/products" className="py-2 text-center text-sm text-shea/80 underline underline-offset-4 hover:text-lid">or browse the shop</Link>
                </aside>
            </div>

            <div className="mx-auto mt-20 max-w-6xl border-t border-line px-4 pt-10 sm:px-6">
                <p className="eyebrow text-wood">Read next</p>
                <Link to={`/blog/${next.id}`} className="mt-3 block font-display text-3xl text-indigo-deep hover:underline hover:decoration-1 hover:underline-offset-8">
                    {next.title}
                </Link>
            </div>
        </article>
    );
};

export default BlogPostDetail;

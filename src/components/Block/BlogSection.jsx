import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { posts } from '@/data/blog';
import SectionHeading from '@/components/brand/SectionHeading';
import Reveal from '@/components/brand/Reveal';

/** Latest journal entries for the home page. Links use the same ids as /blog/:id. */
export function BlogSection({ limit = 3 }) {
    const latest = posts.slice(0, limit);

    return (
        <section className="border-t border-line bg-paper py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <SectionHeading eyebrow="Journal" title="Notes from" accent="wash day." />
                    <Link to="/blog" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-indigo hover:underline hover:underline-offset-4 md:self-auto">
                        All articles <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>

                <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
                    {latest.map((post, i) => (
                        <Reveal as="article" key={post.id} delay={i * 0.06}>
                            <Link to={`/blog/${post.id}`} className="group flex flex-col gap-4">
                                <div className="aspect-[3/2] overflow-hidden rounded-md bg-shea-deep">
                                    <img
                                        src={post.imageUrl}
                                        alt=""
                                        loading="lazy"
                                        className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                    />
                                </div>
                                <p className="eyebrow text-wood">
                                    {post.category} · {post.readTime} min read
                                </p>
                                <h3 className="font-display text-2xl leading-tight text-indigo-deep group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                                    {post.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-ink-soft">{post.summary}</p>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

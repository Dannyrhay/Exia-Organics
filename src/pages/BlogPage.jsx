import { Link } from 'react-router-dom';
import { posts } from '@/data/blog';
import SectionHeading from '@/components/brand/SectionHeading';

const BlogPage = () => {
    const [lead, ...rest] = posts;

    return (
        <div className="pb-24 pt-12 md:pt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading as="h1" eyebrow="Journal" title="Notes from" accent="wash day.">
                    Ingredients, routines and honest advice for natural and textured hair.
                </SectionHeading>

                <Link to={`/blog/${lead.id}`} className="group mt-12 grid gap-6 border-b border-line pb-14 md:grid-cols-2 md:items-center md:gap-10">
                    <div className="aspect-[4/3] overflow-hidden rounded-md bg-shea-deep">
                        <img src={lead.imageUrl} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wood">{lead.category} · {lead.readTime} min read</p>
                        <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] text-indigo-deep group-hover:underline group-hover:decoration-1 group-hover:underline-offset-8">
                            {lead.title}
                        </h2>
                        <p className="max-w-md leading-relaxed text-ink-soft">{lead.summary}</p>
                    </div>
                </Link>

                <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post) => (
                        <article key={post.id}>
                            <Link to={`/blog/${post.id}`} className="group flex flex-col gap-4">
                                <div className="aspect-[3/2] overflow-hidden rounded-md bg-shea-deep">
                                    <img src={post.imageUrl} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                                </div>
                                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wood">{post.category} · {post.readTime} min read</p>
                                <h2 className="font-display text-2xl leading-tight text-indigo-deep group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                                    {post.title}
                                </h2>
                                <p className="text-sm leading-relaxed text-ink-soft">{post.summary}</p>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;

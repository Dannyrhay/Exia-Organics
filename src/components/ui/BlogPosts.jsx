import { cn } from "@/lib/utils";
import { MoveRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BlogPosts = ({
  title,
  description,
  backgroundLabel,
  backgroundPosition = "left",
  posts = [],
  className,
  onPostClick,
}) => {
  const navigate = useNavigate();

  const handlePostClick = (post) => {
    if (onPostClick) {
      onPostClick(post);
    } else {
      navigate(`/blog/${post.id}`);
    }
  };

  const featuredPosts = posts.slice(0, 3);
  const remainingPosts = posts.slice(3);

  const BlogPostCard = ({ post, isFeaturedBig = false, className }) => {
    const {
      id,
      title: postTitle,
      category,
      imageUrl,
      views,
      readTime,
      rating = 4,
    } = post;

    return (
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={cn(
          "group relative flex size-full cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-cover bg-center bg-no-repeat p-5 text-white transition-all duration-300 hover:scale-[0.98] hover:rotate-[0.3deg] shadow-lg",
          isFeaturedBig ? "h-[650px]" : "h-[300px]",
          className
        )}
        onClick={() => handlePostClick(post)}
      >
        <div className="absolute inset-0 -z-0 h-[130%] w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:h-full" />

        <article className="relative z-0 flex items-end">
          <div className="flex flex-1 flex-col gap-3">
            <h1 className={cn(
              "font-semibold font-serif text-white/90",
              isFeaturedBig ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"
            )}>
              {postTitle}
            </h1>
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider py-1 px-3 rounded-full bg-white/20 w-fit text-white backdrop-blur-md border border-white/10">
                {category}
              </span>
              <div className="flex items-center gap-2 text-white/80">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      width={14}
                      height={14}
                      key={idx}
                      strokeWidth={0}
                      fill={idx < rating ? "#dda85d" : "#ffffff40"}
                    />
                  ))}
                </div>
                {isFeaturedBig && (
                  <span className="text-sm font-light">
                    ({views} Views)
                  </span>
                )}

              </div>
              {isFeaturedBig && readTime && (
                <div className="text-sm font-medium text-white/90">
                  {readTime} min read
                </div>
              )}
            </div>
          </div>
          <MoveRight
            className="transition-all duration-300 group-hover:translate-x-2 text-white"
            width={isFeaturedBig ? 32 : 24}
            height={isFeaturedBig ? 32 : 24}
            strokeWidth={1.5}
          />
        </article>
      </div>
    );
  };

  return (
    <section className={cn(
      "w-full max-w-[1400px] relative py-10 mx-auto px-4 md:px-8 overflow-hidden",
      className
    )}>
      <h1 className="text-center text-4xl font-semibold capitalize !leading-[1.4] md:text-5xl lg:text-6xl mb-2 font-serif text-[#1e3a5f]">
        {title}
      </h1>

      {backgroundLabel && (
        <span
          className={cn(
            "absolute -top-10 -z-50 select-none text-[120px] font-extrabold leading-[1] text-[#3a2e20]/[0.05] md:text-[200px] lg:text-[300px]",
            backgroundPosition === "left" ? "-left-[10%]" : "-right-[10%]"
          )}
        >
          {backgroundLabel}
        </span>
      )}

      <p className="mx-auto max-w-[800px] text-center text-xl !leading-[2] text-[#3a2e20]/70 md:text-2xl mb-12 font-sans">
        {description}
      </p>

      {/* Featured Grid (1 Big Left, 2 Small Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 md:h-[650px]">
        {/* Left Column - Big Card */}
        <div className="md:h-full">
          {featuredPosts[0] && (
            <BlogPostCard post={featuredPosts[0]} isFeaturedBig={true} className="h-full" />
          )}
        </div>

        {/* Right Column - 2 Small Cards Stacked */}
        <div className="grid grid-rows-2 gap-5 h-full">
          {featuredPosts[1] && (
            <BlogPostCard post={featuredPosts[1]} className="h-full" />
          )}
          {featuredPosts[2] && (
            <BlogPostCard post={featuredPosts[2]} className="h-full" />
          )}
        </div>
      </div>

      {/* Remaining Posts Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {remainingPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} className="h-[300px]" />
        ))}
      </div>

    </section>
  );
};

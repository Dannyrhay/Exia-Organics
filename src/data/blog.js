// Journal posts and tutorials, edited in the admin dashboard and stored one file
// each in content/journal/*.json. `body` is Markdown.

const files = import.meta.glob('/content/journal/*.json', { eager: true, import: 'default' });

const WORDS_PER_MINUTE = 200;
const dateLabel = (iso) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const posts = Object.entries(files)
    .map(([path, data]) => {
        const slug = path.split('/').pop().replace(/\.json$/, '');
        const words = (data.body ?? '').trim().split(/\s+/).filter(Boolean).length;
        return {
            ...data,
            id: slug,
            slug,
            imageUrl: data.cover ?? '',
            readTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
            dateLabel: dateLabel(data.date),
        };
    })
    // Newest first.
    .sort((a, b) => new Date(b.date) - new Date(a.date));

/** Finds a post by slug, or by the numeric id it had before the dashboard existed. */
export const getPost = (key) =>
    posts.find((p) => p.slug === key) ?? posts.find((p) => String(p.legacyId) === String(key));

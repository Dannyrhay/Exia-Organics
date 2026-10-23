import { Play } from 'lucide-react';

// youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
const youtubeId = (url) =>
    url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)?.[1];

/**
 * A tutorial video: YouTube links play inline (privacy-enhanced mode, no cookies until
 * played); any other link, such as TikTok or Instagram, becomes a "Watch" button.
 */
export default function VideoEmbed({ url, title }) {
    if (!url) return null;
    const id = youtubeId(url);

    if (id) {
        return (
            <div className="aspect-video w-full overflow-hidden rounded-md bg-indigo-deep">
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}`}
                    title={title ? `Video: ${title}` : 'Tutorial video'}
                    loading="lazy"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="size-full"
                />
            </div>
        );
    }

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-indigo px-6 text-sm font-semibold text-shea hover:bg-indigo-deep"
        >
            <Play className="size-4 fill-current" aria-hidden="true" /> Watch the video
        </a>
    );
}

// The About page and the home page's "Our story" section. Edited under "About us" in the
// admin dashboard (/admin) and stored in content/about.json.
import about from '/content/about.json';

export const ABOUT = {
    ...about,
    // Brand promises, shown on both pages. Keep this list honest.
    promises: (about.promises ?? []).filter((p) => p.title),
};

/**
 * Splits the home page quote around its highlighted word, so that word can be set in
 * italics: { before, word, after }. With no (or no matching) highlight, it's all `before`.
 */
export function splitQuote(quote = '', highlight = '') {
    const at = highlight ? quote.indexOf(highlight) : -1;
    if (at < 0) return { before: quote, word: '', after: '' };
    return { before: quote.slice(0, at), word: highlight, after: quote.slice(at + highlight.length) };
}

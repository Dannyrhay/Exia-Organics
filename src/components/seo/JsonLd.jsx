/**
 * Structured data for search engines (schema.org JSON-LD). Google reads it from
 * anywhere in the rendered page, so it can sit next to the content it describes.
 */
export default function JsonLd({ data }) {
    // "<" is escaped so text inside the data can never close the script tag early.
    const json = JSON.stringify(data).replace(/</g, '\\u003c');
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

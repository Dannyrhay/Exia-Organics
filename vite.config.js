import path from "path"
import fs from "fs"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from '@tailwindcss/vite'

// Public site address. Netlify sets URL to the primary domain (custom domain
// included) during its builds; set SITE_URL yourself to override it anywhere else.
const SITE_URL = (process.env.SITE_URL || process.env.URL || "").replace(/\/$/, "")
// Exposed to index.html as %VITE_SITE_URL% and to the app as import.meta.env.VITE_SITE_URL.
process.env.VITE_SITE_URL = SITE_URL

/** Pull numeric ids out of a data file without importing it (it imports images). */
const idsIn = (file) =>
  [...fs.readFileSync(path.resolve(__dirname, file), "utf8").matchAll(/^\s{4,8}id:\s*(\d+),/gm)].map((m) => m[1])

/** Emits robots.txt and, when the site URL is known, sitemap.xml at build time. */
function seoFiles() {
  return {
    name: "exia-seo-files",
    apply: "build",
    generateBundle() {
      const robots = ["User-agent: *", "Allow: /", "Disallow: /checkout", ""]
      if (SITE_URL) {
        const today = new Date().toISOString().slice(0, 10)
        const paths = [
          "/", "/products", "/about", "/blog", "/testimonials", "/faqs", "/contact",
          ...idsIn("src/data/products.js").map((id) => `/product/${id}`),
          ...idsIn("src/data/blog.jsx").map((id) => `/blog/${id}`),
        ]
        const urls = paths
          .map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`)
          .join("\n")
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        })
        robots.push(`Sitemap: ${SITE_URL}/sitemap.xml`, "")
      } else {
        this.warn("SITE_URL/URL not set: skipped sitemap.xml (Netlify sets URL automatically).")
      }
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots.join("\n") })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

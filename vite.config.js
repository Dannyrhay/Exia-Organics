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

/** File names (slugs) in a content folder, e.g. content/products/hair-growth-butter.json. */
const slugsIn = (dir) =>
  fs.readdirSync(path.resolve(__dirname, dir)).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""))

/** Emits robots.txt and, when the site URL is known, sitemap.xml at build time. */
function seoFiles() {
  return {
    name: "exia-seo-files",
    apply: "build",
    generateBundle() {
      const robots = ["User-agent: *", "Allow: /", "Disallow: /checkout", "Disallow: /admin/", ""]
      if (SITE_URL) {
        const today = new Date().toISOString().slice(0, 10)
        const paths = [
          "/", "/products", "/about", "/blog", "/testimonials", "/faqs", "/contact",
          ...slugsIn("content/products").map((slug) => `/product/${slug}`),
          ...slugsIn("content/journal").map((slug) => `/blog/${slug}`),
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

/** In dev, serve the admin at /admin like Netlify does (instead of the SPA fallback). */
function adminInDev() {
  return {
    name: "exia-admin-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === "/admin" || req.url === "/admin/") req.url = "/admin/index.html"
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles(), adminInDev()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

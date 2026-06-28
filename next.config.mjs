/** @type {import('next').NextConfig} */
const nextConfig = {
    // Cache robots.txt and sitemap.xml at the CDN edge so search-engine crawlers
    // are served from an always-available edge copy instead of hitting the origin
    // Node app (which can cold-start / hit resource limits on shared hosting and
    // make these files momentarily "unreachable"). stale-while-revalidate lets the
    // edge keep serving the last good copy even while revalidating to the origin.
    async headers() {
        const crawlerCache = {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        };
        // Content-hashed build assets never change for a given hash → cache
        // them forever. These are the chunks the HTML references.
        const immutableAsset = {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
        };
        // HTML documents must NOT be edge-cached for a year. Next.js's default
        // for static pages is s-maxage=31536000, so a stale CDN copy keeps
        // serving HTML that references JS chunk hashes deleted on a later
        // deploy → 404 chunks → "client-side exception". A short s-maxage with
        // stale-while-revalidate keeps the CDN fast (and shields the origin
        // from load spikes) while letting stale HTML self-heal within ~1 min
        // of a deploy instead of persisting for up to a year.
        const htmlCache = {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=60, stale-while-revalidate=60",
        };
        return [
            { source: "/robots.txt", headers: [crawlerCache] },
            { source: "/sitemap.xml", headers: [crawlerCache] },
            { source: "/_next/static/:path*", headers: [immutableAsset] },
            // Page documents only: skip _next internals, /api, /admin, and any
            // path with a file extension (static files keep their own caching).
            { source: "/((?!_next/|api/|admin|.*\\.).*)", headers: [htmlCache] },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;

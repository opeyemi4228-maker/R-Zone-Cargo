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
        return [
            { source: "/robots.txt", headers: [crawlerCache] },
            { source: "/sitemap.xml", headers: [crawlerCache] },
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

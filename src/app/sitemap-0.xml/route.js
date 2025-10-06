// Example: fetch blog slugs dynamically from an API, database, or filesystem
async function getBlogSlugs() {
  // Replace this with your actual data source
  const res = await fetch("https://www.eveningdeserttours.com/api/blogs");
  const blogs = await res.json();
  return blogs.map(b => b.slug);
}

export async function GET() {
  const baseUrl = "https://www.eveningdeserttours.com";

  // Dynamic blog URLs
  const blogSlugs = await getBlogSlugs();

  // Static pages
  const staticUrls = [
    "/",
    "/about-us",
    "/contact-us",
    "/gallery",
    "/packages",
    "/faqs",
    "/blogs",
  ];

  const allUrls = [
    ...staticUrls.map(path => `${baseUrl}${path}`),
    ...blogSlugs.map(slug => `${baseUrl}/blogs/${slug}`),
  ];

  const urlsXml = allUrls
    .map(url => `<url><loc>${url}</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`)
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urlsXml}
  </urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

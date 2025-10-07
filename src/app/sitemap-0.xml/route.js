let cachedXml = null;
let lastGenerated = 0;

async function getBlogSlugs() {
  const res = await fetch("https://www.eveningdeserttours.com/api/blogs", {
    cache: "no-store",
  });
  const blogs = await res.json();
  return blogs.map(b => b.slug);
}

export async function GET() {
  const now = Date.now();

  // Regenerate only once every 24 hours
  if (cachedXml && now - lastGenerated < 86400000) {
    return new Response(cachedXml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }

  const baseUrl = "https://www.eveningdeserttours.com";

  const blogSlugs = await getBlogSlugs();

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
    .map(
      url =>
        `<url><loc>${url}</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urlsXml}
  </urlset>`;

  cachedXml = xml;
  lastGenerated = now;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

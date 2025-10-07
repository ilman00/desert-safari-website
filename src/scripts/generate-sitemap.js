import fs from "fs";
import path from "path";

const baseUrl = "https://www.eveningdeserttours.com";

async function generateSitemap() {
  try {
    // Fetch published blogs once during build
    const res = await fetch(`${baseUrl}/api/blogs`);
    const blogs = await res.json();

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

    // Combine static + blog URLs
    const urls = [
      ...staticUrls.map(url => `${baseUrl}${url}`),
      ...blogs.map(b => `${baseUrl}/blogs/${b.slug}`),
    ];

    // Build sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          url => `
        <url>
          <loc>${url}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`
        )
        .join("")}
    </urlset>`;

    // Save sitemap file to /public
    const filePath = path.join(process.cwd(), "public", "sitemap-0.xml");
    fs.writeFileSync(filePath, sitemap, "utf8");

    console.log("✅ Sitemap generated successfully!");
  } catch (err) {
    console.error("❌ Failed to generate sitemap:", err);
  }
}

generateSitemap();

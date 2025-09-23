import Image from "next/image";
import { notFound } from "next/navigation";

// Fetch one blog
async function getBlog(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`, {
    next: { revalidate: 60 }, // ISR
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);
  const blogs = await res.json();

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Dynamic SEO metadata
export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug);
  if (!blog) return {};

  return {
    title: `${blog.title} | YourSiteName`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`,
      images: [blog.coverImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`,
    },
  };
}

export default async function BlogPage({ params }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    image: blog.coverImage,
    publisher: {
      "@type": "Organization",
      name: "YourSiteName",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    },
  };

  return (
    <article className="container py-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Blog header */}
      <header className="mb-4 text-center">
        <h1 className="fw-bold mb-3">{blog.title}</h1>
        <p className="text-muted">
          By <span className="fw-semibold">{blog.author}</span> •{" "}
          {new Date(blog.publishedAt).toLocaleDateString()}
        </p>
        {blog.coverImage && (
          <div className="my-4">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              width={900}
              height={450}
              className="img-fluid rounded shadow-sm"
              priority
            />
          </div>
        )}
      </header>

      {/* Blog content */}
      <section
        className="mx-auto"
        style={{ maxWidth: "800px", lineHeight: "1.8", fontSize: "1.1rem" }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}

import Image from "next/image";
import { notFound } from "next/navigation";

// Fetch one blog
async function getBlog(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${slug}`, {
    next: { revalidate: 60 }, // ISR
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`);
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
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${blog.slug}`,
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
    <article className="prose mx-auto p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header>
        <h1>{blog.title}</h1>
        <p>
          By {blog.author} • {new Date(blog.publishedAt).toLocaleDateString()}
        </p>
        {blog.coverImage && (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            width={800}
            height={400}
            priority
          />
        )}
      </header>

      <section
        className="mt-6"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}

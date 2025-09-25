import Image from "next/image";
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/dbConnect";
import Blog from "@/models/Blogs";

// Helper function to calculate reading time
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Helper function to count words
function countWords(content) {
  return content.replace(/<[^>]*>/g, '').split(/\s+/).length;
}

// Helper function to extract keywords from content
function extractKeywords(content, title) {
  // Simple keyword extraction - you might want to use a more sophisticated approach
  const text = `${title} ${content}`.replace(/<[^>]*>/g, '').toLowerCase();
  const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  const words = text.split(/\s+/).filter(word => word.length > 3 && !commonWords.includes(word));
  const frequency = {};
  words.forEach(word => frequency[word] = (frequency[word] || 0) + 1);
  return Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]).slice(0, 10);
}

// Helper function to create meta description
function createMetaDescription(excerpt, content, maxLength = 155) {
  let description = excerpt;
  if (!description || description.length < 50) {
    // Extract first paragraph from content as fallback
    const firstParagraph = content.replace(/<[^>]*>/g, '').substring(0, 300);
    description = firstParagraph;
  }

  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...';
  }

  return description;
}

// Fetch one blog with related posts
async function getBlog(slug) {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) return null;

    // Fetch related posts (same category/tags)
    const relatedPosts = await Blog.find({
      _id: { $ne: blog._id },
      $or: [
        { category: blog.category },
        { tags: { $in: blog.tags || [] } }
      ]
    }, { title: 1, slug: 1, excerpt: 1, coverImage: 1, publishedAt: 1 })
      .limit(3)
      .lean();

    // Convert MongoDB _id to string and handle dates
    return {
      ...blog,
      _id: blog._id.toString(),
      publishedAt: blog.publishedAt?.toISOString(),
      updatedAt: blog.updatedAt?.toISOString(),
      relatedPosts: relatedPosts.map(post => ({
        ...post,
        _id: post._id.toString(),
        publishedAt: post.publishedAt?.toISOString(),
      }))
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}, { slug: 1 }).lean();

    return blogs.map((blog) => ({
      slug: blog.slug
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Dynamic SEO metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return {};


  const metaDescription = createMetaDescription(blog.excerpt, blog.content);
  const keywords = extractKeywords(blog.content, blog.title);
  const readingTime = calculateReadingTime(blog.content);

  return {
    title: `${blog.title} | YourSiteName`,
    description: metaDescription,
    keywords: keywords.join(', '),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: blog.title,
      description: metaDescription,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`,
      siteName: 'YourSiteName',
      images: [{
        url: blog.coverImage,
        width: 1200,
        height: 630,
        alt: blog.title,
      }],
      locale: 'en_US',
      type: 'article',
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author],
      section: blog.category || 'Blog',
      tags: blog.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: metaDescription,
      images: [blog.coverImage],
      creator: blog.author,
      site: '@YourTwitterHandle',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`,
    },
    other: {
      'article:reading_time': `${readingTime}`,
      'article:word_count': countWords(blog.content).toString(),
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params
  const blog = await getBlog(slug);
  if (!blog) {
    notFound();
  }

  const readingTime = calculateReadingTime(blog.content);
  const wordCount = countWords(blog.content);
  let keywords = []
  if (blog.tags && blog.tags.length > 0) {
    keywords = blog.tags;
    console.log(blog.tags)

  } else {
    keywords = extractKeywords(blog.content, blog.title);
    console.log(blog.tags)

  }

  // Enhanced JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}#article`,
    headline: blog.title,
    description: createMetaDescription(blog.excerpt, blog.content),
    keywords: keywords.join(', '),
    wordCount: wordCount,
    articleSection: blog.category || 'Blog',
    articleBody: blog.content.replace(/<[^>]*>/g, ''),
    author: {
      "@type": "Person",
      name: blog.author,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/author/${blog.author?.toLowerCase().replace(/\s+/g, '-')}`,
    },
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    image: {
      "@type": "ImageObject",
      url: blog.coverImage,
      width: 1200,
      height: 630,
      caption: blog.title
    },
    publisher: {
      "@type": "Organization",
      name: "Evening Desert Tours",
      description: "Experience the thrill of morning and evening desert safaris in Dubai. Enjoy dune bashing, camel rides, sandboarding, BBQ dinner, and cultural shows. Book now!",
      url: process.env.NEXT_PUBLIC_BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/safari-desert.png`,
        width: 200,
        height: 60
      },
      sameAs: [
        "https://facebook.com/YourFacebookPage",
        "https://linkedin.com/company/YourCompany"
      ]
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`
    },
    isPartOf: {
      "@type": "Website",
      name: "Evening Desert Tours",
      url: process.env.NEXT_PUBLIC_BASE_URL
    }
  };
  // Breadcrumb Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": process.env.NEXT_PUBLIC_BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`
      }
    ]
  };

  return (
    <article className="container py-5">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Blog header */}
      <header className="mb-4 text-center">
        <div className="mb-2">
          {blog.category && (
            <span className="badge bg-primary me-2">{blog.category}</span>
          )}
          {blog.tags && blog.tags.map((tag, index) => (
            <span key={index} className="badge bg-secondary me-1">{tag}</span>
          ))}
        </div>

        <h1 className="fw-bold mb-3">{blog.title}</h1>

        <div className="text-muted mb-3">
          <span>By <strong>{blog.author}</strong></span>
          <span className="mx-2">•</span>
          <time dateTime={blog.publishedAt}>
            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span className="mx-2">•</span>
          <span>{readingTime} min read</span>
          <span className="mx-2">•</span>
          <span>{wordCount.toLocaleString()} words</span>
        </div>

        {blog.excerpt && (
          <p className="lead text-muted mb-4">{blog.excerpt}</p>
        )}

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
        className="mx-auto mb-5"
        style={{ maxWidth: "800px", lineHeight: "1.8", fontSize: "1.1rem" }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Article footer with meta information */}
      <footer className="mx-auto border-top pt-4" style={{ maxWidth: "800px" }}>
        <div className="row">
          <div className="col-md-6">
            <p className="text-muted small">
              <strong>Published:</strong> {new Date(blog.publishedAt).toLocaleDateString()}
            </p>
            {blog.updatedAt !== blog.publishedAt && (
              <p className="text-muted small">
                <strong>Last Updated:</strong> {new Date(blog.updatedAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted small">
              <strong>Reading Time:</strong> {readingTime} minutes<br />
              <strong>Words:</strong> {wordCount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Keywords */}
        {keywords.length > 0 && (
          <div className="mt-3">
            <small className="text-muted">
              <strong>Related Topics:</strong> {keywords.slice(0, 5).join(', ')}
            </small>
          </div>
        )}
      </footer>

      {/* Related Posts Section */}
      {blog.relatedPosts && blog.relatedPosts.length > 0 && (
        <section className="mt-5 pt-5 border-top">
          <div className="mx-auto" style={{ maxWidth: "800px" }}>
            <h2 className="h4 mb-4">Related Articles</h2>
            <div className="row">
              {blog.relatedPosts.map((post) => (
                <div key={post._id} className="col-md-4 mb-3">
                  <div className="card h-100">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={300}
                        height={200}
                        className="card-img-top"
                        loading="lazy"
                      />
                    )}
                    <div className="card-body">
                      <h3 className="card-title h6">
                        <a href={`/blogs/${post.slug}`} className="text-decoration-none">
                          {post.title}
                        </a>
                      </h3>
                      {post.excerpt && (
                        <p className="card-text small text-muted">
                          {post.excerpt.substring(0, 100)}...
                        </p>
                      )}
                      <small className="text-muted">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
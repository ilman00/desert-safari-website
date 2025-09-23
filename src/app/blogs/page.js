import Link from "next/link";

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
    next: { revalidate: 60 }, // ISR
  });
  return res.json();
}

export const metadata = {
  title: "Blog | YourSiteName",
  description: "Read the latest articles and updates from YourSiteName.",
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="prose mx-auto p-6">
      <h1>Our Blog</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.slug}>
            <Link href={`/blogs/${blog.slug}`}>
              <h2>{blog.title}</h2>
              <p>{blog.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

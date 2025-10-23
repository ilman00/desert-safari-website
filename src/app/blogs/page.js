export const dynamic = 'force-dynamic';

import Link from "next/link";
import Image from "next/image";

async function getBlogs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
        next: { revalidate: 60 }, // ISR
    });

    if (!res.ok) {
        console.error("Failed to fetch blogs", res.status, res.statusText);
        return [];
    }

    return res.json();
}

export const metadata = {
    title: "Evening Desert tours",
    description: "Read the latest articles and updates from Evening Desert tours.",
};

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <main className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold">Our Blog</h1>
                <p className="text-muted">Latest articles and updates</p>
            </div>

            <div className="row g-4">
                {blogs.map((blog) => (
                    <div key={blog.slug} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm border-0 rounded-3">
                            {blog.coverImage && (
                                <Image
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    width={600}
                                    height={300}
                                    className="card-img-top rounded-top"
                                    style={{ objectFit: "cover", height: "200px", width: "100%" }}
                                />

                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-semibold">{blog.title}</h5>
                                <p className="card-text text-muted">{blog.excerpt}</p>
                                <div className="mt-auto">
                                    <Link href={`/blogs/${blog.slug}`} className="btn btn-primary">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                            <div className="card-footer bg-white border-0 text-muted small">
                                {blog.publishedAt
                                    ? new Date(blog.publishedAt).toLocaleDateString()
                                    : ""}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

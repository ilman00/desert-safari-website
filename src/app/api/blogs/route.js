import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Blog from "@/models/Blogs";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({ status: "published" }).sort({ publishedAt: -1 });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newBlog = await Blog.create(data);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("POST /api/blogs error:", error);

    // Handle duplicate slug (MongoDB unique index error)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

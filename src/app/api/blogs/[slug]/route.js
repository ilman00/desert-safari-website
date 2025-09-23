import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Blog from "@/models/Blogs";

export async function GET(req, { params }) {
  await dbConnect();
  const blog = await Blog.findOne({ slug: params.slug, status: "published" });

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}



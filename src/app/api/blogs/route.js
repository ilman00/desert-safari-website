import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
  await connectDB();
  const blogs = await Blog.find({ status: "published" }).sort({ publishedAt: -1 });
  return NextResponse.json(blogs);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  const newBlog = await Blog.create(data);
  return NextResponse.json(newBlog);
}

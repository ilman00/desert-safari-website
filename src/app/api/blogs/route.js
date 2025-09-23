// import { NextResponse } from "next/server";
// import { dbConnect } from "@/lib/dbConnect";
// import Blog from "@/models/Blogs";

// export async function GET() {
//   await dbConnect();
//   const blogs = await Blog.find({ status: "published" }).sort({ publishedAt: -1 });
//   return NextResponse.json(blogs);
// }

// export async function POST(req) {
//   await dbConnect();
//   const data = await req.json();

//   const newBlog = await Blog.create(data);
//   return NextResponse.json(newBlog);
// }

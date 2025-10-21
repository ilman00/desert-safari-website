import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect"; // your db connection helper
import { CustomPackage } from "@/models/CustomPackageSchema";  // your Mongoose model

// GET all packages
export async function GET() {
  try {
    await dbConnect();

    const packages = await CustomPackage.find().sort({ createdAt: -1 });

    return NextResponse.json(packages, { status: 200 });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { message: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

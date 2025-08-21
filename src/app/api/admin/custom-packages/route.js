import {dbConnect} from "../../../../lib/dbConnect";
import { NextResponse } from "next/server";
import { CustomPackage } from "@/models/CustomPackageSchema";


export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { title, description, price, addons, expiryDate, slug, imageUrl } =
      body;

    if (!title || typeof price !== "number" || isNaN(price)) {
      return NextResponse.json(
        { error: "Valid title and price are required" },
        { status: 400 }
      );
    }

    // Filter addons: must have name, price optional
    const cleanedAddons = Array.isArray(addons)
      ? addons.filter((a) => a.name && a.name.trim() !== "")
      : [];

    const newPackage = await CustomPackage.create({
      title: title.trim(),
      description: description?.trim() || "",
      price,
      addons: cleanedAddons,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      slug,
      imageUrl
    });

    return NextResponse.json(
      { message: "Package created", id: newPackage._id },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

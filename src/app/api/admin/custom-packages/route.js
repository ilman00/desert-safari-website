// /api/admin/custom-packages/route.js
import { dbConnect } from "../../../../lib/dbConnect";
import { CustomPackage } from "../../../../models/CustomPackageSchema";

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();

    const required = ["title", "price", "slug"];
    for (const k of required) {
      if (!body[k]) {
        return new Response(
          JSON.stringify({ success: false, error: `${k} is required` }),
          { status: 400 }
        );
      }
    }

    const pkg = new CustomPackage({
      title: body.title,
      description: body.description || "",
      price: Number(body.price),
      addons: Array.isArray(body.addons) ? body.addons : [],
      expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
      slug: body.slug,
      imageUrl: body.imageUrl || ""
    });
    

    const saved = await pkg.save();

    return new Response(
      JSON.stringify({ success: true, package: saved }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Custom package API error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}


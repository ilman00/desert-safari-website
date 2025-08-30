// PUT /api/custom-package/[id]
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { CustomPackage } from "@/models/CustomPackageSchema";


export async function PUT(request, { params }) {
    try {
      await dbConnect();
  
      const { id } = params;
      const body = await request.json();
  
      const updated = await CustomPackage.findByIdAndUpdate(id, body, {
        new: true, // return updated doc
        runValidators: true,
      });
  
      if (!updated) {
        return NextResponse.json(
          { success: false, message: "Package not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, package: updated },
        { status: 200 }
      );
    } catch (error) {
      console.error("Update error:", error);
      return NextResponse.json(
        { success: false, message: "Server error" },
        { status: 500 }
      );
    }
  }
  
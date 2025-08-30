import { NextResponse } from "next/server";
import {dbConnect} from "@/lib/dbConnect";
import {CustomPackage} from "@/models/CustomPackageSchema";

// DELETE /api/custom-package/[id]
export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    const deleted = await CustomPackage.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Package deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

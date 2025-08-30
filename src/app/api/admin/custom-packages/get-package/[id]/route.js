import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { CustomPackage } from "@/models/CustomPackageSchema";

// GET /api/custom-package/[id]
export async function GET(request, { params }) {
    try {
        await dbConnect();

        const { id } = await params;
        const pkg = await CustomPackage.findById(id);

        if (!pkg) {
            return NextResponse.json(
                { success: false, message: "Package not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(pkg, { status: 200 });
    } catch (error) {
        console.error("GET package error:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}

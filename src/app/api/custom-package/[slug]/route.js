import {dbConnect} from "../../../../lib/dbConnect";
import { NextResponse } from "next/server";
import { CustomPackage } from "../../../../models/CustomPackageSchema";


export async function GET(req, {params}) {
  try {
    await dbConnect();

    const { slug } = await params;
    const pkg = await CustomPackage.findOne({ slug });

    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(pkg, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

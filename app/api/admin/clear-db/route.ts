import { NextRequest, NextResponse } from "next/server";
import { initDb, sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = String(body.password || "");

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await initDb();

    await sql`
      DELETE FROM visits;
    `;

    return NextResponse.json({
      success: true,
      message: "Database cleared",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to clear database" },
      { status: 500 }
    );
  }
}
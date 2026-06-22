import { NextRequest, NextResponse } from "next/server";
import { initDb, sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const campaign = String(body.campaign || "training1");
    const unit = String(body.unit || "unknown");
    const userAgent = req.headers.get("user-agent") || "unknown";

    await initDb();

    await sql`
      INSERT INTO visits (campaign, token, unit, user_agent)
      VALUES (${campaign}, ${unit}, ${unit}, ${userAgent});
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to save visit" },
      { status: 500 }
    );
  }
}
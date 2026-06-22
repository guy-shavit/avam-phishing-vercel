import { NextRequest, NextResponse } from "next/server";
import { initDb, sql } from "@/lib/db";

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const vercelForwardedFor = req.headers.get("x-vercel-forwarded-for");

  if (vercelForwardedFor) {
    return vercelForwardedFor.split(",")[0].trim();
  }

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return "unknown";
}

function decodeHeader(value: string | null) {
  if (!value) {
    return "unknown";
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const campaign = String(body.campaign || "training1");
    const unit = String(body.unit || "unknown");
    const userAgent = req.headers.get("user-agent") || "unknown";

    const ip = getClientIp(req);

    const country = decodeHeader(req.headers.get("x-vercel-ip-country"));
    const region = decodeHeader(req.headers.get("x-vercel-ip-country-region"));
    const city = decodeHeader(req.headers.get("x-vercel-ip-city"));

    await initDb();

    await sql`
      INSERT INTO visits (
        campaign,
        token,
        unit,
        user_agent,
        ip,
        country,
        region,
        city
      )
      VALUES (
        ${campaign},
        ${unit},
        ${unit},
        ${userAgent},
        ${ip},
        ${country},
        ${region},
        ${city}
      );
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to save visit" },
      { status: 500 }
    );
  }
}
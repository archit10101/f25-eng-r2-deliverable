import type { NextRequest } from "next/server";

import { generateResponse } from "@/lib/services/species-chat";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 👇 Explicit type assertion
    const body: any = await req.json();

    if (!body.message || typeof body.message !== "string" || !body.message.trim()) {
      return NextResponse.json({ error: "Invalid or missing message." }, { status: 400 });
    }

    const response = await generateResponse(body.message.trim());
    return NextResponse.json({ response });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    return NextResponse.json(
      { error: "Failed to process the request." },
      { status: 502 }
    );
  }
}

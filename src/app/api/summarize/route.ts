// app/api/summarize/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const BodySchema = z.object({
  transcript: z.string().min(1, "Transcript is required"),
  prompt: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { transcript, prompt } = BodySchema.parse(json);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const system = `You produce concise, structured meeting summaries in Markdown. Respect the user's instruction. Use relevant sections such as:
- Executive Summary
- Key Decisions
- Action Items (owner, deadline)
- Risks/Blockers
- Next Steps`;

    const user = `Custom instruction: ${prompt || "Summarize in bullet points for executives"}

Transcript:
"""${transcript}"""`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const promptText = `${system}\n\n${user}`;

    const result = await model.generateContent(promptText);

    const summary = result.response.text();

    return NextResponse.json({ summary });
  } catch (err: any) {
    console.error("/api/summarize error:", err);
    const msg =
      err?.issues?.[0]?.message || err?.message || "Failed to summarize";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

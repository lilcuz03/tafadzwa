import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      brand,
      topic,
      audience,
      points,
      tone,
      format,
      words,
      language,
      keywords,
    } = body;

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const kwSection =
      keywords && keywords.length > 0
        ? `\nNaturally include these SEO keywords: ${keywords.join(", ")}.`
        : "";

    const prompt = `Write a ${words || 800}-word blog post for ${brand || "a business"}.

Topic: ${topic}
${audience ? `Target audience: ${audience}` : ""}
Tone: ${tone || "professional"}
Format: ${format || "structured with headings and subheadings"}
Language: ${language || "English"}
${points ? `Key points to cover: ${points}` : ""}${kwSection}

Requirements:
- Write in ${language || "English"} with a ${tone || "professional"} tone
- Use ${format || "structured with headings and subheadings"} structure
- Include an engaging introduction and strong conclusion
- Make it SEO-friendly and genuinely useful
- Aim for approximately ${words || 800} words
- Do not include meta descriptions, notes, or preamble — just the blog post itself`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 4000,
          temperature: 0.7,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Groq API error" },
        { status: response.status },
      );
    }

    const content = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Blog generation error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const { text } = await req.json();

    const prompt = `You are an AI job matching assistant.

You are an AI job matching assistant.

Given a resume, identify the top 3 most relevant job roles and return the result in EXACTLY one paragraph.

Instructions:
- Output ONLY valid JSON
- Do NOT include any explanation, headings, or extra text
- Keep everything in a single paragraph line
- Each job should include only:
  - job_title (use realistic, commonly used industry job titles)
  - match_percentage (integer from 0–100)

STRICT ROLE RULES:
- If the candidate has ONLY academic background with no projects or practical exposure → return internship roles
- If the candidate has projects, certifications, or any hands-on technical/real-world experience → return ONLY full-time or entry-level roles (NO internships)
- NEVER return internship roles if the candidate has significant projects, certifications, or technical exposure
- Do NOT restrict to only developer roles — consider all relevant domains such as software, data, cybersecurity, analytics, product, business, etc.
- Choose job titles that are commonly used in real job listings (avoid vague or uncommon names)
and also return skills required for that particular role not from resume but original job 

Output format:
{
  "jobs": [
    { "job_title": "", "match_percentage": 0 ,"skills:[]"},
    { "job_title": "", "match_percentage": 0 ,"skills:[]"},
    { "job_title": "", "match_percentage": 0 ,"skills:[]"}
  ]
}

Resume:${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: [{ parts: [{ text: prompt }] }],
    });

    const result = response.text;
    if (!result) {
      throw new Error("No response from Gemini");
    }

    let clean = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const parsed = JSON.parse(clean);
    console.log(result);

    return NextResponse.json({
      analysis: parsed,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "api crashed",
        error: err,
      },
      { status: 500 },
    );
  }
}

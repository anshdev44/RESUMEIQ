import { NextResponse } from "next/server";
import { parse } from "path";
// Change the import here:
import pdf from "pdf-parse/lib/pdf-parse.js"; 

export async function POST(req: Request) {
  try {
    const formdata = await req.formData();
    const file = formdata.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // This will now work without looking for external test files
    const parsed = await pdf(buffer);
    // console.log(parsed.text);

    return NextResponse.json({
      success: true,
      extractedText: parsed.text,
    });
  } catch (err) {
    console.error("PDF Parsing Error:", err);
    return NextResponse.json({
      message: "api crash ho gayi",
      error: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
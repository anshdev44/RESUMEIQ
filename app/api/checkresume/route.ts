import { NextResponse } from "next/server";
import db from "../../lib/db";

export async function POST(req: Request) {
  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return NextResponse.json(
        { message: "user_id is required" },
        { status: 400 }
      );
    }

    const [rows]: any = await db.query(
      "SELECT resume_text FROM resumes WHERE user_id = ? LIMIT 1",
      [user_id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { exists: false, message: "resume does not exist" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        exists: true,
        resume_text: rows[0].resume_text
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "api crash ho gayi",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
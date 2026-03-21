import { NextResponse } from "next/server";
import db from "../../lib/db";

export async function POST(req: Request) {
  try {
    const { user_id, file_name } = await req.json();

    const [rows]: any = await db.query(
      "SELECT resume_text FROM Resumes WHERE user_id = ? AND file_name = ?",
      [user_id, file_name]
  );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      resume_text: rows[0].resume_text,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching resume text" },
      { status: 500 }
    );
  }
}
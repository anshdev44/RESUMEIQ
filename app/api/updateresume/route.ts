import { NextResponse } from "next/server";
import db from "../../lib/db";
import { ResultSetHeader } from "mysql2";

export async function PUT(req: Request) {
  try {
    const { user_id, file_name, resume_text } = await req.json();

    if (!user_id || !file_name || !resume_text) {
      return NextResponse.json(
        { message: "some details are missing" },
        { status: 401 },
      );
    }

    const [result] = await db.query<ResultSetHeader>(
      "UPDATE Resumes SET resume_text = ? WHERE user_id = ? AND file_name = ?",
      [resume_text, user_id, file_name],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "resume not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "resume added succesfully" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "api crash ho gayi",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}

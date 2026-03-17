import { NextResponse } from "next/server";
import db from "../../lib/db";

export async function POST(req: Request) {
  try {
    const { user_id, file_name, resume_text } = await req.json();

    if (!user_id || !file_name || !resume_text) {
      return NextResponse.json(
        { message: "some details are missing" },
        { status: 401 }
      );
    }

    const [result] = await db.query(
      "INSERT INTO Resumes (user_id, file_name, resume_text) VALUES (?, ?, ?)",
      [user_id, file_name, resume_text]
    );

    if (!result) {
      return NextResponse.json(
        { message: "was not able to add resume into the database" },
        { status: 405 }
      );
    }

    return NextResponse.json(
      { message: "resume added succesfully" },
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
import { NextResponse } from "next/server";
import db from "../../lib/db";
import { RowDataPacket } from "mysql2"; 

export async function POST(req: Request) {
  try {
  const {email} = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
console.log(`DEBUG: Executing SELECT user_id FROM users WHERE email = '${email}'`);
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = rows[0].user_id;

    return NextResponse.json({ user_id: userId });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import db from "../../lib/db";
import { ResultSetHeader } from "mysql2"; 
import { log } from "console";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    const [result] = await db.execute(
      "INSERT INTO Users (name, email) VALUES (?, ?)",
      [name, email]
    ) as [ResultSetHeader, any]; 

    const userId = result.insertId;
    // console.log("✅"+userId);

    return NextResponse.json({ 
      message: "User created", 
      userId: userId 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
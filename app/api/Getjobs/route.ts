import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") || "frontend developer";

    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
      role
    )}&country=in&num_pages=1`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    const data = await response.json();
    console.log(data);

    return NextResponse.json(data.data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "api crashed", error: err },
      { status: 500 }
    );
  }
}
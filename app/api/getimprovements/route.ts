import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const { text } = await req.json();
    const prompt = `You are an expert resume reviewer and career advisor. Analyze the following resume and return ONLY a valid JSON response with a maximum of 3 key improvement categories. Each category must include a short heading, a priority level (High, Medium, Low), a list of specific issues, actionable suggestions, and at least one example showing original and improved content if possible. Use the structure: { "improvements": [ { "heading": "string", "priority": "High | Medium | Low", "issues": ["..."], "suggestions": ["..."], "example": { "original": "...", "improved": "..." } } ] }. Keep headings concise (e.g., "Experience Impact", "Skills Gap", "ATS Optimization"), ensure all suggestions are specific and practical, limit to only 3 improvement objects, keep the response clean and concise, and do not include any text outside JSON. Resume: ANSH AHUJA

ć anshahuja770@gmail.com | Ħ 9425118482
a github.com/anshdev44/ | ] linkedin.com/in/ansh-ahuja-3081662b9

Education
Indian Institute of Information Technology Vadodara
Btech Computer Science

AUG 2024 - JUN 2028

Technical Skills
Languages: JavaScript, TypeScript, Python, C/C++, SQL
Frameworks / Libraries: React.js, Next.js, Express.js, TailwindCSS, Shadcn UI, Socket.IO
DevOps / Tools: Git/GitHub, Docker, Redis, Postman, Terraform, CI/CD
Databases / ORMs: PostgreSQL, MongoDB, MySQL, Prisma ORM
APIs / AI Tools: Gemini AI, Shopify API,Spotify API
CS Fundamentals: Data Structures and Algorithms(solved 400+ problems) , Operating Systems, OOPs, DBMS

Projects
WRDL – Real-Time Multiplayer Word Game
Next.js, Node.js, Socket.IO, MongoDB
• Designed and developed a real-time multiplayer word-guessing game with synchronized game state using Socket.IO
and a room-based architecture
• Implemented live in-game chat, random word generation, and turn-based gameplay to support concurrent multi-user
interactions
• Integrated AI-generated hint generation through a Gemini MCP server to improve gameplay flow and user engagement
• Built persistent storage for players, rooms, and game sessions using MongoDB, with a responsive frontend powered
by Next.js

Get Me a Chai – Creator Support Platform
Next.js, Node.js, MongoDB, Razorpay
• Developed a full-stack creator support platform enabling users to create profiles and receive monetary contributions
from fans
• Designed MongoDB schemas for creators, users, and transactions, ensuring secure and structured data management
• Integrated the Razorpay payment gateway to handle donation workflows with reliable transaction processing
• Implemented a clean and responsive frontend using Next.js to manage creator pages, donation flows, and transaction
visibility

URL Shortener Platform
Next.js, Node.js, MongoDB
• Built a URL shortening service to generate compact links and handle fast redirection to original URLs
• Implemented custom aliases and link expiration logic to provide configurable control over shortened links
• Designed click-tracking analytics to record and display visit counts through a user dashboard
• Persisted URL mappings and analytics data in MongoDB, with a dashboard-driven interface built using Next.js

Achievements
• Solved 250+ Data Structures and Algorithms problems on LeetCode, achieving a 1700+ contest rating
• Earned a 2-Star rating on CodeChef through consistent participation in rated competitive programming contests

Activities
Member, Coding Club — Actively contributed to technical discussions, solved algorithmic problems, and collaborated
with peers on coding exercises.

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
    let parsed;

    try {
      parsed = JSON.parse(clean);
    } catch (e) {
      console.log("RAW AI RESPONSE:", result);
      throw new Error("Invalid JSON from AI");
    }
    console.log(result);
    return NextResponse.json(
      {
        message: "successfully found improvements",
        data: parsed,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "api crashed",
      },
      {
        status: 500,
      },
    );
  }
}

import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    console.log(process.env.GEMINI_API_KEY);
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const { text } = await req.json();
    // console.log("mere pe hai",text);
    
    const prompt =`You are a resume analysis engine. Analyze the provided resume text and return a STRICT JSON response following the exact schema. Return ONLY valid JSON with no explanations, no markdown, no comments, and no text before or after the JSON. The response must contain three sections: resume_quality_score, role_relevance, and career_time_distribution. For resume_quality_score, evaluate the resume using the following maximum scores: Formatting (20), Sections (20), Bullet Points (15), Readability (20), Length (10), Grammar (15). All values must be integers and total_score must equal the sum of these components and must be between 0 and 100. For role_relevance, infer suitable professional roles from the resume and return between 1 and 5 roles sorted from highest score to lowest score, where each role has a "role" string and a "score" integer between 0 and 100. The roles can be any profession inferred from the resume and must not be restricted to predefined categories. For career_time_distribution, estimate how the candidate’s time is divided between work, education, projects, and certifications. All values must be integers and must sum to exactly 100. If certifications or projects are not present in the resume, set their values to 0. The output must strictly follow this JSON structure: { "resume_quality_score": { "formatting": 0, "sections": 0, "bullet_points": 0, "readability": 0, "length": 0, "grammar": 0, "total_score": 0 }, "role_relevance": [ { "role": "string", "score": 0 } ], "career_time_distribution": { "work": 0, "education": 0, "projects": 0, "certifications": 0 } }. Analyze the following resume text and produce the JSON response: ANSH AHUJA
ćanshahuja770@gmail.com |Ħ9425118482
agithub.com/anshdev44/|]linkedin.com/in/ansh-ahuja-3081662b9
Education
Indian Institute of Information Technology VadodaraAUG 2024 - JUN 2028
Btech Computer Science
Technical Skills
Languages:JavaScript, TypeScript, Python, C/C++, SQL
Frameworks / Libraries:React.js, Next.js, Express.js, TailwindCSS, Shadcn UI, Socket.IO
DevOps / Tools:Git/GitHub, Docker, Redis, Postman, Terraform, CI/CD
Databases / ORMs:PostgreSQL, MongoDB, MySQL, Prisma ORM
APIs / AI Tools:Gemini AI, Shopify API,Spotify API
CS Fundamentals:Data Structures and Algorithms(solved 400+ problems) , Operating Systems, OOPs, DBMS
Projects
WRDL – Real-Time Multiplayer Word Game
Next.js, Node.js, Socket.IO, MongoDB
•Designedanddevelopedareal-timemultiplayerword-guessinggamewithsynchronizedgamestateusingSocket.IO
and aroom-based architecture
•Implementedlive in-game chat,random word generation, andturn-based gameplayto support concurrent multi-user
interactions
•IntegratedAI-generatedhintgenerationthroughaGeminiMCPservertoimprovegameplayflowanduserengagement
•Builtpersistent storagefor players, rooms, and game sessions usingMongoDB, with a responsive frontend powered
byNext.js
Get Me a Chai – Creator Support Platform
Next.js, Node.js, MongoDB, Razorpay
•Developed afull-stack creator support platformenabling users to create profiles and receivemonetary contributions
from fans
•DesignedMongoDBschemasforcreators,users,andtransactions,ensuringsecureandstructureddatamanagement
•Integrated theRazorpay payment gatewayto handledonation workflowswith reliable transaction processing
•Implemented aclean and responsive frontendusingNext.jsto manage creator pages, donation flows, and transaction
visibility
URL Shortener Platform
Next.js, Node.js, MongoDB
•Built aURL shortening serviceto generate compact links and handlefast redirectionto original URLs
•Implementedcustom aliasesandlink expiration logicto provide configurable control over shortened links
•Designedclick-tracking analyticsto record and display visit counts through auser dashboard
•PersistedURL mappings and analytics datainMongoDB, with a dashboard-driven interface built usingNext.js
Achievements
•Solved250+ Data Structures and Algorithms problemsonLeetCode, achieving a1700+ contest rating
•Earned a2-Star rating on CodeChefthrough consistent participation in rated competitive programming contests
Activities
Member, Coding Club— Actively contributed totechnical discussions, solvedalgorithmic problems, and collaborated
with peers on coding exercises.`;

    const response = await ai.models.generateContent({
      model: "	gemini-3.1-flash-lite-preview",
      contents: [{ parts: [{ text: prompt }] }],
    });

    const result = response.text;
    if (!result) {
      throw new Error("No response from Gemini");
    }
  

    let clean = result.replace(/```json/g, "").replace(/```/g, "").trim();
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

"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

const AnalysisPage = () => {
  const [showImprovements, setShowImprovements] = useState(false);
  const { data: session } = useSession();

  const analyze = async () => {
    const email = session?.user?.email;
    if (!email) {
      console.log("analyze: missing sessiion/email", { session });
      return;
    }

    console.log("analyze function started", { emal });
    const name = session?.user?.name ?? "user";

    try {
      const userRes = await fetch("/api/finduserid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      console.log("finduserid response", { status: userRes.status });

      const userData = await userRes.json();
      if (!userRes.ok) {
        console.error("finduserid error", userData);
        return;
      }

      const user_id = userData.user_id;
      console.log("✅ user_id is", user_id);

      const resumeRes = await fetch("/api/findresumetext", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          file_name: `${name}_resume`,
        }),
      });
      console.log("findresume_text response", { status: resumeRes.status });

      const resumeData = await resumeRes.json();
      if (!resumeRes.ok) {
        console.error("findresume_text error", resumeData);
        return;
      }
      const res = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume_text: resumeData.resume_text,
        }),
      });

      const resume_text = resumeData.resume_text;
      console.log("✅ resume_text is", resume_text);
    } catch (error) {
      console.error("analyze error", error);
    }
  };

  useEffect(() => {
    console.log("useEffect session changed", { session });
    if (!session) return;
    analyze().catch((err) => console.error("analyze failed", err));
  }, [session]);

  return (
    <div className="min-h-screen bg-white text-black font-sans ">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xs">IQ</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">
              ResumeIQ
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/jobs"
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              Recommended Jobs
            </Link>
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  {session.user?.name ?? "User"}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 transition-all"
                >
                  Sign Out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-xs font-medium text-gray-600 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Analysis Complete
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Alex Mitchell
            </h1>
            {/* <p className="text-xl md:text-2xl text-gray-500 font-medium">
              Senior Software Engineer
            </p> */}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Overall Score
              </p>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-5xl font-extrabold tracking-tighter">
                  92
                </span>
                <span className="text-2xl font-bold text-gray-300">/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Charts Section */}
        <div className="mb-16 animate-fade-up delay-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Performance Metrics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="h-72 rounded-3xl border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center p-6 relative overflow-hidden group hover:border-gray-300 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300" />
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                <span className="text-gray-400">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">ATS Compatibility</h3>
              <p className="text-sm text-gray-500 text-center">
                [Chart 1 Space]
              </p>
            </div>

            {/* Box 2 */}
            <div className="h-72 rounded-3xl border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center p-6 relative overflow-hidden group hover:border-gray-300 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300" />
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                <span className="text-gray-400">📈</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Keyword Match</h3>
              <p className="text-sm text-gray-500 text-center">
                [Chart 2 Space]
              </p>
            </div>

            {/* Box 3 */}
            <div className="h-72 rounded-3xl border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center p-6 relative overflow-hidden group hover:border-gray-300 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300" />
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                <span className="text-gray-400">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Impact Rating</h3>
              <p className="text-sm text-gray-500 text-center">
                [Chart 3 Space]
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 pt-8 border-t border-gray-100 animate-fade-up delay-200">
          <button
            onClick={() => setShowImprovements(!showImprovements)}
            className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 group"
          >
            {showImprovements
              ? "Hide Improvements"
              : "View Needed Improvements"}
          </button>

          <Link
            href="/jobs"
            className="px-8 py-4 border border-gray-200 bg-white text-black rounded-full font-medium hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group"
          >
            See Recommended Jobs
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Improvements Section (Conditional) */}
        {showImprovements && (
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Critical Improvements
              </h2>
            </div>

            <div className="grid gap-6">
              {/* Card 1 */}
              <div className="p-8 rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      Quantify Your Achievements
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Your experience section lists responsibilities but lacks
                      measurable outcomes. Data-driven bullet points perform 40%
                      better in ATS systems.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-sm text-gray-500 mb-2 font-medium">
                        Instead of:
                      </p>
                      <p className="text-gray-700 font-mono text-sm line-through opacity-70 mb-3">
                        "Improved database performance and query speed."
                      </p>
                      <p className="text-sm text-gray-500 mb-2 font-medium">
                        Try:
                      </p>
                      <p className="text-gray-900 font-mono text-sm font-medium">
                        "Improved database query speed by 40% using Redis
                        caching."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      Missing Key Skills for Target Role
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Based on current Senior Software Engineer job
                      descriptions, you are missing several highly requested
                      keywords.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-orange-50 border border-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                        System Design
                      </span>
                      <span className="px-3 py-1.5 bg-orange-50 border border-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                        Microservices
                      </span>
                      <span className="px-3 py-1.5 bg-orange-50 border border-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                        CI/CD
                      </span>
                      <span className="px-3 py-1.5 bg-orange-50 border border-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                        GraphQL
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-8 rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      Formatting Inconsistencies
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Ensure consistent date formats throughout the document.
                      Some entries use "MM/YYYY" while others use "Month Year".
                      ATS parsers may fail to extract your total years of
                      experience accurately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AnalysisPage;

"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Component from "@/components/chart-radial-text";
import ChartBarLabel from "@/components/bar-chart";
import PieLabelCustom from "@/components/pie_chart";
import Imporvements from "../components/imporvements";
import { resume } from "react-dom/server";

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
type Improvement = {
  heading: string;
  priority: "High" | "Medium" | "Low";
  issues: string[];
  suggestions: string[];
  example: {
    original: string;
    improved: string;
  };
};

type ImprovementsData = {
  improvements: Improvement[];
};
const AnalysisPage = () => {
  const [showImprovements, setShowImprovements] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [overall_score, setOverall_score] = useState(0);
  const { data: session } = useSession();
  const [button_loading, setButton_loading] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const [roleRelevance, setRoleRelevance] = useState([]);
  const [resume_text, setResume_text] = useState("");
  const [improvements, setImprovements] = useState<ImprovementsData>({
    improvements: [],
  });
  const [careerTime, setCareerTime] = useState({
    work: 0,
    education: 0,
    projects: 0,
    certifications: 0,
  });

  const analyze = async () => {
    if (button_loading) return;

    setButton_loading(true);
    setIsLoading(true);

    const email = session?.user?.email;
    if (!email) {
      setButton_loading(false);
      setIsLoading(false);
      console.log("analyze: missing sessiion/email", { session });
      return;
    }

    const name = session?.user?.name ?? "user";

    try {
      const userRes = await fetch("/api/finduserid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const userData = await userRes.json();
      if (!userRes.ok) {
        setButton_loading(false);
        setIsLoading(false);
        return;
      }

      const user_id = userData.user_id;

      const resumeRes = await fetch("/api/findresumetext", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          file_name: `${name}_resume`,
        }),
      });

      const resumeData = await resumeRes.json();
      if (!resumeRes.ok) {
        setButton_loading(false);
        setIsLoading(false);
        return;
      }
      setResume_text(resumeData);
      // console.log("ye hai asli",resumeData);
      const res = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: resumeData.resume_text }),
      });

      const analysisResult = await res.json();
      if (!res.ok) {
        setButton_loading(false);
        setIsLoading(false);
        return;
      }

      const totalScore =
        analysisResult?.analysis?.resume_quality_score?.total_score;
      setRoles(analysisResult?.analysis?.role_relevance ?? []);

      setOverall_score(totalScore);
      setRoleRelevance(analysisResult?.analysis?.role_relevance);
      // console.log("ye hai asli",roleRelevance);
      setAnalysisData(analysisResult);
      setCareerTime(analysisResult?.analysis?.career_time_distribution);
      // console.log("ye hai asli",careerTime);
      // console.log("FULL RESULT:", analysisResult);
      // console.log("QUALITY:", analysisResult.resume_quality_score);
      // console.log("TOTAL:", analysisResult.resume_quality_score?.total_score);
      // console.log("Total score:", totalScore);
    } catch (error) {
      console.error("analyze error", error);
    } finally {
      setIsLoading(false);
      setButton_loading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
  }, [session]);

  // useEffect(() => {
  //   console.log("useEffect session changed", { session });
  //   if (!session) return;
  //   setIsLoading(true);
  //   // analyze().catch((err) => console.error("analyze failed", err));
  // }, [session]);

  const handleimprovements = async () => {
    if (!showImprovements) {
      const res = await fetch("http://localhost:3000/api/getimprovements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: resume_text,
        }),
      });

      if (!res) {
        return;
      }
      const res_1 = await res.json();
      console.log(res_1);
      setImprovements({ improvements: res_1.data.improvements });
    }
    setShowImprovements(!showImprovements);
  };

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
              {session?.user?.name}
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
                  {overall_score ?? 92}
                </span>
                <span className="text-2xl font-bold text-gray-300">/100</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            analyze();
          }}
          disabled={isLoading}
          className="px-8 py-4 bg-black text-white rounded-full 
  hover:bg-gray-800 transition-all disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? "Analyzing..." : "Show Results"}
        </button>

        {/* 3 Charts Section */}
        <div className="mb-16 animate-fade-up delay-100 ">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Performance Metrics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="h-72 rounded-3xl border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center p-6 relative overflow-hidden group hover:border-gray-300 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-gray-200 to-gray-300" />
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                <span className="text-gray-400">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">ATS Compatibility</h3>
              <div className="text-sm text-gray-500 text-center">
                {/* <Radial_chart/> */}
                <Component score={overall_score} />
              </div>
            </div>

            {/* Box 2 */}
            <div className="h-72 rounded-3xl border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center p-6 relative overflow-hidden group hover:border-gray-300 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-gray-200 to-gray-300" />
              <ChartBarLabel role={roleRelevance} />
            </div>

            {/* Box 3 */}
            <div className="h-72 rounded-3xl border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center p-6 relative overflow-hidden group hover:border-gray-300 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-gray-200 to-gray-300" />
              <div className="text-sm text-gray-500 text-center">
                <PieLabelCustom ct={careerTime} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 pt-8 border-t border-gray-100 animate-fade-up delay-200">
          <button
            onClick={() => {
              handleimprovements();
            }}
            className="cursor-pointer px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 group"
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
        {showImprovements && <Imporvements data={improvements} />}
      </main>
    </div>
  );
};

export default AnalysisPage;

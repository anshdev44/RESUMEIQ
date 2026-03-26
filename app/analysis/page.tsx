"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";
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
  const [isImprovementsLoading, setIsImprovementsLoading] = useState(false);
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
      if (improvements.improvements.length === 0) {
        setIsImprovementsLoading(true);
        try {
          const res = await fetch("http://localhost:3000/api/getimprovements", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: resume_text,
            }),
          });

          if (res) {
            const res_1 = await res.json();
            setImprovements({ improvements: res_1.data.improvements });
          }
        } catch (err) {
          console.error("Failed to fetch improvements:", err);
        } finally {
          setIsImprovementsLoading(false);
        }
      }
    }
    setShowImprovements(!showImprovements);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] text-gray-900 dark:text-zinc-100 font-sans transition-colors duration-300 pb-16">
      {/* minimalist Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors">
              <span className="text-white font-bold text-xs">IQ</span>
            </div>
            <span className="font-semibold text-lg tracking-tight text-gray-900 dark:text-white">
              ResumeIQ Dashboard
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link
              href="/jobs"
              className="text-sm font-medium text-gray-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
            >
              Recommended Jobs
            </Link>
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                  {session.user?.name ?? "User"}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="text-sm font-medium px-4 py-2 rounded-md border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col flex-1">
        {!analysisData ? (
          <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[65vh] animate-fade-in">
            <div className="max-w-md text-center">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-indigo-100 dark:border-indigo-500/20">
                 <span className="text-indigo-600 dark:text-indigo-400 text-3xl">⚡</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Ready for Dashboard</h1>
              <p className="text-gray-500 dark:text-zinc-400 mb-8 leading-relaxed">
                We're ready to process your resume profile. Click below to run the AI tracking engine and generate your personalized analytics dashboard.
              </p>
              <button
                onClick={() => analyze()}
                disabled={isLoading || button_loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl disabled:opacity-50 transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Running Analysis Engine...
                  </>
                ) : (
                  "Generate Dashboard"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full animate-fade-up">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Analysis Complete
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
              {analysisData?.analysis?.candidate_name ? `${analysisData.analysis.candidate_name}'s Report` : "Resume Analysis Report"}
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base">
              Comprehensive breakdown of your resume&apos;s competitive standing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => analyze()}
              disabled={isLoading}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
            >
              {isLoading ? "Analyzing..." : "Refresh Analysis"}
            </button>
            <button
              onClick={() => handleimprovements()}
              disabled={isImprovementsLoading}
              className="px-6 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isImprovementsLoading ? (
                <>
                  <span className="w-3 h-3 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                  Extracting...
                </>
              ) : showImprovements ? (
                "Hide Suggestions"
              ) : (
                "View Suggestions"
              )}
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Main Content Column (2/3) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Overall Score Card */}
               <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                 <h3 className="text-xs font-bold text-gray-400 dark:text-zinc-500 mb-4 w-full text-left uppercase tracking-widest">Overall ATS Match</h3>
                 <div className="w-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                   <Component score={overall_score} />
                 </div>
               </div>

               {/* Quality Metrics Outline */}
               <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm flex flex-col justify-center">
                 <h3 className="text-xs font-bold text-gray-400 dark:text-zinc-500 mb-6 uppercase tracking-widest">Core Proficiencies</h3>
                 {analysisData?.analysis?.resume_quality_score ? (
                   <div className="space-y-4">
                     {[
                       { label: "Formatting", value: analysisData.analysis.resume_quality_score.formatting, max: 20 },
                       { label: "Sections", value: analysisData.analysis.resume_quality_score.sections, max: 20 },
                       { label: "Readability", value: analysisData.analysis.resume_quality_score.readability, max: 20 },
                       { label: "Grammar", value: analysisData.analysis.resume_quality_score.grammar, max: 15 },
                       { label: "Bullet Points", value: analysisData.analysis.resume_quality_score.bullet_points, max: 15 },
                       { label: "Length", value: analysisData.analysis.resume_quality_score.length, max: 10 },
                     ].map(m => (
                       <div key={m.label} className="group/bar">
                         <div className="flex justify-between text-xs mb-1.5">
                           <span className="font-medium text-gray-700 dark:text-zinc-300 group-hover/bar:text-indigo-600 dark:group-hover/bar:text-indigo-400 transition-colors">{m.label}</span>
                           <span className="text-gray-500 dark:text-zinc-500 font-semibold">{m.value}/{m.max}</span>
                         </div>
                         <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                           <div className="h-full bg-indigo-500 dark:bg-indigo-600 rounded-full transition-all duration-1000 ease-out" style={{ width: `${(m.value / m.max) * 100}%` }} />
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="h-full flex items-center justify-center text-sm text-gray-400 italic">Run analysis to populate core metrics.</div>
                 )}
               </div>
            </div>

            {/* Role Relevance Bar Chart */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 dark:text-zinc-500 mb-6 uppercase tracking-widest">Role Relevance Alignment</h3>
              <div className="w-full flex items-center justify-center min-h-[220px]">
                <ChartBarLabel role={roleRelevance} />
              </div>
            </div>

          </div>

          {/* Side Column (1/3) */}
          <div className="flex flex-col gap-6">
            
            {/* Career Time Distribution Pie Chart */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm h-full max-h-[360px] flex flex-col">
              <h3 className="text-xs font-bold text-gray-400 dark:text-zinc-500 mb-6 uppercase tracking-widest shrink-0">Experience Distribution</h3>
              <div className="w-full flex-1 flex justify-center items-center">
                <PieLabelCustom ct={careerTime} />
              </div>
            </div>

             {/* Action Box */}
             <div className="bg-zinc-900 dark:bg-slate-900 rounded-xl border border-gray-900 dark:border-zinc-800 p-6 shadow-md text-white">
               <h3 className="text-lg font-semibold mb-2">Ready to Apply?</h3>
               <p className="text-gray-400 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                 Your resume profile is active. Discover automated job matches filtered precisely against your strengths.
               </p>
               <Link
                 href="/jobs"
                 className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
               >
                 View Job Matches
                 <ArrowRightIcon className="w-4 h-4" />
               </Link>
             </div>

          </div>

        </div>

        {/* Improvements Section (Conditional) */}
        {showImprovements && (
          <div className="mt-8 animate-fade-in border-t border-gray-200 dark:border-zinc-800 pt-8">
             <Imporvements data={improvements} />
          </div>
        )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AnalysisPage;

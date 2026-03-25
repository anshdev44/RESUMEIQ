"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";

type Job = {
  job_title: string;
  match_percentage: number;
  skills: string[];
};

const JobCard = ({ job, matchPercentage }: { job: any, matchPercentage?: number }) => {
  return (
    <div className="p-8 rounded-3xl border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-black/[0.04] transition-all bg-white group relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 left-0 w-1 h-full bg-black group-hover:bg-indigo-500 transition-colors" />
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 flex-1">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="text-2xl font-bold">
              {job.job_title}
            </h2>
            {matchPercentage && (
                <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 text-xs font-bold rounded-full">
                  {matchPercentage}% Match
                </span>
            )}
            {job.job_is_remote && (
              <span className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 text-xs font-semibold rounded-full">
                Remote
              </span>
            )}
            {job.job_employment_type && (
              <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold rounded-full">
                {job.job_employment_type}
              </span>
            )}
          </div>
          <p className="text-lg text-gray-600 font-medium mb-4">
            {job.employer_name} {job.job_city || job.job_state || job.job_country ? `• ${[job.job_city, job.job_state, job.job_country].filter(Boolean).join(", ")}` : ""}
          </p>
          <div className="text-sm text-gray-500 mb-6 flex flex-wrap gap-2 items-center">
              <span>Posted: {job.job_posted_at}</span>
              {job.job_publisher && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>via {job.job_publisher}</span>
                </>
              )}
          </div>
        </div>
        <Link
          href={job.job_apply_link || "#"}
          target="_blank"
          className="cursor-pointer px-8 py-3 bg-black text-white font-medium rounded-full shadow-lg hover:bg-gray-800 transition-all shrink-0 text-center"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

const JobSection = ({ title, jobs, baseMatch }: { title: string, jobs: any[], baseMatch?: number }) => {
    const [visibleCount, setVisibleCount] = useState(2);
    
    if (!jobs || jobs.length === 0) return null;
    
    const visibleJobs = jobs.slice(0, visibleCount);
    const hasMore = visibleCount < jobs.length;
    
    return (
        <div className="mb-12 animate-fade-up">
            <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            <div className="grid gap-6">
                {visibleJobs.map((job, idx) => (
                    <JobCard key={job.job_id || idx} job={job} matchPercentage={baseMatch} />
                ))}
            </div>
            {hasMore && (
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => setVisibleCount(prev => prev + 3)}
                        className="cursor-pointer px-6 py-2 border border-gray-300 rounded-full font-medium text-gray-600 hover:text-black hover:border-gray-500 transition-all bg-white"
                    >
                        View More Similar Jobs ({jobs.length - visibleCount} more)
                    </button>
                </div>
            )}
        </div>
    );
};

const JobsPage = () => {
  const { data: session } = useSession();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [res_job_1, setRes_job_1] = useState<any[]>([]);
  const [res_job_2, setRes_job_2] = useState<any[]>([]);
  const [res_job_3, setRes_job_3] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchJobDetails = async (bestJobs: Job[]) => {
    console.log("fetching detailed jobs from API");
    try {
        const fetchRole = async (jobRole: string) => {
            if (!jobRole) return { data: [] };
            const role = jobRole.replaceAll(" ", "%20");
            const res = await fetch(`http://localhost:3000/api/Getjobs?role=${role}`);
            if (!res.ok) throw new Error("Failed to fetch");
            return await res.json();
        };

        const [res1, res2, res3] = await Promise.all([
            fetchRole(bestJobs[0]?.job_title || ""),
            fetchRole(bestJobs[1]?.job_title || ""),
            fetchRole(bestJobs[2]?.job_title || "")
        ]);
        
        setRes_job_1(Array.isArray(res1) ? res1 : (res1?.data || []));
        setRes_job_2(Array.isArray(res2) ? res2 : (res2?.data || []));
        setRes_job_3(Array.isArray(res3) ? res3 : (res3?.data || []));
    } catch (error) {
        console.log("Error fetching specific jobs:", error);
    }
  };

  const fetchJobsNames = async () => {
    setIsLoading(true);
    setHasFetched(true);
    console.log("Starting job search workflow...");

    try {
      const email = session?.user?.email;

      if (!email) {
        console.log("No email found");
        setIsLoading(false);
        return;
      }

      const res = await fetch("http://localhost:3000/api/finduserid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        console.log("failed to fetch user_id");
        setIsLoading(false);
        return;
      }

      const { user_id } = await res.json();

      const res_1 = await fetch("http://localhost:3000/api/findresumetext", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          file_name: `${session?.user?.name || "User"}_resume`,
        }),
      });

      if (!res_1.ok) {
        console.log("failed to fetch resume_text");
        setIsLoading(false);
        return;
      }

      const { resume_text } = await res_1.json();

      const res_2 = await fetch("http://localhost:3000/api/getbestjobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: resume_text }),
      });

      if (!res_2.ok) {
        console.log("failed to fetch best jobs");
        setIsLoading(false);
        return;
      }

      const { analysis } = await res_2.json();

      console.log("API result analysis:", analysis);
      
      const fetchedBestJobs = analysis.jobs || [];
      setJobs(fetchedBestJobs);
      
      if (fetchedBestJobs.length > 0) {
        await fetchJobDetails(fetchedBestJobs);
      }
      
    } catch (error) {
      console.log("Error during workflow", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans pb-20">
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
              href="/analysis"
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              Back to Analysis
            </Link>
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  {session.user?.name ?? "User"}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="cursor-pointer text-sm font-medium px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 transition-all bg-white"
                >
                  Sign Out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-12 animate-fade-up">
          <Link
            href="/analysis"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center mr-3 group-hover:border-black transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </div>
            Back to Analysis
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
                    Recommended Jobs
                </h1>
                <p className="text-xl text-gray-500">
                    Curated matches for{" "}
                    <span className="text-black font-semibold">
                    {session?.user?.name || "you"}
                    </span>
                </p>
            </div>
            <button
                onClick={fetchJobsNames}
                disabled={isLoading}
                className="cursor-pointer flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-medium rounded-full shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-indigo-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing Matches...
                    </>
                ) : (
                    "Find Best Matches"
                )}
            </button>
          </div>
        </div>

        {hasFetched && !isLoading && res_job_1.length === 0 && res_job_2.length === 0 && res_job_3.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm animate-fade-up">
                <p className="text-gray-500 text-lg">No jobs found that match your profile. Try updating your resume.</p>
            </div>
        )}

        {hasFetched && (
            <div className="space-y-12">
                {jobs[0] && res_job_1.length > 0 && (
                    <JobSection 
                        title={`Best Match: ${jobs[0].job_title}`} 
                        jobs={res_job_1} 
                        baseMatch={jobs[0].match_percentage} 
                    />
                )}
                
                {jobs[1] && res_job_2.length > 0 && (
                    <JobSection 
                        title={`Strong Match: ${jobs[1].job_title}`} 
                        jobs={res_job_2} 
                        baseMatch={jobs[1].match_percentage} 
                    />
                )}

                {jobs[2] && res_job_3.length > 0 && (
                    <JobSection 
                        title={`Good Match: ${jobs[2].job_title}`} 
                        jobs={res_job_3} 
                        baseMatch={jobs[2].match_percentage} 
                    />
                )}
            </div>
        )}

        {!hasFetched && !isLoading && (
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-200 shadow-sm animate-fade-up delay-100 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to find your next role?</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">We'll analyze your resume against thousands of open positions to find the perfect match for your skills and experience.</p>
                <button
                    onClick={fetchJobsNames}
                    className="cursor-pointer px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors shadow-lg"
                >
                    Start Job Search
                </button>
            </div>
        )}
      </main>
    </div>
  );
};

export default JobsPage;

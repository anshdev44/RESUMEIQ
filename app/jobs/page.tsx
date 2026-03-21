"use client";

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

const JobsPage = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xs">IQ</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">ResumeIQ</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/analysis" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Back to Analysis
            </Link>
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{session.user?.name ?? "User"}</span>
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

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-12 animate-fade-up">
            <Link href="/analysis" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors group">
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center mr-3 group-hover:border-black transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
                Back to Analysis
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Recommended Jobs</h1>
            <p className="text-xl text-gray-500">Curated matches for <span className="text-black font-medium">{session?.user?.name}</span> based on a 92/100 profile score.</p>
        </div>

        <div className="grid gap-6 animate-fade-up delay-100">
            {/* Job Card 1 */}
            <div className="p-8 rounded-3xl border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-black/[0.04] transition-all bg-white group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h2 className="text-2xl font-bold">Senior Full Stack Engineer</h2>
                            <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 text-xs font-bold rounded-full">98% Match</span>
                            <span className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 text-xs font-semibold rounded-full">Remote</span>
                        </div>
                        <p className="text-lg text-gray-600 font-medium mb-6">Stripe • San Francisco, CA</p>
                        
                        <div className="flex gap-2 flex-wrap">
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700">React</span>
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700">Node.js</span>
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700">TypeScript</span>
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700">System Architecture</span>
                        </div>
                    </div>
                    <button className="px-8 py-3 bg-black text-white font-medium rounded-full shadow-lg shadow-black/10 hover:bg-gray-800 transition-all shrink-0">
                        Apply Now
                    </button>
                </div>
            </div>

            {/* Job Card 2 */}
            <div className="p-8 rounded-3xl border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-black/[0.04] transition-all bg-white group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-400" />
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h2 className="text-2xl font-bold">Staff Software Engineer</h2>
                            <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 text-xs font-bold rounded-full">94% Match</span>
                            <span className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 text-xs font-semibold rounded-full">Remote</span>
                        </div>
                        <p className="text-lg text-gray-600 font-medium mb-6">Vercel • Remote</p>
                        
                        <div className="flex gap-2 flex-wrap">
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700">Next.js</span>
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700">React</span>
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700">Rust</span>
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700">Performance Optimization</span>
                        </div>
                    </div>
                    <button className="px-8 py-3 bg-black text-white font-medium rounded-full shadow-lg shadow-black/10 hover:bg-gray-800 transition-all shrink-0">
                        Apply Now
                    </button>
                </div>
            </div>

            {/* Job Card 3 */}
            <div className="p-8 rounded-3xl border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-black/[0.04] transition-all bg-white group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400" />
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h2 className="text-2xl font-bold">Lead Frontend Engineer</h2>
                            <span className="px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-bold rounded-full">87% Match</span>
                            <span className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 text-xs font-semibold rounded-full">Hybrid</span>
                        </div>
                        <p className="text-lg text-gray-600 font-medium mb-6">Airbnb • New York, NY</p>
                        
                        <div className="flex gap-2 flex-wrap">
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700">JavaScript</span>
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700">UI/UX</span>
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700">Team Leadership</span>
                        </div>
                    </div>
                    <button className="px-8 py-3 bg-white text-black border border-gray-200 font-medium rounded-full shadow-sm hover:border-gray-400 hover:bg-gray-50 transition-all shrink-0">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;

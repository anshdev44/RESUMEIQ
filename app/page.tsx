"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";

/* ──────────────────────────── ICONS (inline SVG) ──────────────────────────── */

function FileTextIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}

function ChartBarIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      />
    </svg>
  );
}

function SparklesIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
      />
    </svg>
  );
}

function BriefcaseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
      />
    </svg>
  );
}

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

function UploadIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

function CpuChipIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
      />
    </svg>
  );
}

function RocketIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      />
    </svg>
  );
}

function MenuIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function CloseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

/* ──────── Centered container helper (inline styles bypass Tailwind layer issues) ──────── */

const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1152px",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "24px",
  paddingRight: "24px",
};

const containerNarrowStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "960px",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "24px",
  paddingRight: "24px",
};

/* ──────────────────────────── NAVBAR ──────────────────────────────────────── */

function Navbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      className={`transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div
        style={{
          ...containerStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <Link href="/overview" className="flex items-center gap-2.5 group">
          <div
            className="bg-black dark:bg-white group-hover:scale-105 transition-transform shadow-md dark:shadow-white/10"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="text-white dark:text-black" style={{ fontWeight: 700, fontSize: 14 }}>
              IQ
            </span>
          </div>
          <span
            className="text-black dark:text-white"
            style={{ fontWeight: 600, fontSize: 20, letterSpacing: "-0.02em" }}
          >
            ResumeIQ
          </span>
        </Link>

        {/* Desktop nav links */}
        <div
          className="hidden md:flex items-center gap-8"
          style={{ fontSize: 14, color: "#6b7280" }}
        >
          <Link
            href="/overview"
            className="hover:text-black transition-colors"
            style={{ padding: "8px 0" }}
          >
            Overview
          </Link>
          <a
            href="#features"
            className="hover:text-black transition-colors"
            style={{ padding: "8px 0" }}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-black transition-colors"
            style={{ padding: "8px 0" }}
          >
            How It Works
          </a>
        </div>

        {session ? (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm font-medium">
              {session.user?.name ?? "User"}
            </span>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: "10px 20px",
                borderRadius: 9999,
                border: "1px solid #e5e7eb",
              }}
              className="cursor-pointer text-gray-600 hover:text-black hover:border-gray-400 transition-all"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/login"
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: "10px 20px",
                borderRadius: 9999,
                border: "1px solid #e5e7eb",
              }}
              className="text-gray-600 hover:text-black hover:border-gray-400 transition-all"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:shadow-lg"
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: "10px 28px",
                borderRadius: 9999,
              }}
            >
              Sign up
            </Link>
          </div>
        )}

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            style={{ padding: 8, borderRadius: 8 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 animate-fade-in"
          style={{ padding: "0 24px 24px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Link
              href="/overview"
              style={{
                fontSize: 16,
                fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid #f9fafb",
              }}
              className="text-gray-600 hover:text-black transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Overview
            </Link>
            <a
              href="#features"
              style={{
                fontSize: 16,
                fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid #f9fafb",
              }}
              className="text-gray-600 hover:text-black transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              style={{
                fontSize: 16,
                fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid #f9fafb",
              }}
              className="text-gray-600 hover:text-black transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              How It Works
            </a>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 16,
            }}
          >
            <Link
              href="/login"
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: 500,
                padding: "12px 24px",
                borderRadius: 9999,
                border: "1px solid #e5e7eb",
              }}
              className="text-gray-700 hover:border-gray-400 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: 500,
                padding: "12px 24px",
                borderRadius: 9999,
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ──────────────────────────── HERO ──────────────────────────────────────── */

function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: 72,
      }}
    >
      {/* Subtle grid background */}
      <div
        className="dark:opacity-5 transition-opacity duration-500"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Spotlight Orb */}
      <div
        className="bg-gradient-to-br from-gray-100 to-gray-100 dark:from-white/10 dark:via-white/5 dark:to-transparent transition-colors duration-1000"
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "1200px",
          height: "800px",
          borderRadius: "50%",
          filter: "blur(120px)",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Right Floating Widget - ATS Score */}
      <div 
        className="absolute right-[5%] xl:right-[15%] top-[25%] hidden lg:flex flex-col gap-4 p-5 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl dark:shadow-[0_0_40px_rgba(16,185,129,0.05)] animate-float hover:scale-105 transition-transform duration-500"
        style={{ width: 280, animationDelay: "1s" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border-[3px] border-emerald-500 flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">94</span>
          </div>
          <div>
            <p className="font-semibold text-sm text-black dark:text-white">ATS Score</p>
            <p className="text-xs text-gray-500 dark:text-zinc-400">Excellent Match</p>
          </div>
        </div>
        <div className="space-y-3 mt-1">
          <div className="h-2 w-full bg-gray-200/50 dark:bg-zinc-800 rounded-full overflow-hidden">
             <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 w-[94%]" />
          </div>
          <div className="flex items-center gap-2 text-xs text-black dark:text-zinc-300">
            <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Keywords perfectly optimized</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-black dark:text-zinc-300">
            <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Formatting standard met</span>
          </div>
        </div>
      </div>

      {/* Left Floating Widget - AI Insight */}
      <div 
        className="absolute left-[5%] xl:left-[12%] top-[45%] hidden lg:flex flex-col gap-3 p-4 rounded-xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl dark:shadow-[0_0_40px_rgba(99,102,241,0.05)] animate-float hover:scale-105 transition-transform duration-500"
        style={{ width: 240, animationDelay: "0.2s" }}
      >
         <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
           </div>
           <p className="text-sm font-medium text-black dark:text-white">Action Verb Enhanced</p>
         </div>
         <p className="text-xs text-gray-500 dark:text-zinc-400 ml-11 leading-relaxed">&quot;Spearheaded&quot; converts 40% better than &quot;Led&quot;.</p>
      </div>

      <div
        style={{
          position: "relative",
          maxWidth: 896,
          marginLeft: "auto",
          marginRight: "auto",
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          className="group animate-fade-up bg-white/40 dark:bg-zinc-900/50 backdrop-blur-md text-gray-500 dark:text-zinc-300 border-gray-200 dark:border-white/10 border hover:border-black/10 dark:hover:border-indigo-500/50 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all cursor-pointer relative overflow-hidden"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 40,
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
            }}
            className="animate-pulse bg-black dark:bg-white"
          />
          AI-Powered Resume Analysis
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up delay-100"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
          }}
        >
          <span className="text-black dark:text-white drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Your resume,</span>
          <br />
          <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-green-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient inline-block mt-1 pb-2 drop-shadow-sm dark:drop-shadow-[0_0_20px_rgba(167,139,250,0.4)]">
            perfected.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up delay-200 text-gray-500 dark:text-zinc-400"
          style={{
            marginTop: 28,
            fontSize: "clamp(16px, 2vw, 20px)",
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.7,
            padding: "0 16px",
          }}
        >
          Upload your resume and get instant, intelligent feedback. Beat ATS
          filters and land more interviews.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-up delay-300"
          style={{
            marginTop: 48,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Link
            href="/upload"
            className="group relative bg-black dark:bg-white text-white dark:text-black hover:scale-105 transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] ring-1 ring-black/5 dark:ring-white/20 dark:hover:ring-white/50"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              width: "100%",
              maxWidth: 280,
              padding: "16px 40px",
              borderRadius: 9999,
              fontSize: 16,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Get started free
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="#features"
            style={{
              fontSize: 16,
              fontWeight: 500,
              padding: "16px 32px",
              textDecoration: "none",
            }}
            className="hover:text-black dark:hover:text-white transition-colors text-gray-500 dark:text-zinc-400"
          >
            Learn more ↓
          </a>
        </div>

        {/* Stats strip */}
        <div
          className="animate-fade-up delay-500"
          style={{
            marginTop: 80,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px 56px",
            textAlign: "center",
          }}
        >
          {[
            { value: "50K+", label: "Resumes analyzed" },
            { value: "93%", label: "Success rate" },
            { value: "< 30s", label: "Analysis time" },
          ].map((stat) => (
            <div key={stat.label} style={{ minWidth: 100 }}>
              <p
                className="text-black dark:text-white drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </p>
              <p className="text-gray-400 dark:text-zinc-500" style={{ fontSize: 13, marginTop: 4 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── FEATURES ──────────────────────────────────── */

const features = [
  {
    icon: FileTextIcon,
    title: "AI Analysis",
    description:
      "Deep analysis of content, structure, and formatting powered by advanced AI models.",
  },
  {
    icon: ChartBarIcon,
    title: "ATS Scoring",
    description:
      "See exactly how your resume performs against Applicant Tracking Systems.",
  },
  {
    icon: SparklesIcon,
    title: "Smart Suggestions",
    description:
      "Actionable, personalized recommendations to make your resume stand out.",
  },
  {
    icon: BriefcaseIcon,
    title: "Job Recommendations",
    description:
      "Get matched with relevant job openings based on your resume skills and experience.",
  },
];

function Features() {
  return (
    <section id="features" style={{ padding: "96px 0" }}>
      <div style={containerStyle}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p
            className="text-gray-400 dark:text-zinc-500"
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Features
          </p>
          <h2
            className="text-black dark:text-white"
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Everything you need
          </h2>
          <p
            className="text-gray-500 dark:text-zinc-400"
            style={{
              marginTop: 16,
              maxWidth: 448,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: 16,
            }}
          >
            Powerful tools to transform your resume from good to exceptional.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/[0.04] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.06)] transition-all duration-500 bg-white dark:bg-zinc-900/40 dark:backdrop-blur-xl border-gray-200 dark:border-white/10 dark:hover:border-white/30 border relative overflow-hidden"
              style={{
                padding: 32,
                borderRadius: 16,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-purple-500/0 dark:group-hover:from-indigo-500/10 dark:group-hover:to-purple-500/10 transition-colors duration-500" />
              {/* Icon */}
              <div
                className="group-hover:bg-black group-hover:text-white group-hover:border-black dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300 bg-gray-50 dark:bg-zinc-800/80 border-gray-100 dark:border-white/5 border dark:text-zinc-300 group-hover:animate-float group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] relative z-10"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <feature.icon className="w-6 h-6" />
              </div>

              <h3 className="text-black dark:text-white" style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-zinc-400" style={{ fontSize: 14, lineHeight: 1.7 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── HOW IT WORKS ──────────────────────────────── */

const steps = [
  {
    icon: UploadIcon,
    step: "01",
    title: "Upload",
    description: "Drop your resume in PDF, DOCX, or plain text format.",
  },
  {
    icon: CpuChipIcon,
    step: "02",
    title: "Analyze",
    description:
      "Our AI scans structure, keywords, readability, and ATS compatibility.",
  },
  {
    icon: RocketIcon,
    step: "03",
    title: "Improve",
    description:
      "Get a detailed report with scores and actionable suggestions.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-gray-50/60 dark:bg-zinc-950/50 dark:border-t dark:border-white/5"
      style={{ padding: "96px 0" }}
    >
      <div style={containerNarrowStyle}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p
            className="text-gray-400 dark:text-zinc-500"
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Process
          </p>
          <h2
            className="text-black dark:text-white"
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Three simple steps
          </h2>
          <p
            className="text-gray-500 dark:text-zinc-400"
            style={{
              marginTop: 16,
              maxWidth: 448,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: 16,
            }}
          >
            From upload to actionable insight — it takes under a minute.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 40,
          }}
        >
          {steps.map((item) => (
            <div key={item.step} style={{ textAlign: "center" }}>
              {/* Step number */}
              <span
                className="text-gray-100 dark:text-white/5"
                style={{
                  fontSize: 100,
                  fontWeight: 700,
                  lineHeight: 1,
                  display: "block",
                  userSelect: "none",
                }}
              >
                {item.step}
              </span>

              {/* Icon */}
              <div
                className="bg-black dark:bg-white text-white dark:text-black shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_0_25px_rgba(255,255,255,0.15)] ring-4 ring-white dark:ring-zinc-950"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "-32px auto 24px",
                }}
              >
                <item.icon className="w-7 h-7" />
              </div>

              <h3 className="text-black dark:text-white" style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
                {item.title}
              </h3>
              <p
                className="text-gray-500 dark:text-zinc-400"
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  maxWidth: 280,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── CTA SECTION ──────────────────────────────── */

function CTA() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div style={{ ...containerNarrowStyle, maxWidth: 896 }}>
        <div
          className="bg-black dark:bg-zinc-900/40 dark:backdrop-blur-xl dark:border dark:border-white/10 dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] text-white"
          style={{
            position: "relative",
            borderRadius: 24,
            padding: "80px 40px",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Decorative dots */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.05,
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div style={{ position: "relative" }}>
            <h2
              className="text-white drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Ready to perfect
              <br />
              your resume?
            </h2>
            <p
              className="text-gray-400 dark:text-zinc-300"
              style={{
                marginTop: 20,
                maxWidth: 512,
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 17,
              }}
            >
              Join thousands of job seekers who&apos;ve improved their resumes
              with ResumeIQ.
            </p>
            <Link
              href="/upload"
              className="group bg-white dark:bg-white/10 text-black dark:text-white border dark:border-white/20 hover:scale-105 dark:hover:bg-white/20 transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: 40,
                padding: "16px 40px",
                borderRadius: 9999,
                fontSize: 16,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Start for free
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── FOOTER ──────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800" style={{ padding: "48px 0" }}>
      <div
        style={{
          ...containerStyle,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            className="bg-black dark:bg-white"
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="text-white dark:text-black" style={{ fontWeight: 700, fontSize: 11 }}>
              IQ
            </span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600 }}>ResumeIQ</span>
        </div>

        {/* Links */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px 32px",
            fontSize: 14,
            color: "#9ca3af",
          }}
        >
          <a href="#features" className="hover:text-black dark:hover:text-white transition-colors">
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            How It Works
          </a>
          <Link href="/login" className="hover:text-black dark:hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/signup" className="hover:text-black dark:hover:text-white transition-colors">
            Sign Up
          </Link>
        </div>

        {/* Copyright */}
        <p style={{ fontSize: 14, color: "#9ca3af" }}>
          © {new Date().getFullYear()} ResumeIQ
        </p>
      </div>
    </footer>
  );
}

/* ──────────────────────────── PAGE ──────────────────────────────────────── */

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-100 via-slate-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 min-h-screen animate-fade-in transition-colors duration-500">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

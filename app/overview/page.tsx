"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

/* ──────────────────────────── Icons (inline SVG) ──────────────────────────── */

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

/* ──────── Centered container helper ──────── */

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
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
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
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            style={{
              width: 36,
              height: 36,
              backgroundColor: "#000",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="group-hover:scale-105 transition-transform"
          >
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
              IQ
            </span>
          </div>
          <span
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
            href="/"
            className="hover:text-black transition-colors"
            style={{ padding: "8px 0" }}
          >
            Home
          </Link>
          <a
            href="#what-is"
            className="hover:text-black transition-colors"
            style={{ padding: "8px 0" }}
          >
            Project
          </a>
          <a
            href="#user-flow"
            className="hover:text-black transition-colors"
            style={{ padding: "8px 0" }}
          >
            How It Works
          </a>
        </div>

        {session ? (
          <div className="flex items-center gap-4">
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
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: "10px 28px",
                borderRadius: 9999,
                backgroundColor: "#000",
                color: "#fff",
              }}
              className="hover:bg-gray-800 transition-all hover:shadow-lg"
            >
              Sign up
            </Link>
          </div>
        )}

        {/* Mobile hamburger */}
        <button
          className="md:hidden hover:bg-gray-100 transition-colors"
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden bg-white border-b border-gray-200 animate-fade-in"
          style={{ padding: "0 24px 24px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Link
              href="/"
              style={{
                fontSize: 16,
                fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid #f9fafb",
              }}
              className="text-gray-600 hover:text-black transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <a
              href="#what-is"
              style={{
                fontSize: 16,
                fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid #f9fafb",
              }}
              className="text-gray-600 hover:text-black transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Project
            </a>
            <a
              href="#user-flow"
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
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: 500,
                padding: "12px 24px",
                borderRadius: 9999,
                backgroundColor: "#000",
                color: "#fff",
              }}
              className="hover:bg-gray-800 transition-all"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ──────────────────────────── HERO SECTION ──────────────────────────────────────── */

function HeroOverview() {
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
      {/* Gradient orb */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          background: "linear-gradient(to bottom right, #f3f4f6, #e5e7eb)",
          borderRadius: "50%",
          filter: "blur(48px)",
          opacity: 0.6,
        }}
      />

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
        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
          }}
        >
          What is
          <br />
          <span style={{ color: "#9ca3af" }}>ResumeIQ?</span>
        </h1>

        <p
          style={{
            marginTop: 28,
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#6b7280",
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.7,
            padding: "0 16px",
          }}
        >
          An intelligent, end-to-end career assistance platform that helps you evaluate, improve, and match your resume with job opportunities.
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────── WHAT IS RESUME IQ ──────────────────────────────────────── */

function WhatIsResumeIQ() {
  return (
    <section id="what-is" style={{ padding: "96px 0", backgroundColor: "#fafafa" }}>
      <div style={containerNarrowStyle}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: 12,
            }}
          >
            Project Overview
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            The Complete Solution
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gap: 32,
            marginBottom: 60,
          }}
        >
          {/* Core Description */}
          <div
            style={{
              padding: 32,
              borderRadius: 16,
              border: "1px solid #e5e7eb",
              backgroundColor: "#fff",
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Your Resume, Elevated</h3>
            <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.7, marginBottom: 20 }}>
              ResumeIQ is an AI-powered resume analysis platform that helps job seekers understand their resume quality, identify gaps, and match with relevant opportunities. Upload your resume in PDF, DOCX, or text format, and get instant insights about your professional profile.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#000", fontWeight: 700 }}>✓</span>
                <span style={{ color: "#6b7280" }}>AI-powered analysis using Google Gemini</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#000", fontWeight: 700 }}>✓</span>
                <span style={{ color: "#6b7280" }}>Extracts skills, experience, education, and certifications</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#000", fontWeight: 700 }}>✓</span>
                <span style={{ color: "#6b7280" }}>Matches you with job roles and opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── USER FLOW ──────────────────────────────────────── */

function UserFlow() {
  const flowSteps = [
    {
      icon: UploadIcon,
      title: "User Input",
      description: "Upload your resume (PDF, DOCX, or text) and optionally specify a target role or job description.",
      details: [
        "Upload resume in multiple formats",
        "Define career goals",
        "Target specific roles",
      ],
    },
    {
      icon: CpuChipIcon,
      title: "Processing Engine",
      description: "Our AI extracts text, analyzes structure, evaluates ATS compatibility, and extracts skills and keywords.",
      details: [
        "Parse resume sections",
        "ATS + formatting checks",
        "Skill/keyword extraction",
      ],
    },
    {
      icon: FileTextIcon,
      title: "Outputs & Insights",
      description: "Get a comprehensive report with scores, suggestions, and matched job opportunities.",
      details: [
        "ATS score + highlights",
        "Skill gaps + improvements",
        "Job match scores",
      ],
    },
  ];

  return (
    <section id="user-flow" style={{ padding: "96px 0" }}>
      <div style={containerStyle}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: 12,
            }}
          >
            End-to-End Flow
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            From Upload to Insight
          </h2>
          <p
            style={{
              color: "#6b7280",
              marginTop: 16,
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: 16,
            }}
          >
            The complete journey: what you do, what the system processes, and what you get.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 40,
          }}
        >
          {flowSteps.map((step, idx) => (
            <div key={step.title} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: 24,
                }}
              >
                <step.icon className="w-8 h-8" />
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>{step.title}</h3>
              <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                {step.description}
              </p>

              <ul style={{ textAlign: "left", fontSize: 13, color: "#6b7280" }}>
                {step.details.map((detail) => (
                  <li key={detail} style={{ marginBottom: 8, paddingLeft: 20, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0 }}>•</span>
                    {detail}
                  </li>
                ))}
              </ul>

              {idx < flowSteps.length - 1 && (
                <div
                  style={{
                    marginTop: 32,
                    fontSize: 20,
                    color: "#d1d5db",
                  }}
                >
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── KEY FEATURES ──────────────────────────────────────── */

function KeyFeatures() {
  const features = [
    {
      icon: ChartBarIcon,
      title: "Resume Quality Score",
      items: ["Formatting (20)", "Sections (20)", "Bullet Points (15)", "Readability (20)", "Length (10)", "Grammar (15)"],
    },
    {
      icon: SparklesIcon,
      title: "Role Relevance Match",
      items: ["4 best-fit roles", "Skill-based matching", "Score ranking", "Career guidance"],
    },
    {
      icon: FileTextIcon,
      title: "Experience Analysis",
      items: ["Work experience", "Education breakdown", "Projects & portfolio", "Certifications"],
    },
    {
      icon: BriefcaseIcon,
      title: "Job Matching",
      items: ["Job recommendations", "Match percentage", "Skill gap identification", "Missing keywords"],
    },
  ];

  return (
    <section style={{ padding: "96px 0", backgroundColor: "#fafafa" }}>
      <div style={containerStyle}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: 12,
            }}
          >
            Key Features
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Comprehensive Analysis
          </h2>
        </div>

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
              className="group hover:shadow-xl hover:shadow-black/[0.03] transition-all duration-300"
              style={{
                padding: 32,
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                backgroundColor: "#fff",
              }}
            >
              <div
                className="group-hover:bg-black group-hover:text-white transition-all duration-300"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  backgroundColor: "#f9fafb",
                  border: "1px solid #f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <feature.icon className="w-6 h-6" />
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
                {feature.title}
              </h3>

              <ul style={{ fontSize: 13, color: "#6b7280" }}>
                {feature.items.map((item) => (
                  <li key={item} style={{ marginBottom: 8, paddingLeft: 16, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── WHY IT HELPS ──────────────────────────────────────── */

function WhyItHelps() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div style={containerNarrowStyle}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: 12,
            }}
          >
            Impact
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Why ResumeIQ Matters
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#000" }}>
              For Job Seekers
            </h3>
            <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8 }}>
              <li style={{ marginBottom: 12 }}>✓ Beat ATS filters with optimization guidance</li>
              <li style={{ marginBottom: 12 }}>✓ Understand strengths and skill gaps</li>
              <li style={{ marginBottom: 12 }}>✓ Discover roles that match your profile</li>
              <li style={{ marginBottom: 12 }}>✓ Get AI-powered improvement suggestions</li>
              <li>✓ Track progress over multiple resume iterations</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#000" }}>
              The ResumeIQ Advantage
            </h3>
            <ul style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8 }}>
              <li style={{ marginBottom: 12 }}>✓ Simple upload → get insights in seconds</li>
              <li style={{ marginBottom: 12 }}>✓ Actionable, not just scores</li>
              <li style={{ marginBottom: 12 }}>✓ Job matching based on real skills</li>
              <li style={{ marginBottom: 12 }}>✓ Beautiful, intuitive interface</li>
              <li>✓ Data-driven career guidance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── CTA ──────────────────────────────────────── */

function CTA() {
  return (
    <section style={{ padding: "96px 0", backgroundColor: "#fafafa" }}>
      <div style={{ ...containerNarrowStyle, maxWidth: 896 }}>
        <div
          style={{
            position: "relative",
            backgroundColor: "#000",
            borderRadius: 24,
            padding: "80px 40px",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <h2
            style={{
              position: "relative",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            Ready to Optimize Your Resume?
          </h2>

          <p
            style={{
              position: "relative",
              fontSize: 16,
              color: "#d1d5db",
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 40,
            }}
          >
            Upload your resume now and get instant, AI-powered feedback to land more interviews.
          </p>

          <Link
            href="/upload"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              backgroundColor: "#fff",
              color: "#000",
              padding: "16px 40px",
              borderRadius: 9999,
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
            }}
            className="hover:shadow-lg hover:scale-105 transition-all group"
          >
            Get Started
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── PAGE ──────────────────────────────────────── */

export default function OverviewPage() {
  return (
    <>
      <Navbar />
      <HeroOverview />
      <WhatIsResumeIQ />
      <UserFlow />
      <KeyFeatures />
      <WhyItHelps />
      <CTA />
    </>
  );
}

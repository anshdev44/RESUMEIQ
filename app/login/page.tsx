"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  const { data: session } = useSession();
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-md animate-fade-up">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 justify-center mb-12 group"
        >
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-base">IQ</span>
          </div>
          <span className="font-semibold text-2xl tracking-tight">
            ResumeIQ
          </span>
        </Link>

        <h1 className="text-3xl font-bold text-center tracking-tight">
          Welcome back
        </h1>
        <p className="text-base text-gray-400 text-center mt-3 mb-10">
          Log in to your account to continue
        </p>

        <div className="space-y-4">
          {/* Google */}
          <button
             onClick={() => {
                signIn("google");
              }}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-gray-200 bg-white text-base font-medium hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
          >
            <GoogleIcon className="w-5 h-5" />
            Continue with Google
          </button>

          {/* GitHub */}
          <button
            onClick={() => {
              signIn("github");
            }}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-gray-200 bg-white text-base font-medium hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
          >
            <GitHubIcon className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-black font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

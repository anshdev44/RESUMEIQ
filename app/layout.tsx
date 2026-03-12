import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./sessionwrapper.js";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ResumeIQ — AI-Powered Resume Analysis",
  description:
    "Get instant, intelligent feedback on your resume. ResumeIQ analyzes formatting, content, and ATS compatibility to help you land more interviews.",
  keywords: ["resume", "AI", "analysis", "ATS", "career", "job"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}

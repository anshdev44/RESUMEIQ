"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useCallback, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { NextResponse } from "next/server";
import { ThemeToggle } from "@/components/theme-toggle";

interface UploadResult {
  success: boolean;
  filename: string;
  originalName: string;
  size: number;
  type: string;
  text: string;
}

function UploadCloudIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
      />
    </svg>
  );
}

function FileIcon({ className = "w-5 h-5" }: { className?: string }) {
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

function CheckCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
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
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function XCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
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
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function TrashIcon({ className = "w-4 h-4" }: { className?: string }) {
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
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function getFileExtension(name: string): string {
  return name.split(".").pop()?.toUpperCase() || "FILE";
}

const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "720px",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "24px",
  paddingRight: "24px",
};

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  // const [resumetext, setResumetext] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "text/plain",
  ];

  const handleredirect = () => {
    redirect("/analysis");
  };

  const validateFile = useCallback(
    (f: File): string | null => {
      if (!allowedTypes.includes(f.type)) {
        return "Invalid file type. Please upload a PDF, DOCX, DOC, or TXT file.";
      }
      if (f.size > 10 * 1024 * 1024) {
        return "File too large. Maximum size is 10MB.";
      }
      return null;
    },

    [],
  );

  const handleFile = useCallback(
    (f: File) => {
      const validationError = validateFile(f);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      setUploadResult(null);
      setFile(f);
    },
    [validateFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) handleFile(selected);
    },
    [handleFile],
  );

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        setError(uploadData.error || "Upload failed");
        return;
      }

      console.log("✅ text extracted successfully");

      const email = session?.user?.email;

      if (!email) {
        setError("User email not found");
        return;
      }

      // get user id
      const userRes = await fetch("/api/finduserid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const userData = await userRes.json();

      if (!userRes.ok) {
        setError(userData.error || "Could not fetch user id");
        return;
      }

      const user_id = userData.user_id;

      if (!user_id) {
        setError("User id not found in database");
        return;
      }

      // check if resume exists
      const checkRes = await fetch("/api/checkresume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      });

      const checkData = await checkRes.json();

      if (!checkRes.ok) {
        setError(checkData.error || "Error checking resume");
        return;
      }

      if (!checkData.exists) {
        const addRes = await fetch("/api/addresume", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id,
            file_name: `${session?.user?.name}_resume`,
            resume_text: uploadData.extractedText,
          }),
        });

        const addData = await addRes.json();

        if (!addRes.ok) {
          setError(addData.error || "Failed to add resume");
          return;
        }

        console.log("✅ resume_text added successfully");
      } else {
        const updateRes = await fetch("/api/updateresume", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id,
            file_name: `${session?.user?.name}_resume`,
            resume_text: uploadData.extractedText,
          }),
        });

        const updateData = await updateRes.json();

        if (!updateRes.ok) {
          setError(updateData.error || "Failed to update resume");
          return;
        }

        console.log("✅ resume_text updated successfully");
      }

      setUploadResult(uploadData);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 animate-fade-in transition-colors duration-500">
      <div
        className="opacity-5 dark:opacity-[0.03] transition-opacity duration-500"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <header
        className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl"
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1152px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "24px",
            paddingRight: "24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              className="bg-black dark:bg-white shadow-md dark:shadow-white/10"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="text-white dark:text-black" style={{ fontWeight: 700, fontSize: 12 }}>
                IQ
              </span>
            </div>
            <span
              className="text-black dark:text-white"
              style={{
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: "-0.02em",
              }}
            >
              ResumeIQ
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/"
              style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: 64, paddingBottom: 96 }}>
        <div style={containerStyle}>
          <div
            style={{ textAlign: "center", marginBottom: 48 }}
            className="animate-fade-up"
          >
            <h1
              className="text-black dark:text-white"
              style={{
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Upload your resume
            </h1>
            <p
              className="text-gray-500 dark:text-zinc-400"
              style={{
                marginTop: 12,
                fontSize: 16,
                maxWidth: 420,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Drop your file below and we&apos;ll analyze it with AI in seconds.
            </p>
          </div>

          {!uploadResult ? (
            <div className="animate-fade-up delay-100">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !file && fileInputRef.current?.click()}
                className={isDragging 
                  ? "border-black dark:border-white bg-gray-50 dark:bg-zinc-800/80 backdrop-blur-md" 
                  : "border-gray-300 dark:border-white/20 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl shadow-xl dark:shadow-black/50"}
                style={{
                  position: "relative",
                  borderWidth: 2,
                  borderStyle: "dashed",
                  borderRadius: 20,
                  padding: file ? "32px" : "64px 32px",
                  textAlign: "center",
                  cursor: file ? "default" : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleInputChange}
                  style={{ display: "none" }}
                />

                {!file ? (
                  <>
                    <div
                      className={`transition-all duration-200 bg-gray-50 dark:bg-zinc-800/60 border-gray-100 dark:border-white/10 border ${
                        isDragging ? "text-black dark:text-white" : "text-gray-400 dark:text-zinc-500"
                      }`}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                      }}
                    >
                      <UploadCloudIcon className="w-8 h-8" />
                    </div>
                    <p
                      className="text-black dark:text-white"
                      style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}
                    >
                      {isDragging
                        ? "Drop your file here"
                        : "Drag & drop your resume"}
                    </p>
                    <p
                      className="text-gray-400 dark:text-zinc-400"
                      style={{
                        fontSize: 14,
                        marginBottom: 20,
                      }}
                    >
                      or click to browse from your computer
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      {["PDF", "DOCX", "DOC", "TXT"].map((ext) => (
                        <span
                          key={ext}
                          className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            padding: "4px 12px",
                            borderRadius: 6,
                          }}
                        >
                          .{ext.toLowerCase()}
                        </span>
                      ))}
                    </div>
                    <p
                      style={{ fontSize: 12, color: "#d1d5db", marginTop: 16 }}
                    >
                      Maximum file size: 10MB
                    </p>
                  </>
                ) : (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <div
                      className="bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 border"
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span className="text-gray-500 dark:text-gray-400">
                        <FileIcon className="w-6 h-6" />
                      </span>
                    </div>

                    <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: 500,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {file.name}
                      </p>
                      <p
                        style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}
                      >
                        {getFileExtension(file.name)} ·{" "}
                        {formatFileSize(file.size)}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        resetUpload();
                      }}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                      className="hover:text-red-500 hover:border-red-200 transition-colors bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div
                  className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 16,
                    padding: "12px 16px",
                    borderRadius: 12,
                    fontSize: 14,
                  }}
                >
                  <span style={{ flexShrink: 0 }}>
                    <XCircleIcon className="w-5 h-5" />
                  </span>
                  {error}
                </div>
              )}

              {file && !uploading && (
                <button
                  onClick={handleUpload}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    marginTop: 20,
                    padding: "16px 32px",
                    borderRadius: 9999,
                    fontSize: 16,
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                  }}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all hover:scale-105 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] ring-1 ring-black/5 dark:ring-white/20"
                >
                  Analyze my resume
                </button>
              )}

              {uploading && (
                <div
                  className="bg-black dark:bg-white text-white dark:text-black"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    width: "100%",
                    marginTop: 20,
                    padding: "16px 32px",
                    borderRadius: 9999,
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  <svg
                    className="animate-spin"
                    style={{ width: 20, height: 20 }}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      opacity="0.25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      fill="currentColor"
                      opacity="0.75"
                    />
                  </svg>
                  Analyzing...
                </div>
              )}
            </div>
          ) : (
            <div className="animate-fade-up" style={{ textAlign: "center" }}>
              <div
                className="bg-green-50 dark:bg-green-900/20 text-green-500 dark:text-green-400"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                }}
              >
                <CheckCircleIcon className="w-10 h-10" />
              </div>
              <h2 className="text-black dark:text-white" style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
                Resume uploaded successfully!
              </h2>
              <p className="text-gray-500 dark:text-zinc-400" style={{ fontSize: 15, marginBottom: 8 }}>
                <span className="text-black dark:text-white" style={{ fontWeight: 500 }}>
                  {uploadResult.originalName}
                </span>{" "}
                ({formatFileSize(uploadResult.size)})
              </p>
              <p className="text-gray-400 dark:text-zinc-500" style={{ fontSize: 14, marginBottom: 32 }}>
                Your resume is being analyzed. Results will appear shortly.
              </p>
              <div>
                <button
                  onClick={handleredirect}
                  className="group relative mx-auto flex items-center justify-center px-8 py-4 
  border-2 border-black dark:border-white text-black dark:text-white font-semibold tracking-wide 
  hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 
  rounded-xl shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer"
                >
                  <span className="relative z-10 transition-colors duration-300">View Results</span>

                  <span
                    className="absolute inset-0 scale-0 bg-black dark:bg-white rounded-[10px] 
  transition-transform duration-300 group-hover:scale-100"
                  ></span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

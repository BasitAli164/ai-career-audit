"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisForm } from "@/components/analysis/AnalysisForm";
import { ResultsDashboard } from "@/components/results/ResultsDashboard";
import { Header } from "@/components/shared/Header";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { fetchGitHubRepos } from "@/lib/github/client";
import { Toaster, toast } from "sonner";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async (file, githubUrl) => {
    setLoading(true);
    try {
      // Extract username from GitHub URL
      const username = extractUsername(githubUrl);
      if (!username) throw new Error("Invalid GitHub URL");

      // 1. Parse PDF via API (server-side)
      const formData = new FormData();
      formData.append('file', file);
      
      const pdfRes = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });
      
      if (!pdfRes.ok) {
        const errorData = await pdfRes.json();
        throw new Error(errorData.error || 'Failed to parse PDF');
      }
      
      const { text: resumeText } = await pdfRes.json();

      // 2. Fetch GitHub repos
      const githubData = await fetchGitHubRepos(username);

      // 3. Call analysis API
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, githubData }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Analysis failed");
      }

      const data = await res.json();
      setResults(data);
      toast.success("Analysis complete! 🎉");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const extractUsername = (url) => {
    try {
      const parsed = new URL(url);
      const path = parsed.pathname.split("/").filter(Boolean);
      return path[0] || null;
    } catch {
      return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Header />
          <AnimatePresence mode="wait">
            {!results && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <AnalysisForm onSubmit={handleAnalyze} />
              </motion.div>
            )}
            {loading && <LoadingSpinner />}
            {results && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ResultsDashboard results={results} />
                <div className="text-center mt-8">
                  <button
                    onClick={() => setResults(null)}
                    className="text-sm text-gray-400 hover:text-white underline transition-colors"
                  >
                    ← Start over with a new analysis
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Toaster theme="dark" position="top-center" richColors />
    </main>
  );
}
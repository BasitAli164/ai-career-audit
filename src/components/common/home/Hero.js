"use client";

import { motion } from "framer-motion";
import UploadCard from "./UploadCard";

export default function Hero() {
  return (
    <section className="hero-grid">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-20 lg:grid-cols-2">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">

            Powered by Gemini AI + RAG

          </span>

          <h1 className="mt-8 text-6xl font-black leading-tight">

            Build a Resume

            <span className="gradient-text">

              {" "}Recruiters Love.

            </span>

          </h1>

          <p className="mt-6 text-lg text-slate-600">

            Upload your Resume, GitHub and Portfolio.

            Receive ATS analysis, Recruiter Feedback,

            Interview Questions and a personalized

            30-Day Career Roadmap.

          </p>

        </motion.div>

        <UploadCard />

      </div>

    </section>
  );
}
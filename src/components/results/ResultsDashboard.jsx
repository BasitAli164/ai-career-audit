"use client";

import { motion } from "framer-motion";
import { ScoreCard } from "./ScoreCard";
import { RoastCard } from "./RoastCard";
import { RecruiterFeedback } from "./RecruiterFeedback";
import { MissingSkills } from "./MissingSkills";
import { SuggestedProjects } from "./SuggestedProjects";
import { InterviewQuestions } from "./InterviewQuestions";
import { RoadmapTimeline } from "./RoadmapTimeline";

export function ResultsDashboard({ results }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Scores Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreCard label="Resume Score" score={results.resumeScore} />
        <ScoreCard label="ATS Score" score={results.atsScore} />
      </div>

      {/* Feedback & Roast */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecruiterFeedback feedback={results.recruiterFeedback} />
        <RoastCard roast={results.roastMode} />
      </div>

      {/* Missing Skills */}
      <MissingSkills skills={results.missingSkills} />

      {/* Suggested Projects */}
      <SuggestedProjects projects={results.suggestedProjects} />

      {/* Interview Questions */}
      <InterviewQuestions questions={results.interviewQuestions} />

      {/* Roadmap Timeline */}
      <RoadmapTimeline roadmap={results.roadmap} />
    </motion.div>
  );
}
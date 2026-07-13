/**
 * Generates the structured prompt for Gemini.
 * @param {string} resumeText - Extracted text from PDF
 * @param {Array} githubData - Array of repo objects (name, stars, language, description)
 * @returns {string} The full prompt
 */
export function analyzeResumeAndGitHub(resumeText, githubData) {
  const repoList = githubData
    .map(
      (repo) =>
        `- ${repo.name} (${repo.language || "Unknown"}, ${repo.stars} ⭐)${
          repo.description ? ` - ${repo.description}` : ""
        }`
    )
    .join("\n");

  return `
You are a Senior FAANG Recruiter with 15 years of experience. Analyze the following resume and GitHub profile, then produce a structured JSON report.

---

## RESUME
${resumeText}

---

## GITHUB REPOSITORIES
${repoList}

---

## INSTRUCTIONS
Return a valid JSON object with this exact shape:
{
  "resumeScore": number (0-100),
  "atsScore": number (0-100),
  "recruiterFeedback": "string (2-3 sentences, brutally honest)",
  "missingSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "suggestedProjects": [
    {
      "name": "Project Name",
      "description": "What to build",
      "techStack": ["tech1", "tech2"],
      "complexity": "Beginner" | "Intermediate" | "Advanced"
    }
  ],
  "interviewQuestions": ["Q1", "Q2", "Q3"],
  "roastMode": "Funny but constructive criticism about their GitHub",
  "roadmap": "30-day improvement plan broken into 4 weeks (use bullet points or paragraphs)"
}

Be specific, actionable, and honest. The student needs real help, not fluff.
`;
}
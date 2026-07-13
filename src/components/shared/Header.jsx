export function Header() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        AI Career Audit
      </h1>
      <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
        Upload your resume and GitHub profile. Get a recruiter's brutal honesty,
        missing skills, project ideas, and a 30-day roadmap.
      </p>
      <div className="flex justify-center gap-4 mt-4 text-sm text-gray-500">
        <span>📄 Resume Analyzer</span>
        <span>•</span>
        <span>🔍 ATS Check</span>
        <span>•</span>
        <span>🔥 Roast Mode</span>
      </div>
    </div>
  );
}
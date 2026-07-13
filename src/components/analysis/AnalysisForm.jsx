"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Link2, Loader2 } from "lucide-react";

export function AnalysisForm({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (accepted) => {
      if (accepted.length) setFile(accepted[0]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !githubUrl) {
      // show toast via sonner elsewhere
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(file, githubUrl);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gray-800/50 backdrop-blur border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          Upload & Analyze
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Dropzone */}
          <div>
            <Label>Resume (PDF)</Label>
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                transition-colors
                ${
                  file
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-600 hover:border-gray-400"
                }
              `}
            >
              <input {...getInputProps()} />
              {file ? (
                <div className="text-green-400">
                  <Upload className="inline mr-2" size={20} />
                  {file.name}
                </div>
              ) : (
                <div className="text-gray-400">
                  <Upload className="inline mr-2" size={20} />
                  Drag & drop your PDF here, or click to browse
                </div>
              )}
            </div>
          </div>

          {/* GitHub URL */}
          <div>
            <Label htmlFor="github">GitHub Profile URL</Label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <Input
                id="github"
                type="url"
                placeholder="https://github.com/yourusername"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="pl-10 bg-gray-900/50 border-gray-700 text-white"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!file || !githubUrl || isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze My Career"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
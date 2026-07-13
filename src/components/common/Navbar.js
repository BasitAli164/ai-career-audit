"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="gradient-bg rounded-xl p-2 text-white">

            <Sparkles size={18} />

          </div>

          <div>

            <h1 className="text-lg font-bold">

              AI Career Audit

            </h1>

          </div>

        </Link>

        <nav className="hidden gap-8 md:flex">

          <a href="#features">Features</a>

          <a href="#upload">Analyze</a>

          <a href="#about">About</a>

        </nav>

        <Button
          className="gradient-bg text-white"
        >
          Get Started
        </Button>

      </div>
    </header>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "./planContext";

export default function Navbar() {
  const pathname = usePathname();

  const { plan, saved } = usePlan();

  return (
    <nav className="bg-[#111111] text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="FitLog Logo"
            className="w-10 h-10 object-contain"
          />

          <span className="text-2xl font-black tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            href="/"
            className={`font-bold ${
              pathname === "/"
                ? "text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className={`font-bold ${
              pathname === "/my-plan"
                ? "text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            MY PLAN
          </Link>

        </div>

        {/* Counters */}
        <div className="flex items-center gap-2">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="bg-[#ccff00] text-black px-4 py-2 rounded-full font-black text-sm"
          >
            PLAN {plan.length}
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="border border-[#ccff00] text-[#ccff00] px-4 py-2 rounded-full font-black text-sm"
          >
            SAVED {saved.length}
          </Link>

        </div>

      </div>
    </nav>
  );
}
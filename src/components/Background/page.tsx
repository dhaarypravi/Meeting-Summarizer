"use client";
import React, { ReactNode } from "react";
import { BackgroundBeams } from "../ui/background-beams";

interface BackgroundBeamsDemoProps {
  children: ReactNode;
}

export function BackgroundBeamsDemo({ children }: BackgroundBeamsDemoProps) {
  return (
    <div className="relative w-full min-h-screen bg-neutral-950 overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <BackgroundBeams />
      </div>

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

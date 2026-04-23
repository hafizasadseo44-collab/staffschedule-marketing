"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";

import SimulationSidebar from "./SimulationSidebar";
import SimulationHeader from "./SimulationHeader";

// Import individual scenes (we will create these next)
import SimulationDashboard from "./scenes/SimulationDashboard";
import SimulationSchedule from "./scenes/SimulationSchedule";
import SimulationTeamChat from "./scenes/SimulationTeamChat";
import SimulationLocations from "./scenes/SimulationLocations";
import SimulationAnnouncements from "./scenes/SimulationAnnouncements";
import SimulationAnalytics from "./scenes/SimulationAnalytics";
import SimulationShiftSwaps from "./scenes/SimulationShiftSwaps";
import ScaleWrapper from "./ScaleWrapper";

const SCENES = [
  { id: "dashboard", navId: "dashboard", duration: 6000 },
  { id: "schedule", navId: "schedule", duration: 8000 },
  { id: "chat", navId: "chat", duration: 7000 },
  { id: "locations", navId: "locations", duration: 5000 },
  { id: "announcements", navId: "announcements", duration: 6000 },
  { id: "analytics", navId: "analytics", duration: 5000 },
  { id: "swaps", navId: "shift-swaps", duration: 5000 },
];

export default function FullProductSimulation() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50, clicking: false });

  const currentScene = SCENES[currentSceneIndex];

  // Auto-advance logic
  useEffect(() => {
    let startTime = Date.now();
    let animationFrameId: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = (elapsed / currentScene.duration) * 100;

      if (pct >= 100) {
        setProgress(0);
        setCurrentSceneIndex((prev) => (prev + 1) % SCENES.length);
      } else {
        setProgress(pct);
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentSceneIndex, currentScene.duration]);

  // Expose cursor control to scenes via props
  const updateCursor = useCallback((x: number, y: number, clicking = false) => {
    setCursorPos({ x, y, clicking });
  }, []);

  return (
    <ScaleWrapper targetWidth={1200} targetHeight={750}>
      <div className="w-full h-full bg-white flex flex-col isolation-auto">
        {/* Top Browser Chrome */}
        <div className="h-10 bg-slate-100 flex items-center px-4 flex-shrink-0 border-b border-slate-200">
          <div className="flex items-center gap-1.5 w-16">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 max-w-xl mx-auto flex items-center justify-center bg-white/60 h-6 rounded-md text-[11px] font-medium text-slate-500 shadow-sm border border-slate-200/50">
            <svg className="w-3 h-3 mr-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            app.staffschedule.io/{currentScene.id === "dashboard" ? "" : currentScene.id}
          </div>
          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Internal App Layout wrapper */}
        <div className="flex-1 flex overflow-hidden relative">
          <SimulationSidebar activeTab={currentScene.navId} />
          
          <div className="flex-1 flex flex-col min-w-0 bg-[#F4F0FC] relative z-0">
            <SimulationHeader locationName={currentScene.id === "locations" ? "Downtown Store" : "Main Branch"} />

            <main className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {currentScene.id === "dashboard" && <SimulationDashboard key="dashboard" isActive={true} updateCursor={updateCursor} />}
                {currentScene.id === "schedule" && <SimulationSchedule key="schedule" isActive={true} updateCursor={updateCursor} />}
                {currentScene.id === "chat" && <SimulationTeamChat key="chat" isActive={true} updateCursor={updateCursor} />}
                {currentScene.id === "locations" && <SimulationLocations key="locations" isActive={true} updateCursor={updateCursor} />}
                {currentScene.id === "announcements" && <SimulationAnnouncements key="announcements" isActive={true} updateCursor={updateCursor} />}
                {currentScene.id === "analytics" && <SimulationAnalytics key="analytics" isActive={true} updateCursor={updateCursor} />}
                {currentScene.id === "swaps" && <SimulationShiftSwaps key="swaps" isActive={true} updateCursor={updateCursor} />}
              </AnimatePresence>
            </main>
          </div>
        </div>

        {/* Global Cursor Overlay */}
        <motion.div
          className="absolute z-[100] w-6 h-6 pointer-events-none drop-shadow-md"
          animate={{
            left: `${cursorPos.x}%`,
            top: `${cursorPos.y}%`,
            scale: cursorPos.clicking ? 0.8 : 1,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
        >
          <MousePointer2 className="w-6 h-6 text-slate-800 fill-white" strokeWidth={2} />
          {cursorPos.clicking && (
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 rounded-full border-2 border-indigo-500"
            />
          )}
        </motion.div>

        {/* Minimal Bottom Progress Bar strictly for the simulation itself, like a video */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 z-[110]">
          <motion.div
            className="h-full bg-indigo-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </ScaleWrapper>
  );
}

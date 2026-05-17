"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";

import SimulationDashboard from "./scenes/SimulationDashboard";
import SimulationSchedule from "./scenes/SimulationSchedule";
import SimulationTeamChat from "./scenes/SimulationTeamChat";
import SimulationLocations from "./scenes/SimulationLocations";
import SimulationAnalytics from "./scenes/SimulationAnalytics";
import SimulationTeam from "./scenes/SimulationTeam";

interface InteractiveAppViewerProps {
  activeTab: string;
  isActive?: boolean;
}

export default function InteractiveAppViewer({ activeTab, isActive = true }: InteractiveAppViewerProps) {
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50, clicking: false });

  const updateCursor = useCallback((x: number, y: number, clicking = false) => {
    setCursorPos({ x, y, clicking });
  }, []);

  const urlMap: Record<string, string> = {
    team: "team.php",
    schedule: "schedule.php",
    dashboard: "dashboard.php",
    chat: "team-chat.php",
    locations: "locations.php",
    analytics: "analytics.php",
  };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#0f0f1a]">
      {/* Fake Browser Chrome — dark themed */}
      <div className="h-10 bg-[#1a1a2e] flex items-center px-4 flex-shrink-0 border-b border-white/5 z-20 gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-3 py-1 max-w-md w-full">
            <svg className="w-3 h-3 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[11px] font-medium text-white/50 truncate"
              >
                app.staffschedule.io/{urlMap[activeTab] ?? "dashboard.php"}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* App area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && <SimulationDashboard key="dashboard" isActive={isActive} updateCursor={updateCursor} />}
          {activeTab === "team"      && <SimulationTeam      key="team"      isActive={isActive} updateCursor={updateCursor} />}
          {activeTab === "schedule"  && <SimulationSchedule  key="schedule"  isActive={isActive} updateCursor={updateCursor} />}
          {activeTab === "chat"      && <SimulationTeamChat  key="chat"      isActive={isActive} updateCursor={updateCursor} />}
          {activeTab === "locations" && <SimulationLocations key="locations" isActive={isActive} updateCursor={updateCursor} />}
          {activeTab === "analytics" && <SimulationAnalytics key="analytics" isActive={isActive} updateCursor={updateCursor} />}
        </AnimatePresence>
      </div>

      {/* Cursor overlay */}
      <motion.div
        className="absolute z-[100] pointer-events-none drop-shadow-xl"
        animate={{
          left: `${cursorPos.x}%`,
          top: `${cursorPos.y}%`,
          scale: cursorPos.clicking ? 0.75 : 1,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.4 }}
      >
        <MousePointer2 className="w-5 h-5 text-white fill-white/90 drop-shadow" strokeWidth={1.5} />
        {cursorPos.clicking && (
          <motion.div
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 rounded-full border-2 border-white/60"
          />
        )}
      </motion.div>
    </div>
  );
}

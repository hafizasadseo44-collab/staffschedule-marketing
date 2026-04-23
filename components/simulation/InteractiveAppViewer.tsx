"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";

import SimulationSidebar from "./SimulationSidebar";
import SimulationHeader from "./SimulationHeader";

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

  // Pass a simulated cursor handler down to the active scene
  const updateCursor = useCallback((x: number, y: number, clicking = false) => {
    setCursorPos({ x, y, clicking });
  }, []);

  return (
    <div className="w-full h-full bg-slate-100 flex flex-col relative isolation-auto">
      {/* Fake Browser Chrome */}
      <div className="h-10 bg-slate-100 flex items-center px-4 flex-shrink-0 border-b border-slate-200 z-20">
        <div className="flex items-center gap-1.5 w-16">
          <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex-1 max-w-xl mx-auto flex items-center justify-center bg-white/80 h-6 rounded-md text-[11px] font-medium text-slate-500 shadow-sm border border-slate-200">
          <svg className="w-3 h-3 mr-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          app.staffschedule.io/{activeTab === "team" ? "team.php" : activeTab === "schedule" ? "schedule.php" : activeTab === "chat" ? "team-chat.php" : activeTab === "locations" ? "locations.php" : activeTab === "analytics" ? "analytics.php" : "dashboard.php"}
        </div>
        <div className="w-16" /> {/* Spacer */}
      </div>

      {/* Internal App Layout wrapper (No Sidebar anymore for full focus) */}
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col min-w-0 bg-[#F4F0FC] relative z-0">
          <SimulationHeader locationName={activeTab === "locations" ? "Downtown Store" : "Main Branch"} />

          <main className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              {activeTab === "dashboard" && <SimulationDashboard key="dashboard" isActive={isActive} updateCursor={updateCursor} />}
              {activeTab === "team" && <SimulationTeam key="team" isActive={isActive} updateCursor={updateCursor} />}
              {activeTab === "schedule" && <SimulationSchedule key="schedule" isActive={isActive} updateCursor={updateCursor} />}
              {activeTab === "chat" && <SimulationTeamChat key="chat" isActive={isActive} updateCursor={updateCursor} />}
              {activeTab === "locations" && <SimulationLocations key="locations" isActive={isActive} updateCursor={updateCursor} />}
              {activeTab === "analytics" && <SimulationAnalytics key="analytics" isActive={isActive} updateCursor={updateCursor} />}
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
            className="absolute inset-0 rounded-full border-2 border-[#4F46E5]"
          />
        )}
      </motion.div>

    </div>
  );
}

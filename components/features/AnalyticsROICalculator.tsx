"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Wallet } from "lucide-react";

export default function AnalyticsROICalculator() {
  const [teamSize, setTeamSize] = useState(25);
  const [avgWage, setAvgWage] = useState(18);

  // Simplified ROI Logic: 10% saving on labor leakage
  const monthlyPayroll = teamSize * 40 * 4 * avgWage;
  const yearlySavings = monthlyPayroll * 12 * 0.08; // 8% avg saving

  return (
    <section className="py-24 bg-brand-dark overflow-hidden relative border-t border-slate-800">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
              >
                <Calculator className="w-3.5 h-3.5" /> ROI Simulator
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              >
                 See how much you're <br/>
                 <span className="text-brand-primary">leaving on the table.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-slate-400 font-medium mb-10"
              >
                 Adjust the sliders below based on your current operations to see an estimate of the yearly profit you can recover by switching to StaffSchedule.io.
              </motion.p>

              <div className="space-y-10 max-w-md">
                 {/* Team Size Slider */}
                 <div className="space-y-6">
                    <div className="flex justify-between items-end text-white font-bold">
                       <span className="text-lg">Total Employees</span>
                       <span className="text-brand-primary text-3xl font-black">{teamSize}</span>
                    </div>
                    <input 
                       type="range" min="5" max="250" step="5" value={teamSize} 
                       onChange={(e) => setTeamSize(parseInt(e.target.value))}
                       className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-primary lg:h-2"
                    />
                 </div>

                 {/* Avg Wage Slider */}
                 <div className="space-y-6">
                    <div className="flex justify-between items-end text-white font-bold">
                       <span className="text-lg">Avg. Hourly Wage</span>
                       <span className="text-brand-primary text-3xl font-black">${avgWage}/hr</span>
                    </div>
                    <input 
                       type="range" min="10" max="50" step="1" value={avgWage} 
                       onChange={(e) => setAvgWage(parseInt(e.target.value))}
                       className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-primary lg:h-2"
                    />
                 </div>
              </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden"
             >
                <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
                
                <div className="text-center mb-10">
                   <div className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Estimated Annual Savings</div>
                   <motion.div 
                      key={yearlySavings}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-6xl lg:text-7xl font-black text-white tracking-tighter"
                   >
                      ${Math.round(yearlySavings).toLocaleString()}
                   </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-2 uppercase">
                         <TrendingUp className="w-3.5 h-3.5" /> Monthly Profit Gain
                      </div>
                      <div className="text-2xl font-black text-white">${Math.round(yearlySavings/12).toLocaleString()}</div>
                   </div>
                   <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-2 uppercase">
                         <Wallet className="w-3.5 h-3.5" /> Software Cost
                      </div>
                      <div className="text-2xl font-black text-white">RECOUPED</div>
                   </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                   <p className="text-slate-500 text-sm font-medium mb-6 italic">"This calculator is based on conservative industry averages. Actual savings often exceed these estimates."</p>
                   <button className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-black rounded-2xl transition-all hover:scale-[1.02] shadow-xl shadow-brand-primary/30">
                      Stop Your Losses Now
                   </button>
                </div>
             </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

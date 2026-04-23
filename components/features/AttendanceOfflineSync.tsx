"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import { WifiOff, CloudSnow, HardDriveDownload, CheckCircle2, Cloud } from "lucide-react";

export default function AttendanceOfflineSync() {
  const [offline, setOffline] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setOffline(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 text-center lg:text-left">
          
          <div className="flex-1 max-w-xl mx-auto lg:mx-0">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center lg:justify-start gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest mb-6"
              >
                <CloudSnow className="w-4 h-4" /> Unbreakable Tracking
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
              >
                 Offline Mode. <br className="hidden lg:block"/>
                 <span className="text-brand-primary">Never drop a punch.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-8"
              >
                 Working in a concrete basement or a remote construction site with zero cell service? Not a problem. StaffSchedule.io caches clock-ins locally and automatically syncs them to the cloud the millisecond connectivity is restored.
              </motion.p>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-video bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-border shadow-2xl overflow-hidden flex items-center justify-center pointer-events-none p-6">
             
             {/* Local Device Container */}
             <div className="relative w-full max-w-sm bg-white dark:bg-brand-dark rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center">
                
                {/* Network Status Header */}
                <div className="w-full flex justify-between items-center mb-10 pb-4 border-b border-border">
                   <div className="text-slate-400 font-bold text-sm">Network Status</div>
                   <div className={`px-3 py-1 rounded-full text-xs font-black transition-colors duration-500 flex items-center gap-1.5 ${offline ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-500' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500'}`}>
                      {offline ? <><WifiOff className="w-3.5 h-3.5"/> OFFLINE</> : <><Cloud className="w-3.5 h-3.5"/> CONNECTED</>}
                   </div>
                </div>

                {/* Animated Punch Logic */}
                <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                   <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-[4px] border-dashed rounded-full"
                      style={{ borderColor: offline ? 'rgba(244,63,94,0.3)' : 'rgba(16,185,129,0.3)' }}
                   />
                   
                   {/* Center State Icon */}
                   <motion.div
                      initial={false}
                      animate={{ scale: offline ? 1 : 0, opacity: offline ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute w-20 h-20 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center"
                   >
                      <HardDriveDownload className="w-8 h-8 text-rose-500" />
                   </motion.div>
                   
                   <motion.div
                      initial={false}
                      animate={{ scale: !offline ? 1 : 0, opacity: !offline ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: offline ? 0 : 0.5 }}
                      className="absolute w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center"
                   >
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                   </motion.div>

                   {/* Flying dots when connected (Syncing illusion) */}
                   {!offline && [...Array(3)].map((_, i) => (
                      <motion.div
                         key={i}
                         initial={{ y: 0, opacity: 1, scale: 1 }}
                         animate={{ y: -80, opacity: 0, scale: 0.5 }}
                         transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                         className="absolute w-2 h-2 bg-emerald-400 rounded-full"
                      />
                   ))}
                </div>

                <div className="text-center h-12">
                   <motion.div
                      initial={false}
                      animate={{ opacity: offline ? 1 : 0, y: offline ? 0 : 10 }}
                      className="absolute left-0 right-0"
                   >
                      <div className="text-brand-dark dark:text-white font-bold text-lg">Punch Saved Locally</div>
                      <div className="text-slate-500 text-sm font-medium mt-1">Waiting for connection...</div>
                   </motion.div>
                   
                   <motion.div
                      initial={false}
                      animate={{ opacity: !offline ? 1 : 0, y: !offline ? 0 : -10 }}
                      className="absolute left-0 right-0 pointer-events-none"
                   >
                      <div className="text-emerald-500 dark:text-emerald-400 font-bold text-lg">Synced to Server</div>
                      <div className="text-slate-500 text-sm font-medium mt-1">Data safely backed up.</div>
                   </motion.div>
                </div>

             </div>

          </div>

        </div>
      </div>
    </section>
  );
}

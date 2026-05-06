"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulse: Record<number, boolean> = {};
        relatedItems.forEach((relId) => { newPulse[relId] = true; });
        setPulseEffect(newPulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 220; 
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    // Make the opacity floor much higher so the back nodes don't vanish completely
    const opacity = Math.max(0.6, Math.min(1, 0.6 + 0.4 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const item = timelineData.find((i) => i.id === itemId);
    return item ? item.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  return (
    <div
      className="w-full h-[600px] md:h-[700px] flex flex-col items-center justify-center overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px", transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)` }}
        >
          {/* Central Nucleus with Enhanced Vibrancy */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#6C5CE7] via-[#8E7CFF] to-[#A395FF] animate-pulse flex items-center justify-center z-10 shadow-[0_0_60px_rgba(108,92,231,0.6)]">
            <div className="absolute w-24 h-24 rounded-full border-2 border-[#6C5CE7]/40 animate-ping opacity-80" />
            <div className="absolute w-32 h-32 rounded-full border border-[#8E7CFF]/30 animate-ping opacity-60" style={{ animationDelay: "0.5s" }} />
            <div className="absolute w-40 h-40 rounded-full border border-[#8E7CFF]/10 animate-ping opacity-40" style={{ animationDelay: "1s" }} />
            <div className="w-10 h-10 rounded-full bg-white shadow-inner flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#6C5CE7] to-[#8E7CFF] shadow-sm" />
            </div>
          </div>

          {/* Orbit Rings - More pronounced */}
          <div className="absolute w-[440px] h-[440px] rounded-full border-[1.5px] border-[#6C5CE7]/20 border-dashed" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-[#6C5CE7]/10" />

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer group"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Energy Glow */}
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: `radial-gradient(circle, rgba(108,92,231,0.2) 0%, rgba(108,92,231,0) 70%)`,
                    width: `${item.energy * 0.6 + 40}px`,
                    height: `${item.energy * 0.6 + 40}px`,
                    left: `-${(item.energy * 0.6 + 40 - 48) / 2}px`,
                    top: `-${(item.energy * 0.6 + 40 - 48) / 2}px`,
                  }}
                />

                {/* Node Circle - Increased visual weight for inactive states */}
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 transform shadow-md
                  ${isExpanded
                    ? "bg-gradient-to-br from-[#6C5CE7] to-[#8E7CFF] text-white border-white shadow-2xl shadow-[#6C5CE7]/50 scale-150"
                    : isRelated
                    ? "bg-[#F3F0FF] text-[#6C5CE7] border-[#8E7CFF] shadow-[#6C5CE7]/20 animate-pulse scale-110"
                    : "bg-white text-[#6C5CE7] border-[#6C5CE7]/30 group-hover:border-[#6C5CE7] group-hover:text-white group-hover:bg-[#6C5CE7] group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#6C5CE7]/30"
                  }
                `}>
                  <Icon size={18} className="transition-colors duration-300" />
                </div>

                {/* Label - Darker, more legible */}
                <div className={`
                  absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-black tracking-[0.1em] uppercase transition-all duration-300 drop-shadow-sm
                  ${isExpanded ? "text-slate-900 scale-110" : "text-[#5546C7] group-hover:text-[#6C5CE7]"}
                `}>
                  {item.title}
                </div>

                {/* Expanded Card (SaaS Premium Light Theme) */}
                {isExpanded && (
                  <div className="absolute top-24 left-1/2 -translate-x-1/2 w-72 bg-white/95 backdrop-blur-2xl border-2 border-[#6C5CE7]/10 rounded-2xl shadow-[0_30px_80px_-15px_rgba(108,92,231,0.15)] overflow-visible p-6">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-[#6C5CE7] to-transparent" />
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border ${
                        item.status === "completed" ? "text-emerald-600 border-emerald-200 bg-emerald-50" :
                        item.status === "in-progress" ? "text-[#6C5CE7] border-[#6C5CE7]/30 bg-[#6C5CE7]/10" :
                        "text-slate-500 border-slate-200 bg-slate-50"
                      }`}>
                        {item.status === "completed" ? "ACTIVE" : item.status === "in-progress" ? "POPULAR" : "COMING SOON"}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{item.date}</span>
                    </div>
                    
                    <h4 className="text-lg font-black text-slate-900 mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-5">{item.content}</p>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="flex items-center text-slate-600 font-bold">
                          <Zap size={14} className="mr-1.5 text-[#6C5CE7]" fill="currentColor" /> Adoption Energy
                        </span>
                        <span className="font-black text-[#6C5CE7] bg-[#6C5CE7]/10 px-2 py-0.5 rounded-md">{item.energy}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] rounded-full relative">
                          <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {item.relatedIds.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-slate-100">
                        <div className="flex items-center mb-3">
                          <LinkIcon size={12} className="text-[#8E7CFF] mr-1.5" />
                          <span className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-500">Related Features</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.relatedIds.map((relatedId) => {
                            const related = timelineData.find((i) => i.id === relatedId);
                            return (
                              <button
                                key={relatedId}
                                className="flex items-center h-7 px-3 text-[10px] font-bold rounded-lg border border-[#6C5CE7]/20 bg-[#6C5CE7]/5 hover:bg-[#6C5CE7] hover:border-[#6C5CE7] text-[#6C5CE7] hover:text-white shadow-sm transition-all duration-300"
                                onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                              >
                                {related?.title}
                                <ArrowRight size={10} className="ml-1.5 opacity-70" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

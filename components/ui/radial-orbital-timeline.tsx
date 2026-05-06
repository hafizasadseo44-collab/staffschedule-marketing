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
    const radius = 220; // Slightly larger for cleaner look
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
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
          {/* Central Nucleus */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#8E7CFF] animate-pulse flex items-center justify-center z-10 shadow-[0_0_40px_rgba(108,92,231,0.4)]">
            <div className="absolute w-20 h-20 rounded-full border border-[#6C5CE7]/30 animate-ping opacity-70" />
            <div className="absolute w-24 h-24 rounded-full border border-[#8E7CFF]/20 animate-ping opacity-50" style={{ animationDelay: "0.5s" }} />
            <div className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md shadow-sm" />
          </div>

          {/* Orbit Ring */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-slate-200/60 border-dashed" />
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
                className="absolute transition-all duration-700 cursor-pointer"
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
                    background: `radial-gradient(circle, rgba(108,92,231,0.15) 0%, rgba(108,92,231,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                {/* Node Circle */}
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform shadow-sm
                  ${isExpanded
                    ? "bg-[#6C5CE7] text-white border-[#8E7CFF] shadow-lg shadow-[#6C5CE7]/30 scale-150"
                    : isRelated
                    ? "bg-purple-50 text-[#6C5CE7] border-[#8E7CFF] animate-pulse"
                    : "bg-white text-slate-500 border-slate-200 hover:border-[#6C5CE7]/50 hover:text-[#6C5CE7]"
                  }
                `}>
                  <Icon size={16} />
                </div>

                {/* Label */}
                <div className={`
                  absolute top-12 whitespace-nowrap text-[11px] font-bold tracking-widest uppercase transition-all duration-300
                  ${isExpanded ? "text-slate-900 scale-110" : "text-slate-400"}
                `}>
                  {item.title}
                </div>

                {/* Expanded Card (SaaS Light Theme) */}
                {isExpanded && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-visible p-5">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-slate-200" />
                    <div className="flex justify-between items-center mb-3">
                      <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border ${
                        item.status === "completed" ? "text-emerald-600 border-emerald-100 bg-emerald-50" :
                        item.status === "in-progress" ? "text-[#6C5CE7] border-[#6C5CE7]/20 bg-[#6C5CE7]/10" :
                        "text-slate-500 border-slate-200 bg-slate-50"
                      }`}>
                        {item.status === "completed" ? "ACTIVE" : item.status === "in-progress" ? "POPULAR" : "COMING SOON"}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
                    </div>
                    <h4 className="text-base font-black text-slate-900 mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">{item.content}</p>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="flex items-center text-slate-500 font-bold">
                          <Zap size={12} className="mr-1 text-[#6C5CE7]" /> Adoption
                        </span>
                        <span className="font-bold text-[#6C5CE7]">{item.energy}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] rounded-full" style={{ width: `${item.energy}%` }} />
                      </div>
                    </div>

                    {item.relatedIds.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center mb-3">
                          <LinkIcon size={12} className="text-slate-400 mr-1.5" />
                          <span className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400">Related Features</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.relatedIds.map((relatedId) => {
                            const related = timelineData.find((i) => i.id === relatedId);
                            return (
                              <button
                                key={relatedId}
                                className="flex items-center h-7 px-2.5 text-[10px] font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-[#6C5CE7]/5 hover:border-[#6C5CE7]/30 text-slate-600 hover:text-[#6C5CE7] transition-all"
                                onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                              >
                                {related?.title}
                                <ArrowRight size={10} className="ml-1.5 opacity-50" />
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

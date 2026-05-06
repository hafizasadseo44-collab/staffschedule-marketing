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
    const radius = 200;
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
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-indigo-400/30 animate-ping opacity-70" />
            <div className="absolute w-24 h-24 rounded-full border border-indigo-400/15 animate-ping opacity-50" style={{ animationDelay: "0.5s" }} />
            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md" />
          </div>

          {/* Orbit Ring */}
          <div className="absolute w-96 h-96 rounded-full border border-slate-700/30" />

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
                    background: `radial-gradient(circle, rgba(79,70,229,0.25) 0%, rgba(79,70,229,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                {/* Node Circle */}
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform
                  ${isExpanded
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/30 scale-150"
                    : isRelated
                    ? "bg-indigo-500/50 text-white border-indigo-400 animate-pulse"
                    : "bg-slate-900 text-white border-slate-600/50"
                  }
                `}>
                  <Icon size={16} />
                </div>

                {/* Label */}
                <div className={`
                  absolute top-12 whitespace-nowrap text-xs font-bold tracking-wider transition-all duration-300
                  ${isExpanded ? "text-white scale-110" : "text-slate-400"}
                `}>
                  {item.title}
                </div>

                {/* Expanded Card */}
                {isExpanded && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl shadow-indigo-500/10 overflow-visible p-4">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-indigo-500/50" />
                    <div className="flex justify-between items-center mb-2">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                        item.status === "completed" ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" :
                        item.status === "in-progress" ? "text-amber-400 border-amber-500/30 bg-amber-500/10" :
                        "text-slate-400 border-slate-600/30 bg-slate-600/10"
                      }`}>
                        {item.status === "completed" ? "ACTIVE" : item.status === "in-progress" ? "POPULAR" : "COMING SOON"}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                    </div>
                    <h4 className="text-sm font-black text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">{item.content}</p>

                    <div className="pt-3 border-t border-slate-700/50">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="flex items-center text-slate-400">
                          <Zap size={10} className="mr-1 text-indigo-400" /> Adoption
                        </span>
                        <span className="font-mono text-indigo-400">{item.energy}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: `${item.energy}%` }} />
                      </div>
                    </div>

                    {item.relatedIds.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-700/50">
                        <div className="flex items-center mb-2">
                          <LinkIcon size={10} className="text-slate-500 mr-1" />
                          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Related Features</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.map((relatedId) => {
                            const related = timelineData.find((i) => i.id === relatedId);
                            return (
                              <button
                                key={relatedId}
                                className="flex items-center h-6 px-2 text-[10px] font-bold rounded border border-slate-700/50 bg-transparent hover:bg-indigo-500/10 text-slate-400 hover:text-indigo-400 transition-all"
                                onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                              >
                                {related?.title}
                                <ArrowRight size={8} className="ml-1" />
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

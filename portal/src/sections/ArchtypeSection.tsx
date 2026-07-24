import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  Zap, 
  ShieldAlert, 
  Activity, 
  Layers, 
  GitBranch, 
  Cpu,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { springSoft, staggerContainer, staggerItem } from "@/lib/motion";

type EvolutionPhase = "LEGACY" | "STANDARD" | "KRINTIX_ARE";

interface Metric {
  label: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "neutral";
}

const PHASES: Record<EvolutionPhase, {
  title: string;
  executiveTitle: string;
  description: string;
  businessOutcome: string;
  metrics: Record<string, Metric>;
  accentColor: string;
  visualNodes: { label: string; x: number; y: number }[];
}> = {
  LEGACY: {
    title: "Fractal Decay",
    executiveTitle: "Operational Drag",
    description: "Fragmented systems characterized by high technical debt and manual intervention loops.",
    businessOutcome: "Your team is 'Running to stand still'. 60% of resources are lost to maintenance rather than growth.",
    accentColor: "#ef4444", // Red-500
    visualNodes: [
      { label: "Siloed DB", x: 100, y: 100 },
      { label: "Manual Script", x: 250, y: 80 },
      { label: "Legacy API", x: 120, y: 280 },
      { label: "Broken Link", x: 300, y: 250 },
      { label: "Vulnerability", x: 180, y: 180 },
    ],
    metrics: {
      velocity: { label: "Velocity", value: 12, unit: "pts", trend: "down" },
      debt: { label: "Technical Debt", value: 84, unit: "%", trend: "up" },
      waste: { label: "Engineering Waste", value: 65, unit: "%", trend: "up" },
      scalability: { label: "Scalability", value: 0.2, unit: "x", trend: "neutral" },
    }
  },
  STANDARD: {
    title: "Unified Core",
    executiveTitle: "Functional Stability",
    description: "Standard modern architecture with hub-and-spoke connectivity—stable but resource intensive.",
    businessOutcome: "Predictable but slow. Scaling requires linear hiring and increasing infrastructure costs.",
    accentColor: "#3b82f6", // Blue-500
    visualNodes: [
      { label: "Main DB", x: 200, y: 200 },
      { label: "Cloud API", x: 200, y: 80 },
      { label: "Frontend", x: 80, y: 200 },
      { label: "Auth Service", x: 320, y: 200 },
      { label: "Cache", x: 200, y: 320 },
    ],
    metrics: {
      velocity: { label: "Velocity", value: 45, unit: "pts", trend: "up" },
      debt: { label: "Technical Debt", value: 30, unit: "%", trend: "down" },
      waste: { label: "Engineering Waste", value: 25, unit: "%", trend: "down" },
      scalability: { label: "Scalability", value: 4.5, unit: "x", trend: "up" },
    }
  },
  KRINTIX_ARE: {
    title: "Autonomous Engine",
    executiveTitle: "Institutional Velocity",
    description: "Full-spectrum orchestration. Absolute clarity through automated workflows and precision engineering.",
    businessOutcome: "Total market responsiveness. Zero engineering waste enables infinite scaling without proportional cost.",
    accentColor: "#f97316", // Brand Orange
    visualNodes: [
      { label: "The ARE Core", x: 200, y: 200 },
      { label: "Signal Node", x: 300, y: 100 },
      { label: "Action Node", x: 100, y: 300 },
    ],
    metrics: {
      velocity: { label: "Velocity", value: 98, unit: "pts", trend: "up" },
      debt: { label: "Technical Debt", value: 4, unit: "%", trend: "down" },
      waste: { label: "Engineering Waste", value: 2, unit: "%", trend: "down" },
      scalability: { label: "Scalability", value: 100, unit: "x", trend: "up" },
    }
  }
};

function ParticleFlow({ x1, y1, x2, y2, color, speed = 2, delay = 0 }: { x1: number; y1: number; x2: number; y2: number; color: string; speed?: number; delay?: number }) {
  return (
    <motion.circle
      r="1.5"
      fill={color}
      initial={{ offsetDistance: "0%", opacity: 0 }}
      animate={{ 
        offsetDistance: ["0%", "100%"],
        opacity: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: speed, 
        repeat: Infinity, 
        ease: "linear",
        delay: delay
      }}
      style={{
        offsetPath: `path('M ${x1} ${y1} L ${x2} ${y2}')`,
        filter: "blur(0.5px)"
      }}
    />
  );
}

function EngineVisual({ phase }: { phase: EvolutionPhase }) {
  const current = PHASES[phase];
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);
  
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center group/visual">
      {/* Dynamic Background Glow */}
      <AnimatePresence mode="wait">
        <motion.div
           key={phase}
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 1.1 }}
           transition={springSoft}
           className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 rounded-full border border-current opacity-10 blur-md transition-colors duration-700"
            style={{ color: current.accentColor }}
          />
          <motion.div 
            animate={{ rotate: phase === "LEGACY" ? [0, 5, -5, 0] : 360 }}
            transition={{ 
              duration: phase === "KRINTIX_ARE" ? 15 : 40, 
              repeat: Infinity, 
              ease: phase === "LEGACY" ? "easeInOut" : "linear" 
            }}
            className="absolute inset-8 rounded-full border border-dashed border-current opacity-10"
            style={{ color: current.accentColor }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full h-full">
         <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible pointer-events-none">
            <defs>
               <filter id="engine-glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
               <radialGradient id="monolith-grad">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
               </radialGradient>
            </defs>

            {/* In Krintix ARE mode, show 'The Singularity' */}
            {phase === "KRINTIX_ARE" && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Orbital Rings */}
                {[1, 1.3, 1.6].map((scale, i) => (
                  <motion.circle
                    key={i}
                    cx="200" cy="200" r={60 * scale}
                    className="fill-none stroke-brand-orange/20 stroke-[0.5]"
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                  />
                ))}
                
                {/* Hyper-speed Particles */}
                {current.visualNodes.map((node, i) => (
                  <React.Fragment key={i}>
                    <motion.line 
                      x1="200" y1="200" x2={node.x} y2={node.y}
                      className="stroke-brand-orange/40 stroke-[1]"
                      strokeDasharray="4 4"
                      animate={{ strokeDashoffset: [0, -20] }}
                      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                    />
                    <ParticleFlow x1={200} y1={200} x2={node.x} y2={node.y} color="#f97316" speed={0.8} delay={i * 0.2} />
                    <ParticleFlow x1={node.x} y1={node.y} x2={200} y2={200} color="#f97316" speed={1.2} delay={i * 0.3} />
                  </React.Fragment>
                ))}

                <circle cx="200" cy="200" r="40" className="fill-brand-orange/10 stroke-brand-orange stroke-[1.5]" filter="url(#engine-glow)" />
                <motion.circle 
                  cx="200" cy="200" r="30" 
                  className="fill-none stroke-brand-orange/60 stroke-[2] stroke-dasharray-[5,10]"
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.g>
            )}

            {/* In Standard mode, show 'The Hub' */}
            {phase === "STANDARD" && (
               <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <rect x="160" y="160" width="80" height="80" rx="12" className="fill-brand-blue/10 stroke-brand-blue/40 stroke-2" />
                  <motion.rect 
                    x="170" y="170" width="60" height="60" rx="8" 
                    className="fill-brand-blue/20 stroke-brand-blue stroke-1"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {current.visualNodes.map((node, i) => (
                    <React.Fragment key={i}>
                      <line x1="200" y1="200" x2={node.x} y2={node.y} className="stroke-brand-blue/20 stroke-1" />
                      <ParticleFlow x1={200} y1={200} x2={node.x} y2={node.y} color="#3b82f6" speed={2.5} delay={i * 0.5} />
                    </React.Fragment>
                  ))}
               </motion.g>
            )}

            {/* In Legacy mode, show 'Glitch Shards' */}
            {phase === "LEGACY" && (
               <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {current.visualNodes.map((node, i) => {
                    const nextNode = current.visualNodes[(i + 1) % current.visualNodes.length];
                    return (
                      <motion.line 
                        key={i}
                        x1={node.x} y1={node.y} x2={nextNode.x} y2={nextNode.y} 
                        className="stroke-red-500/40 stroke-[1]" 
                        animate={{ 
                          x: [0, (Math.random() - 0.5) * 2, 0],
                          opacity: [0.4, 0.2, 0.8, 0.4]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                      />
                    );
                  })}
                  {/* Random Noise Particles */}
                  {[...Array(10)].map((_, i) => (
                    <motion.circle
                      key={i}
                      r="1"
                      fill="#ef4444"
                      initial={{ cx: Math.random() * 400, cy: Math.random() * 400 }}
                      animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: Math.random() }}
                    />
                  ))}
               </motion.g>
            )}
         </svg>

         {/* Interactive Nodes Overlay */}
         <div className="absolute inset-0">
            {current.visualNodes.map((node, i) => (
              <motion.div
                key={`${phase}-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                style={{ left: `${(node.x / 400) * 100}%`, top: `${(node.y / 400) * 100}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-50 pointer-events-auto group/node"
                onMouseEnter={() => setHoveredNode(node.label)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="relative">
                  <motion.div 
                    className="w-5 h-5 rounded-full border-2 transition-transform duration-300 group-hover/node:scale-150 shadow-lg"
                    style={{ borderColor: current.accentColor, backgroundColor: `${current.accentColor}30` }}
                    animate={phase === "LEGACY" ? { x: [-1, 1, -1], opacity: [0.8, 1, 0.8] } : {}}
                    transition={{ duration: 0.1, repeat: Infinity }}
                  />
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredNode === node.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: -35, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap glass-artifact px-4 py-2 rounded-xl border border-white/10 shadow-2xl z-[100]"
                      >
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: current.accentColor }} />
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground">
                                {node.label}
                            </span>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}

export function SystemArchetypeHUD() {
  const [phase, setPhase] = React.useState<EvolutionPhase>("KRINTIX_ARE");
  const current = PHASES[phase];

  return (
    <section className="py-24 lg:py-48 relative overflow-hidden bg-background">
      {/* Background Dynamic Glow FX */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={phase}
          layoutId="bg-glow"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-[0.08] pointer-events-none blur-3xl rounded-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.08, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ backgroundColor: current.accentColor }}
        />
      </AnimatePresence>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="flex-1 w-full space-y-12">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem}>
                <div className="flex items-center gap-4 mb-8">
                  <Badge variant={phase === "KRINTIX_ARE" ? "brand" : phase === "STANDARD" ? "blue" : "outline"} className="px-4 py-1">
                    ENGINE: {current.title}
                  </Badge>
                  <div className="h-px flex-1 bg-border-ghost opacity-20" />
                  <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.4em]">
                     {current.executiveTitle}
                  </span>
                </div>
              </motion.div>
              
              <motion.h2 
                variants={staggerItem}
                className="text-6xl md:text-8xl font-title font-bold tracking-tighter mb-10 leading-[0.85]"
              >
                Engineering <br />
                <span style={{ color: current.accentColor }} className="transition-colors duration-700">Absolute Clarity.</span>
              </motion.h2>
              
              <motion.div 
                variants={staggerItem}
                className="glass-artifact p-10 border-l-[6px] rounded-r-3xl relative overflow-hidden group/insight"
                style={{ borderLeftColor: current.accentColor }}
              >
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/insight:opacity-20 transition-opacity">
                    <Activity className="w-20 h-20" style={{ color: current.accentColor }} />
                 </div>
                 <p className="text-[11px] font-mono font-bold text-text-muted uppercase tracking-[0.3em] mb-6">Commercial Translation</p>
                 <p className="text-2xl font-semibold leading-tight tracking-tight text-foreground max-w-lg">
                    "{current.businessOutcome}"
                 </p>
              </motion.div>
            </motion.div>

            {/* Premium Phase Control */}
            <div className="space-y-6">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted block border-b border-border-ghost pb-2 w-fit">Evolutionary Control Panel</p>
              <div className="flex flex-wrap gap-4">
                {(Object.keys(PHASES) as EvolutionPhase[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPhase(p)}
                    className={cn(
                      "relative h-14 px-8 rounded-2xl text-[11px] font-mono font-bold uppercase tracking-widest transition-all overflow-hidden group/btn",
                      phase === p 
                        ? "text-background" 
                        : "text-text-muted hover:text-foreground"
                    )}
                  >
                    <div 
                      className={cn(
                        "absolute inset-0 transition-all duration-500",
                        phase === p ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      )}
                      style={{ backgroundColor: PHASES[p].accentColor }}
                    />
                    <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <span className="relative z-10">{p.replace("_", " ")}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(current.metrics).map(([key, metric]) => (
                <div key={key} className="relative group">
                  <p className="text-[9px] font-mono font-bold tracking-[0.2em] text-text-muted uppercase mb-2">{metric.label}</p>
                  <div className="flex items-baseline gap-1">
                    <motion.span 
                      key={`${phase}-${key}`}
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-3xl font-mono font-bold tracking-tighter"
                    >
                      {metric.value}
                    </motion.span>
                    <span className="text-[11px] font-mono font-bold text-text-muted uppercase opacity-50">{metric.unit}</span>
                  </div>
                  <div className="mt-2 h-1 w-full bg-border-ghost/30 rounded-full overflow-hidden">
                     <motion.div 
                        className="h-full rounded-full"
                        style={{ backgroundColor: current.accentColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${key === "scalability" ? (metric.value / 100) * 100 : metric.value}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                     />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full lg:max-w-xl lg:pl-16">
            <div className="relative">
              <Card variant="high" className="w-full aspect-square flex items-center justify-center p-0 overflow-visible border-border-ghost/40 shadow-2xl" hoverEffect={false}>
                 <EngineVisual phase={phase} />
                 
                 {/* Precision Artifacts */}
                 <motion.div 
                   animate={{ y: [0, -12, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -top-8 -right-8 glass-artifact px-8 py-4 rounded-[2rem] border border-white/10 shadow-massive z-50 pointer-events-none"
                 >
                   <div className="relative flex items-center gap-4">
                      <div className="flex gap-1">
                         <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: current.accentColor }} />
                         <div className="w-1.5 h-1.5 rounded-full animate-pulse delay-75" style={{ backgroundColor: current.accentColor }} />
                         <div className="w-1.5 h-1.5 rounded-full animate-pulse delay-150" style={{ backgroundColor: current.accentColor }} />
                      </div>
                      <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase">Tactical Engine Live</span>
                   </div>
                 </motion.div>

                 {/* Navigation Aid */}
                 <div className="absolute -bottom-10 -left-10 max-w-sm glass-artifact p-6 rounded-2xl text-[10px] font-mono leading-relaxed text-text-muted border border-white/10 shadow-xl backdrop-blur-xl">
                    <div className="flex items-start gap-4">
                       <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center shrink-0">
                          <Layers className="w-4 h-4 text-foreground/40" />
                       </div>
                       <p>
                          <span className="text-foreground font-bold uppercase tracking-widest mr-2 underline decoration-current">Interactivity Active:</span> 
                          Engage with system architecture nodes to dissect component health and operational viability.
                       </p>
                    </div>
                 </div>
              </Card>
              
              {/* Floating Mesh Background Elements */}
              <div className="absolute -z-10 -bottom-20 -right-20 w-64 h-64 bg-current opacity-5 blur-[100px] transition-colors duration-700 rounded-full" style={{ color: current.accentColor }} />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

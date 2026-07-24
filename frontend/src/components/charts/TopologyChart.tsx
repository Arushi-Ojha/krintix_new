import { motion } from "framer-motion";
import { Server, Database, Cloud, Shield, Cpu, Globe } from "lucide-react";

const nodes = [
  { id: "global", icon: Globe, label: "Global CDN", x: "50%", y: "15%", color: "text-[#E5BA41]" },
  { id: "lb", icon: Cloud, label: "Load Balancer", x: "50%", y: "40%", color: "text-white" },
  { id: "app1", icon: Cpu, label: "API Cluster A", x: "30%", y: "65%", color: "text-[#E5BA41]" },
  { id: "app2", icon: Cpu, label: "API Cluster B", x: "70%", y: "65%", color: "text-white" },
  { id: "db1", icon: Database, label: "Primary DB", x: "30%", y: "90%", color: "text-white" },
  { id: "db2", icon: Database, label: "Replica DB", x: "70%", y: "90%", color: "text-[#E5BA41]" },
  { id: "sec", icon: Shield, label: "WAF & Security", x: "85%", y: "25%", color: "text-[#E5BA41]" },
];

const connections = [
  { from: "global", to: "lb" },
  { from: "lb", to: "app1" },
  { from: "lb", to: "app2" },
  { from: "app1", to: "db1" },
  { from: "app2", to: "db2" },
  { from: "db1", to: "db2" },
  { from: "global", to: "sec" },
  { from: "sec", to: "lb" },
];

export function TopologyChart() {
  return (
    <div className="w-full h-full min-h-[400px] p-6 rounded-3xl bg-[#0d1754]/80 border border-white/20 backdrop-blur-3xl shadow-[8px_8px_32px_rgba(0,0,0,0.5),inset_2px_2px_10px_rgba(255,255,255,0.1)] flex flex-col items-center relative overflow-hidden">
      <h3 className="text-xl font-bold text-white mb-2 z-10 text-center w-full">Enterprise Cloud Topology</h3>
      <p className="text-sm text-[#E5BA41] mb-8 font-mono tracking-wider z-10 text-center w-full">99.999% UPTIME ARCHITECTURE</p>
      
      <div className="flex-1 w-full relative mt-4">
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E5BA41" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            return (
              <motion.line
                key={i}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10"
            style={{ left: node.x, top: node.y }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, type: "spring", bounce: 0.5 }}
          >
            <div className={`w-14 h-14 rounded-xl bg-black border border-white/20 shadow-[0_0_15px_rgba(229,186,65,0.3)] flex items-center justify-center backdrop-blur-xl`}>
              <node.icon className={`w-7 h-7 ${node.color}`} />
            </div>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider mt-2 whitespace-nowrap bg-black/60 px-2 py-1 rounded-md border border-white/10">
              {node.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


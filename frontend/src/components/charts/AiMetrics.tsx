import { motion } from "framer-motion";

const metrics = [
  { label: "Automation Scaled", value: "85%", color: "text-white" },
  { label: "ROI Generated", value: "+310%", color: "text-[#E5BA41]" },
  { label: "System Uptime", value: "99.9%", color: "text-white" },
];

export function AiMetrics() {
  return (
    <div className="w-full h-full min-h-[300px] p-8 rounded-3xl bg-[#0d1754]/80 border border-white/5 backdrop-blur-xl shadow-2xl flex flex-col justify-center">
      <h3 className="text-xl font-bold text-white mb-8 text-center">AI Impact Simulation</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className={`text-4xl md:text-5xl font-title font-bold mb-2 ${metric.color}`}>
              {metric.value}
            </div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-white/80 text-center">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


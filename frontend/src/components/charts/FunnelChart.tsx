import { motion } from "framer-motion";

const data = [
  { stage: "Total Visitors", count: 2500000, color: "bg-[#0d1754]", width: "100%" },
  { stage: "Qualified Leads", count: 500000, color: "bg-[#1e3a8a]", width: "60%" },
  { stage: "Booked Calls", count: 80000, color: "bg-[#8a722e]", width: "35%" },
  { stage: "Closed Clients", count: 15000, color: "bg-[#E5BA41]", width: "15%" },
];

export function FunnelChart() {
  return (
    <div className="w-full h-full min-h-[300px] p-6 rounded-3xl bg-[#0d1754]/80 border border-white/5 backdrop-blur-xl shadow-2xl flex flex-col justify-center">
      <h3 className="text-xl font-bold text-white mb-8 text-center">Lead Funnel Simulation</h3>
      
      <div className="flex flex-col items-center gap-4 w-full">
        {data.map((item, i) => (
          <div key={item.stage} className="w-full flex flex-col items-center relative">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: item.width, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
              className={`h-12 ${item.color} rounded-lg flex items-center justify-between px-4 overflow-hidden shadow-lg border border-white/10`}
            >
              <span className="text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap opacity-80 hidden sm:block">
                {item.stage}
              </span>
              <span className="text-sm font-bold text-white ml-auto">
                {item.count.toLocaleString()}
              </span>
            </motion.div>
            <span className="text-[10px] sm:hidden text-white/80 mt-1 uppercase tracking-wider">
              {item.stage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


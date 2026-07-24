import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Jan", traffic: 50000 },
  { name: "Feb", traffic: 85000 },
  { name: "Mar", traffic: 150000 },
  { name: "Apr", traffic: 280000 },
  { name: "May", traffic: 450000 },
  { name: "Jun", traffic: 720000 },
  { name: "Jul", traffic: 1100000 },
  { name: "Aug", traffic: 1650000 },
  { name: "Sep", traffic: 2400000 },
  { name: "Oct", traffic: 3200000 },
  { name: "Nov", traffic: 4500000 },
  { name: "Dec", traffic: 6200000 },
];

export function TrafficChart() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full h-full min-h-[300px] p-6 rounded-3xl bg-[#0d1754]/80 border border-white/5 backdrop-blur-xl shadow-2xl flex flex-col"
    >
      <h3 className="text-xl font-bold text-white mb-6">Organic Traffic Growth (YTD)</h3>
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E5BA41" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#E5BA41" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#ffffff" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#ffffff" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0d1754", borderColor: "rgba(229,186,65,0.2)", borderRadius: "12px", color: "#fff" }}
              itemStyle={{ color: "#E5BA41", fontWeight: "bold", fontSize: "16px" }}
              formatter={(value: number) => [`${value.toLocaleString()} Visitors`, "Traffic"]}
            />
            <Area type="monotone" dataKey="traffic" stroke="#E5BA41" strokeWidth={4} fillOpacity={1} fill="url(#colorTraffic)" animationDuration={2500} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}


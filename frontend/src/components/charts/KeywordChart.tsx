import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Top 3 Positions", value: 65 },
  { name: "Top 10 Positions", value: 25 },
  { name: "Top 50 Positions", value: 10 },
];

const COLORS = ["#E5BA41", "#0d1754", "#60a5fa"];

export function KeywordChart() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full h-full min-h-[300px] p-6 rounded-3xl bg-[#0d1754]/80 border border-white/5 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center relative"
    >
      <h3 className="text-xl font-bold text-white mb-2 text-center">Keyword Ranking Distribution</h3>
      <p className="text-sm text-white/80 mb-4 text-center">Percentage of targeted search terms</p>
      
      <div className="w-full flex-1 min-h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: "#000", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
              itemStyle={{ color: "#fff", fontWeight: "bold" }}
              formatter={(value: number) => [`${value}%`, "Keywords"]}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-4">
          <div className="text-center">
            <span className="block text-2xl font-bold text-white">90%</span>
            <span className="block text-[10px] uppercase tracking-wider text-[#E5BA41]">Page 1</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Before CRO", rate: 1.5 },
  { name: "After CRO", rate: 8.2 },
];

export function ConversionChart() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full h-full min-h-[300px] p-6 rounded-3xl bg-[#0d1754]/80 border border-white/5 backdrop-blur-xl shadow-2xl flex flex-col"
    >
      <h3 className="text-xl font-bold text-white mb-2">Conversion Rate Impact</h3>
      <p className="text-sm text-[#E5BA41] mb-6 font-mono tracking-wider">5.4x GROWTH ACHIEVED</p>
      
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" stroke="#ffffff" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#ffffff" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.02)" }}
              contentStyle={{ backgroundColor: "#0d1754", borderColor: "rgba(229,186,65,0.2)", borderRadius: "12px", color: "#fff" }}
              itemStyle={{ color: "#E5BA41", fontWeight: "bold" }}
              formatter={(value: number) => [`${value}%`, "Conversion Rate"]}
            />
            <Bar dataKey="rate" radius={[8, 8, 0, 0]} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#1e3a8a" : "#E5BA41"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}


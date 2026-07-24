import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TrendingDown, Calculator, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

function RadialMeter({ value, max }: { value: number; max: number }) {
  const percentage = (value / max) * 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90">
        {/* Background Track */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          className="fill-none stroke-border-ghost stroke-[8]"
        />
        {/* Progress Fill */}
        <motion.circle
          cx="96"
          cy="96"
          r={radius}
          className="fill-none stroke-brand-orange stroke-[8] transition-all duration-500 ease-out"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-text-muted uppercase">Efficiency</span>
        <span className="text-4xl font-mono font-bold text-foreground tracking-tighter">
          {Math.round(percentage)}%
        </span>
      </div>
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-brand-orange/5 blur-3xl rounded-full -z-10" />
    </div>
  );
}

export function ROICalculator() {
  const [monthlySpend, setMonthlySpend] = React.useState(25000);
  
  const estimatedSavings = {
    low: monthlySpend * 0.32,
    high: monthlySpend * 0.54,
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <section className="py-32 lg:py-56 relative overflow-hidden bg-background">
      <Container className="relative z-10">
        <div className="text-center mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="brand" className="mb-8">Precision Cost Engineering</Badge>
            <h2 className="text-6xl md:text-8xl font-title font-bold mb-8 tracking-tighter leading-[0.9]">
              Financial <span className="text-brand-orange">Velocity.</span>
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-medium">
              We decompose your cloud infrastructure at the architecture level to identify deep-seated engineering waste.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Tactical Control Panel */}
          <Card variant="low" className="lg:col-span-12 p-12 border-border-ghost" hoverEffect={false}>
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-16">
                <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-mono font-bold tracking-[0.4em] text-text-muted uppercase">
                      Current Infrastructure Spend
                    </label>
                    <div className="text-5xl font-mono font-bold text-foreground tracking-tighter tabular-nums translate-y-2">
                       {formatter.format(monthlySpend)}
                    </div>
                  </div>
                  
                  {/* Tactical Slider */}
                  <div className="relative group pt-4">
                    <input
                      type="range"
                      min="5000"
                      max="200000"
                      step="5000"
                      value={monthlySpend}
                      onChange={(e) => setMonthlySpend(parseInt(e.target.value))}
                      className="w-full h-2 bg-foreground/10 dark:bg-white/[0.05] rounded-full appearance-none cursor-pointer accent-brand-orange relative z-10"
                    />
                    <div className="absolute top-[21px] left-0 h-2 bg-brand-orange/20 rounded-full w-full -z-0 pointer-events-none group-hover:bg-brand-orange/30 transition-all" />
                    <div className="flex justify-between mt-6 text-[9px] font-mono font-bold text-text-muted/40 tracking-widest">
                      <span>MIN: $5K</span>
                      <span>ENV SCALE</span>
                      <span>MAX: $200K+</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-border-ghost">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                       <ShieldCheck className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest">Risk Factor</p>
                      <p className="text-xs text-text-muted">Zero Downtime Migration</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                       <Zap className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest">Optimization Latency</p>
                      <p className="text-xs text-text-muted">Visible Impact in 14 Days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Visualization Column */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:border-l lg:border-border-ghost lg:pl-20">
                 <RadialMeter value={estimatedSavings.high} max={monthlySpend} />
                 
                 <div className="space-y-10 w-full md:flex-1">
                    <div className="glass-artifact p-8 rounded-2xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                          <TrendingDown className="w-12 h-12 text-brand-orange -rotate-12" />
                       </div>
                       <p className="text-[9px] font-mono font-bold tracking-[0.4em] text-text-muted uppercase mb-4">Projected Annual Capital Recapture</p>
                       <div className="text-5xl font-mono font-bold text-brand-orange tracking-tighter tabular-nums">
                          {formatter.format(estimatedSavings.high * 12)}
                       </div>
                    </div>
                    
                    <Button size="lg" className="w-full h-16" variant="primary">
                       Initiate Technical Deep Dive
                    </Button>
                 </div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

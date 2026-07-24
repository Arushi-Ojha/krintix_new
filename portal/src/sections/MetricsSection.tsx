import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { springSoft, springSnappy } from "@/lib/motion";
import * as React from "react";

function CountUp({ end, suffix }: { end: number; suffix?: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [value, setValue] = React.useState(0);
  const started = React.useRef(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const from = 0;
            const to = end;
            const duration = 900; // ms
            const start = performance.now();

            const step = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(from + (to - from) * eased);
              setValue(current);
              if (progress < 1) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref}>
      {value}
      {suffix}
    </div>
  );
}

const stats = [
  { label: "Venture Success Portfolio", value: "20", suffix: "+" },
  { label: "Institutional Engineering Core", value: "7", suffix: "+" },
  { label: "Ecosystem Platform Reach", value: "6", suffix: "+" },
];

export function Metrics() {
  return (
    <section className="py-32 bg-background relative border-y border-border-ghost">
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-12 lg:gap-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...springSoft, delay: index * 0.09 }}
              className="group text-center"
            >
              <motion.div
                className="mb-4 font-mono text-5xl font-bold tracking-tighter text-foreground transition-colors duration-300 hover:text-brand-orange md:text-7xl"
                whileHover={{ scale: 1.05 }}
                transition={springSnappy}
              >
                <CountUp end={parseInt(stat.value || "0", 10)} suffix={stat.suffix} />
              </motion.div>
              <div className="text-[10px] text-text-muted uppercase tracking-[0.4em] font-mono font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

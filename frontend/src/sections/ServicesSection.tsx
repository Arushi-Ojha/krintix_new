import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { springSoft } from "@/lib/motion";

const services = [
  {
    title: "Custom AI Software Development",
    description: "Problem: Manual decision logic. Solution: We deploy predictive analytics systems and machine learning models. Result: Autonomous workflows tailored exactly to your operational requirements.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    highlight: "MVP to Scale",
    href: "/solutions/startup",
  },
  {
    title: "Scalable SaaS Platforms",
    description: "Problem: Architecture bottlenecks. Solution: We build cloud-native apps using React and modular backend structures. Result: Enterprise-grade scalability that handles infinite user volume seamlessly.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    highlight: "Sprinting to Success",
    href: "/solutions/projects",
  },
  {
    title: "Conversion Rate Optimization",
    description: "Problem: High acquisition cost, low retention. Solution: Data-driven user experience refinement. Result: A measurably higher percentage of users taking targeted action on your platform.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    highlight: "AI/ML Solutions",
    href: "/solutions/ai",
  },
  {
    title: "Business Process Automation",
    description: "Problem: Operational drag from manual tasks. Solution: Deep CRM integrations and intelligent routing via AI. Result: Near-total elimination of human error and vastly accelerated task execution.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    highlight: "Technical Partner",
    href: "/solutions/co-creation",
  },
  {
    title: "Predictive Analytics Systems",
    description: "Problem: Reactive decision-making. Solution: We structure your data lakes into cohesive intelligence matrices. Result: Real-time forecasting and absolute empirical clarity for leadership teams.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    highlight: "Resilient Cloud",
    href: "/solutions/cloud-resiliency",
  },
  {
    title: "High-Converting Landing Pages",
    description: "Problem: Traffic failing to convert. Solution: Minimalist design paired with semantic AEO optimization. Result: Trust-building interfaces that seamlessly capture high-intent enterprise users.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    highlight: "Data Synthesis",
    href: "/solutions/data-synthetics",
  },
  {
    title: "Cloud-Native Architecture",
    description: "Problem: Fragile server infrastructure. Solution: Decentralized micro-services and robust API orchestration. Result: Fault-tolerant web systems providing zero-friction data interoperability.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    highlight: "Zero Trust",
    href: "/solutions/crypto-posture",
  },
  {
    title: "Machine Learning Solutions",
    description: "Problem: Unstructured data chaos. Solution: Custom neural logic mapped directly to your business objectives. Result: Self-optimizing backend systems that improve operational efficiency over time.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    highlight: "Growth Automation",
    href: "/solutions/algorithmic-growth",
  },
  {
    title: "Workflow Automation",
    description: "Problem: Disconnected third-party tools. Solution: We unify your technical stack into a single synchronized ecosystem. Result: Flawless data communication across all previously siloed platforms.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    highlight: "CI/CD",
    href: "/solutions/automated-delivery",
  },
  {
    title: "Semantic SEO & AEO",
    description: "Problem: Invisible to generative engines. Solution: Structuring content and entities specifically for AI readability. Result: Your platform becomes the authoritative source for AI-driven queries.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    highlight: "CX Optimization",
    href: "/solutions/cognitive-interface",
  },
  {
    title: "Startup Technology Partner",
    description: "Problem: Lack of technical co-founders. Solution: End-to-end MVP development and technical roadmapping. Result: Launch an enterprise-ready software product in record time without internal bloat.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    highlight: "Edge Compute",
    href: "/solutions/edge-compute",
  },
  {
    title: "Custom vs No-Code Transitions",
    description: "Problem: Outgrowing initial tools. Solution: We migrate fragile no-code setups into robust, custom web applications. Result: Unrestricted technical freedom and absolute data sovereignty.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    highlight: "API Mesh",
    href: "/solutions/api-orchestration",
  },
];

export function Services() {
  return (
    <section className="py-32 lg:py-56 bg-surface-base relative">
      <Container>
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={springSoft}
          >
            <h2 className="text-5xl md:text-7xl font-title font-bold mb-8 leading-tight">
              Comprehensive AI & <br/> <span className="text-brand-orange">Web Architecture.</span>
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto font-medium leading-relaxed">
              We are an AI development company that transforms complex business logic into frictionless SaaS platforms and automated ecosystems.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="-mx-8">
            <Carousel services={services} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Carousel({ services }: { services: any[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  
  const stateRef = useRef({
    isPaused: false,
    unpauseTime: 0,
    lastPausedIdx: -1
  });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let rafId = 0;
    let last: number | null = null;
    const speed = 0.15; 
    const setWidth = services.length * 360;

    const step = (t: number) => {
      if (last === null) last = t;
      const dt = t - last;
      last = t;
      
      const now = Date.now();
      
      if (stateRef.current.isPaused) {
        if (now >= stateRef.current.unpauseTime) {
          stateRef.current.isPaused = false;
          setActiveIdx(null);
        }
      } else {
        el.scrollLeft += speed * dt;
        
        if (el.scrollLeft >= setWidth) {
          el.scrollLeft -= setWidth;
          stateRef.current.lastPausedIdx -= services.length;
        }

        const containerCenter = el.scrollLeft + (el.clientWidth / 2);
        const rawIdx = (containerCenter - 192) / 360;
        const closestIdx = Math.round(rawIdx);
        const dist = Math.abs(rawIdx - closestIdx);
        
        if (dist < 0.02 && closestIdx !== stateRef.current.lastPausedIdx) {
          stateRef.current.isPaused = true;
          stateRef.current.unpauseTime = now + 1500;
          stateRef.current.lastPausedIdx = closestIdx;
          setActiveIdx(closestIdx);
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [services.length]);

  const loopItems = [...services, ...services, ...services];

  return (
    <div ref={trackRef} className="overflow-hidden no-scrollbar py-20">
      <div className="flex gap-10 px-8 w-max">
        {loopItems.map((service, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div key={`${service.title}-${idx}`} className="flex-shrink-0 w-[320px]">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...springSoft, delay: (idx % services.length) * 0.08 }}
                className={`transition-all duration-700 origin-center ${isActive ? 'scale-[1.15] z-20 shadow-2xl' : 'scale-100 z-10 opacity-60'}`}
              >
                <Card borderless compact className="relative h-[50vh] md:h-[48vh] lg:h-[45vh] flex flex-col overflow-hidden" variant="low">
                  <div className="absolute inset-0 overflow-hidden rounded-[1.95rem]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 filter brightness-75 ${isActive ? 'opacity-80 scale-105' : 'opacity-0 scale-100'}`}
                    />
                    <div className={`absolute inset-0 bg-black/50 transition-opacity duration-700 ${isActive ? 'opacity-50' : 'opacity-0'}`} />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className={`text-2xl md:text-3xl font-title font-bold mb-2 transition-colors duration-500 ${isActive ? 'text-yellow-400' : 'text-foreground'}`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm md:text-base font-medium leading-relaxed mb-4 max-w-sm flex-grow overflow-hidden line-clamp-preview transition-colors duration-500 ${isActive ? 'text-white' : 'text-text-muted'}`}>
                      {service.description}
                    </p>

                    <Link
                      to={service.href}
                      className={`inline-flex items-center gap-3 text-[10px] mt-auto font-mono font-bold uppercase tracking-[0.3em] transition-colors duration-500 group/link ${isActive ? 'text-white' : 'text-text-muted'}`}
                    >
                      See The Transformation <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

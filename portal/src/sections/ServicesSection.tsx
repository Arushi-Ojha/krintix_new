import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { springSoft } from "@/lib/motion";

const services = [
  {
    title: "Venture Launch Dynamics",
    description: "Deconstructing hurdles into tactical engineering workflows. Total architecture planning for zero-waste growth from day one.",
    image: "/images/krintix1.jpg",
    highlight: "MVP to Scale",
    href: "/solutions/startup",
  },
  {
    title: "Agile Orchestration",
    description: "High-fidelity lifecycle management utilizing tactical precision. Ensuring delivery velocity without compromising architectural integrity.",
    image: "/images/krintix2.jpg",
    highlight: "Sprinting to Success",
    href: "/solutions/projects",
  },
  {
    title: "Predictive Intelligence Systems",
    description: "Elite execution across autonomous neural workflows that distill raw signal into institutional alpha through bespoke AI/ML integrations.",
    image: "/images/krintix3.jpg",
    highlight: "AI/ML Solutions",
    href: "/solutions/ai",
  },
  {
    title: "Joint Venture Engineering",
    description: "We don't just 'consult'; we co-engineer. Collaborative technical expansion accelerated by our specialized artifact delivery.",
    image: "/images/krintix4.jpg",
    highlight: "Technical Partner",
    href: "/solutions/co-creation",
  },
  {
    title: "Cloud-Native Resiliency Paradigms",
    description: "Architecting fault-tolerant infrastructure matrices. We seamlessly migrate legacy monoliths into decentralized micro-service ecosystems to ensure infinite operational bandwidth and frictionless scalability.",
    image: "/images/krintix1.jpg",
    highlight: "Resilient Cloud",
    href: "/solutions/cloud-resiliency",
  },
  {
    title: "Deep Data Synthetics",
    description: "Harvesting disparate telemetry to formulate cohesive business intelligence. We translate unstructured data lakes into strategic, actionable matrices, granting unprecedented visibility into hidden market mechanics.",
    image: "/images/krintix2.jpg",
    highlight: "Data Synthesis",
    href: "/solutions/data-synthetics",
  },
  {
    title: "Cryptographic Posture Management",
    description: "Fortifying digital perimeters through advanced threat vector analysis. We implement bespoke zero-trust frameworks and end-to-end encryption pipelines to guarantee absolute institutional data sovereignty.",
    image: "/images/krintix3.jpg",
    highlight: "Zero Trust",
    href: "/solutions/crypto-posture",
  },
  {
    title: "Algorithmic Growth Engines",
    description: "Deploying programmatic acquisition frameworks driven by real-time market sentiment. We synthesize cross-channel data and automate multi-touch attribution to exponentially multiply your brand's total addressable reach.",
    image: "/images/krintix4.jpg",
    highlight: "Growth Automation",
    href: "/solutions/algorithmic-growth",
  },
  {
    title: "Automated Delivery Topologies",
    description: "Streamlining release cadences via continuous integration and deployment pipelines. We eradicate manual overhead and systematically eliminate friction to ensure hyper-efficient code-to-production cycles.",
    image: "/images/krintix1.jpg",
    highlight: "CI/CD",
    href: "/solutions/automated-delivery",
  },
  {
    title: "Cognitive Interface Mapping",
    description: "Calibrating user experiences through continuous behavioral telemetry and dynamic component rendering. We engineer frictionless conversion funnels optimized for maximum engagement and minimal cognitive load.",
    image: "/images/krintix2.jpg",
    highlight: "CX Optimization",
    href: "/solutions/cognitive-interface",
  },
  {
    title: "Decentralized Edge Compute",
    description: "Pushing processing logic to the absolute network periphery. We minimize latency overhead by distributing computational weight, enabling instantaneous, localized decision-making protocols across global nodes.",
    image: "/images/krintix3.jpg",
    highlight: "Edge Compute",
    href: "/solutions/edge-compute",
  },
  {
    title: "Omnichannel API Orchestration",
    description: "Weaving fragmented enterprise systems into a unified, synergistic mesh. We enable flawless data interoperability and bidirectional synchronization across diverse, previously siloed third-party ecosystems.",
    image: "/images/krintix4.jpg",
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
              Tactical engineering <br/>for <span className="text-brand-orange">modern scale.</span>
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto font-medium leading-relaxed">
              We treat your technical challenges as precision artifacts, delivering high-fidelity solutions that move the needle.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="overflow-hidden -mx-8">
            <Carousel services={services} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Carousel({ services }: { services: any[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let rafId = 0;
    let last: number | null = null;
    const speed = 0.08; // pixels per ms (approx 50px/s)

    const step = (t: number) => {
      if (last === null) last = t;
      const dt = t - last;
      last = t;
      if (!paused) {
        el.scrollLeft += speed * dt;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [paused]);

  // Duplicate services for seamless loop
  const loopItems = [...services, ...services];

  return (
    <div
      ref={trackRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="overflow-hidden no-scrollbar"
    >
      <div className="flex gap-10 py-4 px-8 w-max">
        {loopItems.map((service, idx) => (
          <div key={`${service.title}-${idx}`} className="flex-shrink-0 w-[320px]">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...springSoft, delay: (idx % services.length) * 0.08 }}
            >
              <Card borderless compact className="relative h-[50vh] md:h-[48vh] lg:h-[45vh] flex flex-col group overflow-hidden" variant="low">
                {/* Background image (full card) - hidden until hover */}
                <div className="absolute inset-0 overflow-hidden rounded-[1.95rem]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-0 scale-100 group-hover:opacity-80 group-hover:scale-105 filter brightness-75"
                  />
                  <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 opacity-0 group-hover:opacity-50" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-2xl md:text-3xl font-title font-bold mb-2 transition-colors text-foreground group-hover:text-yellow-400">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-muted font-medium leading-relaxed mb-4 max-w-sm flex-grow overflow-hidden line-clamp-preview group-hover:text-white">
                    {service.description}
                  </p>

                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-3 text-[10px] mt-auto font-mono font-bold uppercase tracking-[0.3em] text-text-muted transition-all group-hover:text-white group/link"
                  >
                    View Project Details <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

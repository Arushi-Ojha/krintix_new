import { motion } from "framer-motion";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Navbar } from "@/components/HoveringBars/Navbar";
import { Footer } from "@/components/HoveringBars/Footer";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useSEO } from "@/hooks/useSEO";
import { ArrowRight, Code2, Globe, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { ConversionChart } from "@/components/charts/ConversionChart";

export default function WebDevelopmentPage() {
  useSEO({
    title: "Modern Web Development Services | Fast & Scalable Apps",
    description: "Build high-performance web applications using modern frameworks, scalable backend systems, and cloud deployment.",
    keywords: "web development, full stack, React apps, FastAPI backend, scalable systems",
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#04081c]">
      <BackgroundVideo />
      <Navbar />

      <main className="pt-40 pb-20 lg:pt-60 relative z-10">
        <Container>
          {/* 1. Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-24">
            <Badge variant="brand" className="mb-6 mx-auto">
              WEB DEVELOPMENT
            </Badge>
            <h1 className="text-5xl md:text-7xl font-title font-bold mb-6 tracking-tighter leading-tight text-white">
              Scalable Architecture. <br />
              <span className="text-[#E5BA41]">Flawless Experiences.</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              We engineer blazing fast, high-conversion web applications using React, Next.js, and robust backend systems designed to scale from day one.
            </p>
            <Button size="lg" className="h-14 px-10 text-lg group" href="/contact">
              See Growth Simulation
              <ArrowRight className="ml-2 w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* 2. Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card variant="low" className="p-10 h-full border border-[#E5BA41]/20 bg-[#0d1754]/40 backdrop-blur-3xl shadow-[8px_8px_32px_rgba(0,0,0,0.5),inset_2px_2px_10px_rgba(255,255,255,0.1)]">
                <h3 className="text-2xl font-bold text-white mb-4">The Problem</h3>
                <p className="text-white/80 leading-relaxed">
                  Legacy monolithic codebases are slow, hard to maintain, and fail under heavy user load. Poor front-end performance directly kills user conversion rates and destroys SEO rankings.
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="high" className="p-10 h-full border border-[#E5BA41]/40 bg-[#E5BA41]/10 backdrop-blur-3xl shadow-[8px_8px_32px_rgba(229,186,65,0.15),inset_2px_2px_10px_rgba(255,255,255,0.2)]">
                <h3 className="text-2xl font-bold text-[#E5BA41] mb-4">Our Solution</h3>
                <p className="text-white/90 leading-relaxed">
                  We build decoupled, headless architectures using modern tech stacks. This ensures lightning-fast loading speeds, absolute security, and the flexibility to iterate product features instantly.
                </p>
              </Card>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-32">
            {[
              { icon: Code2, title: "Modern Front-End", desc: "Interactive, glassmorphism UI built with React and Tailwind CSS." },
              { icon: Layers, title: "Scalable Back-End", desc: "High-throughput APIs built with FastAPI, Node, or Go." },
              { icon: Globe, title: "Global CDN Delivery", desc: "Sub-second load times globally using Edge computing." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="low" className="p-8 border border-[#E5BA41]/20 bg-[#0d1754]/40 backdrop-blur-3xl shadow-[8px_8px_32px_rgba(0,0,0,0.5),inset_2px_2px_10px_rgba(255,255,255,0.1)] text-center h-full flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-[#E5BA41]" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                  <p className="text-sm text-white/80">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 3. Visual Sections */}
          <div className="mb-32">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Performance Tracking Dashboard</h2>
            <div className="w-full h-80 md:h-[500px] rounded-3xl bg-transparent flex items-center justify-center relative shadow-2xl">
              <ConversionChart />
            </div>
          </div>

          {/* 4. Internal Linking */}
          <div className="border-t border-white/10 pt-20 mb-32">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <h2 className="text-3xl font-bold text-white">Explore More</h2>
              <Button variant="secondary" href="/insights">
                Read Tech Insights
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Link to="/services/seo-optimization">
                <Card variant="low" className="p-8 border border-[#E5BA41]/20 bg-[#0d1754]/40 backdrop-blur-3xl shadow-[4px_4px_24px_rgba(0,0,0,0.5),inset_1px_1px_5px_rgba(255,255,255,0.1)] hover:border-[#E5BA41]/60 transition-colors group">
                  <h4 className="text-xl font-bold text-white group-hover:text-[#E5BA41] transition-colors mb-2">SEO Optimization &rarr;</h4>
                  <p className="text-white/80">Ensure your new web platform ranks globally.</p>
                </Card>
              </Link>
              <Link to="/services/cloud-devops">
                <Card variant="low" className="p-8 border border-[#E5BA41]/20 bg-[#0d1754]/40 backdrop-blur-3xl shadow-[4px_4px_24px_rgba(0,0,0,0.5),inset_1px_1px_5px_rgba(255,255,255,0.1)] hover:border-[#E5BA41]/60 transition-colors group">
                  <h4 className="text-xl font-bold text-white group-hover:text-[#E5BA41] transition-colors mb-2">Cloud & DevOps &rarr;</h4>
                  <p className="text-white/80">Deploy your web application securely to the cloud.</p>
                </Card>
              </Link>
            </div>
          </div>

          {/* 5. CTA Section */}
          <Card
            variant="low"
            className="p-12 lg:p-24 text-center border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#E5BA41]/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-title font-bold text-white mb-8 tracking-tighter">
                Ready to build something incredible?
              </h2>
              <Button size="lg" className="h-16 px-12" href="/contact">
                See Growth Simulation
              </Button>
            </div>
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}


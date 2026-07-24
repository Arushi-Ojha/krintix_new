import { motion } from "framer-motion";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Navbar } from "@/components/HoveringBars/Navbar";
import { Footer } from "@/components/HoveringBars/Footer";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useSEO } from "@/hooks/useSEO";
import { ArrowRight, Database, PieChart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { FunnelChart } from "@/components/charts/FunnelChart";

export default function DataAnalyticsPage() {
  useSEO({
    title: "Data & Analytics Services | Turn Data into Insights",
    description: "Transform raw data into actionable insights with advanced analytics, dashboards, and business intelligence tools.",
    keywords: "data analytics, business intelligence, dashboards, big data, insights",
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
              DATA & ANALYTICS
            </Badge>
            <h1 className="text-5xl md:text-7xl font-title font-bold mb-6 tracking-tighter leading-tight text-white">
              Turn Raw Data into <br />
              <span className="text-[#E5BA41]">Strategic Power.</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Transform massive, unstructured data sets into real-time business intelligence and actionable insights with advanced analytics engineering.
            </p>
            <Button size="lg" className="h-14 px-10 text-lg group" href="/contact">
              See the Growth Simulation
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
                  Companies accumulate terabytes of data daily but struggle to extract meaning. Fragmented silos and outdated reporting methods mean executives make critical decisions based on gut feelings rather than empirical truth.
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
                  We build automated data pipelines, unifying your systems into robust data warehouses. We then deploy interactive BI dashboards that reveal hidden revenue opportunities and operational inefficiencies instantly.
                </p>
              </Card>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-32">
            {[
              { icon: Database, title: "Data Engineering", desc: "Build robust ETL pipelines to clean and aggregate your big data." },
              { icon: PieChart, title: "Business Intelligence", desc: "Visualize key metrics securely with custom interactive dashboards." },
              { icon: TrendingUp, title: "Predictive Modeling", desc: "Use historical data to accurately forecast future growth." }
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
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Business Intelligence Funnel</h2>
            <div className="w-full h-[500px] md:h-[600px] rounded-3xl bg-transparent flex items-center justify-center relative shadow-2xl">
              <FunnelChart />
            </div>
          </div>

          {/* 4. Internal Linking */}
          <div className="border-t border-white/10 pt-20 mb-32">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <h2 className="text-3xl font-bold text-white">Explore More</h2>
              <Button variant="secondary" href="/insights">
                Read Data Insights
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Link to="/services/ai-solutions">
                <Card variant="low" className="p-8 border border-[#E5BA41]/20 bg-[#0d1754]/40 backdrop-blur-3xl shadow-[4px_4px_24px_rgba(0,0,0,0.5),inset_1px_1px_5px_rgba(255,255,255,0.1)] hover:border-[#E5BA41]/60 transition-colors group">
                  <h4 className="text-xl font-bold text-white group-hover:text-[#E5BA41] transition-colors mb-2">AI Solutions &rarr;</h4>
                  <p className="text-white/80">Take your clean data and apply predictive ML algorithms.</p>
                </Card>
              </Link>
              <Link to="/services/seo-optimization">
                <Card variant="low" className="p-8 border border-[#E5BA41]/20 bg-[#0d1754]/40 backdrop-blur-3xl shadow-[4px_4px_24px_rgba(0,0,0,0.5),inset_1px_1px_5px_rgba(255,255,255,0.1)] hover:border-[#E5BA41]/60 transition-colors group">
                  <h4 className="text-xl font-bold text-white group-hover:text-[#E5BA41] transition-colors mb-2">SEO Optimization &rarr;</h4>
                  <p className="text-white/80">Use analytics to dominate search rankings.</p>
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
                Ready to harness your data?
              </h2>
              <Button size="lg" className="h-16 px-12" href="/contact">
                See the Growth Simulation
              </Button>
            </div>
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}


import { motion } from "framer-motion";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Navbar } from "@/components/HoveringBars/Navbar";
import { Footer } from "@/components/HoveringBars/Footer";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useSEO } from "@/hooks/useSEO";
import { ArrowRight, Cloud, Server, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { TopologyChart } from "@/components/charts/TopologyChart";

export default function CloudDevopsPage() {
  useSEO({
    title: "Cloud & DevOps Services | Scalable Infrastructure",
    description: "Deploy, scale, and optimize your applications with cloud-native DevOps and serverless architecture.",
    keywords: "cloud computing, DevOps, AWS, CI/CD, serverless, infrastructure",
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
              CLOUD & DEVOPS
            </Badge>
            <h1 className="text-5xl md:text-7xl font-title font-bold mb-6 tracking-tighter leading-tight text-white">
              Scalable Infrastructure. <br />
              <span className="text-[#E5BA41]">Zero Downtime.</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Automate deployments, secure your perimeter, and instantly scale your applications using modern cloud-native architectures.
            </p>
            <Button size="lg" className="h-14 px-10 text-lg group" href="/contact">
              Audit My Infrastructure
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
                  Manual deployments are prone to human error, causing severe downtime. Poorly configured cloud servers lead to catastrophic security breaches and hyper-inflated AWS/GCP bills.
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
                  We engineer fully automated CI/CD pipelines and declarative Infrastructure-as-Code. We optimize serverless scaling and harden security to ensure absolute enterprise reliability.
                </p>
              </Card>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-32">
            {[
              { icon: Cloud, title: "Cloud Architecture", desc: "Design resilient AWS, GCP, and Azure serverless networks." },
              { icon: Server, title: "CI/CD Automation", desc: "Push code to production multiple times a day safely with automated tests." },
              { icon: Shield, title: "DevSecOps", desc: "Embed rigorous security checks directly into the deployment pipeline." }
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
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Pipeline Architecture</h2>
            <div className="w-full h-[500px] md:h-[600px] rounded-3xl bg-transparent flex items-center justify-center relative shadow-2xl">
              <TopologyChart />
            </div>
          </div>

          {/* 4. Internal Linking */}
          <div className="border-t border-white/10 pt-20 mb-32">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <h2 className="text-3xl font-bold text-white">Explore More</h2>
              <Button variant="secondary" href="/insights">
                Read DevOps Insights
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Link to="/services/web-development">
                <Card variant="low" className="p-8 border border-[#E5BA41]/20 bg-[#0d1754]/40 backdrop-blur-3xl shadow-[4px_4px_24px_rgba(0,0,0,0.5),inset_1px_1px_5px_rgba(255,255,255,0.1)] hover:border-[#E5BA41]/60 transition-colors group">
                  <h4 className="text-xl font-bold text-white group-hover:text-[#E5BA41] transition-colors mb-2">Web Development &rarr;</h4>
                  <p className="text-white/80">Develop the software that runs on our robust infrastructure.</p>
                </Card>
              </Link>
              <Link to="/services/data-analytics">
                <Card variant="low" className="p-8 border border-[#E5BA41]/20 bg-[#0d1754]/40 backdrop-blur-3xl shadow-[4px_4px_24px_rgba(0,0,0,0.5),inset_1px_1px_5px_rgba(255,255,255,0.1)] hover:border-[#E5BA41]/60 transition-colors group">
                  <h4 className="text-xl font-bold text-white group-hover:text-[#E5BA41] transition-colors mb-2">Data & Analytics &rarr;</h4>
                  <p className="text-white/80">Analyze your server metrics and business data.</p>
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
                Ready to scale securely?
              </h2>
              <Button size="lg" className="h-16 px-12" href="/contact">
                Audit My Infrastructure
              </Button>
            </div>
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}


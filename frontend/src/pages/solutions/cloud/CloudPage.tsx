import { Navbar } from "@/components/HoveringBars/Navbar";
import { Footer } from "@/components/HoveringBars/Footer";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Cloud, CheckCircle2, ArrowRight, Zap, Target, BarChart3 } from "lucide-react";

export default function CloudOptimizationPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <Container>
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <Badge variant="outline" className="mb-6">CORE SOLUTION</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Cloud <span className="text-brand-indigo">Optimization.</span>
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Eliminate infrastructure waste and reclaim 30-50% of your cloud spend. We analyze, implement, and monitor your setup for maximum efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">Get Free Cloud Audit</Button>
                <Button size="lg" variant="secondary">View ROI Calculator</Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-brand-indigo/10 blur-[100px] rounded-full" />
              <Card className="p-8 border-brand-indigo/20 relative z-10 glass">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-emerald/10 rounded-full flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-brand-emerald" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-xs tracking-widest">Average Impact</h4>
                      <p className="text-2xl font-bold text-brand-emerald font-mono">43% Cost Reduction</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-cyan/10 rounded-full flex items-center justify-center shrink-0">
                      <Target className="w-5 h-5 text-brand-cyan" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-xs tracking-widest">Typical Timeframe</h4>
                      <p className="text-xl font-bold text-white">8-10 Weeks</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Capabilities */}
          <div className="mb-32">
            <h2 className="text-3xl font-bold mb-12 text-center">Core Capabilities</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Infrastructure Audits",
                  desc: "Deep analysis of your current resource utilization to identify immediate waste and over-provisioning.",
                },
                {
                  title: "Spot Instance Orchestration",
                  desc: "Safely move non-critical and batch workloads to spot instances to save up to 90% on compute costs.",
                },
                {
                  title: "Auto-scaling Tuning",
                  desc: "Optimization of vertical and horizontal scaling parameters to match capacity with demand in real-time.",
                },
                {
                  title: "RI Management",
                  desc: "Strategic Reserved Instance and Savings Plan acquisition to lock in long-term savings without restricting agility.",
                },
                {
                  title: "Cluster Rightsizing",
                  desc: "Analyzing Kubernetes nodes and container requests to ensure you're only paying for what you actually use.",
                },
                {
                  title: "Monitoring & Alerts",
                  desc: "Implementation of cost-aware monitoring and budget alerts to prevent bill shock before it happens.",
                },
              ].map((cap) => (
                <Card key={cap.title} className="p-8 border-white/5 hover:border-brand-indigo/30">
                  <CheckCircle2 className="w-6 h-6 text-brand-indigo mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{cap.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="mb-32">
             <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Methodology</h2>
                <p className="text-text-secondary">A continuous cycle of observation, action, and refinement.</p>
             </div>
             <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: "01", name: "Audit", desc: "Identify immediate waste" },
                  { step: "02", name: "Analyze", desc: "Redesign for efficiency" },
                  { step: "03", name: "Execute", desc: "Implement changes" },
                  { step: "04", name: "Optimize", desc: "Monitor and refine" },
                ].map((s) => (
                  <div key={s.step} className="text-center">
                    <div className="text-5xl font-bold text-brand-indigo/10 mb-4 font-mono">{s.step}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{s.name}</h3>
                    <p className="text-sm text-text-secondary">{s.desc}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* Related Case Study Teaser */}
          <Card className="p-12 lg:p-16 border-brand-indigo/20 bg-surface-2 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8">
                <BarChart3 className="w-32 h-32 text-brand-indigo/5" />
             </div>
             <div className="relative z-10 grid lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-2">
                   <Badge variant="cyan" className="mb-4">REAL-WORLD IMPACT</Badge>
                   <h2 className="text-3xl font-bold text-white mb-6">How we saved a Fintech $144k/year in just 8 weeks.</h2>
                   <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                     By implementing spot instance orchestration and optimizing their Kubernetes cluster, we reduced their monthly AWS bill from $28k to $16k while maintaining 99.9% uptime.
                   </p>
                   <Button variant="ghost" className="p-0 hover:bg-transparent text-brand-indigo group">
                     Read full case study <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </Button>
                </div>
                <div className="text-center bg-brand-indigo/5 p-8 rounded-2xl border border-brand-indigo/10">
                   <div className="text-5xl font-bold text-white mb-2">43%</div>
                   <div className="text-sm text-text-tertiary uppercase tracking-widest font-medium">TOTAL BILL REDUCTION</div>
                </div>
             </div>
          </Card>
        </Container>
      </main>
      <Footer />
    </>
  );
}

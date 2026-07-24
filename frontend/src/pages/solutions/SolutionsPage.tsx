import { Navbar } from "@/components/HoveringBars/Navbar";
import { Footer } from "@/components/HoveringBars/Footer";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Cloud, Bot, Layout, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
  {
    id: "cloud",
    title: "Cloud Optimization",
    headline: "Stop overpaying for your cloud infrastructure.",
    description: "We analyze your AWS, GCP, or Azure setup to identify waste and implement fixes that typically save 30-50% on monthly bills.",
    icon: Cloud,
    features: ["Infrastructure Audits", "Spot Instance Orchestration", "Auto-scaling Tuning", "Cost-aware RI Management"],
    href: "/solutions/cloud",
    color: "text-blue-400",
  },
  {
    id: "ai",
    title: "AI Automation",
    headline: "Automate the repetitive. Focus on the core.",
    description: "Build custom RAG pipelines, workflow agents, and LLM integrations that replace manual processes and accelerate output.",
    icon: Bot,
    features: ["RAG Pipeline Development", "Custom AI Agents", "Workflow Automation", "LLM Fine-tuning"],
    href: "/solutions/ai",
    color: "text-indigo-400",
  },
  {
    id: "tools",
    title: "Internal Tools",
    headline: "Custom tools for custom workflows.",
    description: "Whether it's a specialized admin panel, a custom CRM, or a data dashboard, we build the tools your team needs to thrive.",
    icon: Layout,
    features: ["Admin Dashboards", "Operational Portals", "Custom CRM Extensions", "Data Visualization"],
    href: "/solutions/tools",
    color: "text-emerald-400",
  },
  {
    id: "leadership",
    title: "Technical Leadership",
    headline: "Senior engineering when you need it most.",
    description: "Fractional CTO services, architecture reviews, and senior team augmentation to de-risk your technology roadmap.",
    icon: Shield,
    features: ["Architecture Reviews", "Fractional CTO Services", "Security Audits", "Team Performance Tuning"],
    href: "/solutions/leadership",
    color: "text-amber-400",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <Container>
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Expertise that drives <span className="text-brand-indigo">Efficiency.</span>
            </h1>
            <p className="text-xl text-text-secondary">
              We don't just consult; we build. Our services are designed to solve specific bottlenecks in your engineering and business operations.
            </p>
          </div>

          <div className="space-y-12">
            {solutions.map((solution) => (
              <Card key={solution.id} className="p-0 border-white/5 overflow-hidden">
                <div className="grid lg:grid-cols-5 h-full">
                  <div className="lg:col-span-2 bg-surface-2 p-8 lg:p-12 flex flex-col justify-center items-center text-center">
                    <solution.icon className={cn("w-20 h-20 mb-6", solution.color)} />
                    <h2 className="text-2xl font-bold text-white mb-2">{solution.title}</h2>
                    <Badge variant="outline">{solution.id.toUpperCase()} MODULE</Badge>
                  </div>
                  <div className="lg:col-span-3 p-8 lg:p-12 bg-surface-1 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-4">{solution.headline}</h3>
                    <p className="text-text-secondary mb-8 leading-relaxed">
                      {solution.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                      {solution.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
                          <CheckCircle2 className="w-4 h-4 text-brand-indigo" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button variant="primary" icon={ArrowRight}>
                        View Details
                      </Button>
                      <Button variant="secondary">
                        Case Studies
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}


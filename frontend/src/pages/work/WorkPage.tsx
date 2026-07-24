import * as React from "react";
import { Navbar } from "@/components/HoveringBars/Navbar";
import { Footer } from "@/components/HoveringBars/Footer";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight, Clock, Building2 } from "lucide-react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

const caseStudies = [
  {
    title: "E-Commerce Scale-Up: Cut AWS Spend by 43%",
    client: "Series B Biotech",
    outcome: "$28k → $16k/month savings",
    tech: ["CLOUD OPTIMIZATION", "Kubernetes", "Terraform", "CloudWatch"],
    summary: "Reduced monthly cloud costs by orchestrating spot instances and rightsizing compute clusters without sacrificing 99.99% uptime.",
    slug: "ecommerce-optimization",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
  },
  {
    title: "Fintech: Automated Compliance Workflow",
    client: "APAC Neo-bank",
    outcome: "90% reduction in manual review",
    tech: ["AI AUTOMATION", "FastAPI", "OpenAI", "PostgreSQL"],
    summary: "Built a custom AI agent that screens transaction batches for compliance irregularities, saving the team 40+ hours per week.",
    slug: "fintech-automation",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "SaaS: Custom Admin Intelligence Portal",
    client: "Global Logistics Provider",
    outcome: "Real-time visibility for 500+ operators",
    tech: ["DATA VISUALIZATION", "Tailwind", "D3.js", "Redis"],
    summary: "Developed a high-performance internal dashboard that aggregates logistics data into actionable insights for on-field teams.",
    slug: "logistics-portal",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  },
];

export default function WorkPage() {
  return (
    <>
      <Navbar />
      
      {/* Background Video with a Light Translucent Overlay for High Contrast */}
      <div className="fixed inset-0 -z-20">
        <BackgroundVideo />
      </div>
      <div className="fixed inset-0 bg-white/90 backdrop-blur-md -z-10" />

      <main className="pt-40 pb-24 font-sans min-h-screen">
        <Container>
          
          {/* Header Section */}
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-blue-950 mb-6 tracking-tight">
              Measurable <span className="text-yellow-500 underline decoration-yellow-500 underline-offset-8">Outcomes.</span>
            </h1>
            <p className="text-lg text-gray-700 font-medium leading-relaxed">
              We focus on metrics that matter. Our work is defined by the ROI we deliver for our clients. No fluff, just engineering excellence.
            </p>
          </div>

          {/* Grid Layout mimicking the Reference Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <a 
                key={study.slug} 
                href={`/work/${study.slug}`}
                className="group relative h-[420px] rounded-2xl overflow-hidden shadow-lg shadow-blue-950/10 cursor-pointer block"
              >
                {/* Background Image */}
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Dark Gradient Overlay (Bottom half) */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/80 to-transparent opacity-95" />

                {/* Content Container (Bottom aligned) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                  
                  {/* Category Badge - Matches the Green badge in reference, adapted to palette */}
                  <span className="bg-yellow-400 text-black text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded w-fit mb-4">
                    {study.tech[0]}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-yellow-400 transition-colors">
                    {study.title}
                  </h3>
                  
                  {/* Summary */}
                  <p className="text-[14px] text-gray-300 font-medium mb-4 line-clamp-2 leading-snug">
                    {study.summary}
                  </p>
                  
                  {/* Metadata Row (Client & Read Time) */}
                  <div className="flex items-center gap-4 text-[12px] font-bold text-gray-400 mt-2">
                    <span className="flex items-center gap-1.5 text-white">
                      <Building2 className="w-3.5 h-3.5 text-yellow-400" />
                      {study.client}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {study.readTime}
                    </span>
                  </div>

                  {/* Outcome Highlight - Replaces standard button */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                    <p className="text-[13px] font-bold text-yellow-400 uppercase tracking-wide flex items-center gap-2">
                      Result: <span className="text-white capitalize">{study.outcome}</span>
                    </p>
                    <ArrowUpRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                  </div>

                </div>
              </a>
            ))}
          </div>

          {/* Social Proof Stats - Adjusted to strict palette */}
          <div className="mt-24 p-12 bg-blue-950 border border-blue-900 rounded-[2rem] text-center shadow-2xl relative overflow-hidden">
            {/* Ambient background accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/10 blur-3xl rounded-full pointer-events-none" />
            
            <h2 className="text-2xl font-bold text-white mb-12 relative z-10">Cumulative Impact Across All Engagements</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2 font-sans">$2.4M+</div>
                <div className="text-[11px] text-white/60 font-bold uppercase tracking-widest">Client Cloud Savings</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2 font-sans">15k+</div>
                <div className="text-[11px] text-white/60 font-bold uppercase tracking-widest">Man-hours Automated</div>
              </div>
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2 font-sans">100%</div>
                <div className="text-[11px] text-white/60 font-bold uppercase tracking-widest">Uptime Maintained</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2 font-sans">3.2x</div>
                <div className="text-[11px] text-white/60 font-bold uppercase tracking-widest">Avg. Release Velocity</div>
              </div>
            </div>
          </div>

        </Container>
      </main>
      <Footer />
    </>
  );
}
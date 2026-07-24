import { motion } from "framer-motion";
import { Navbar } from "@/components/HoveringBars/Navbar";
import { Footer } from "@/components/HoveringBars/Footer";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const sectors = [
  {
    title: "Venture Incubation Topologies",
    content:
      "Supporting high-velocity startups through Venture Launch Dynamics. We engineer agile deployment frameworks that deliver startup engineering without the overhead, accelerating go-to-market trajectories and ensuring emerging disruptors achieve structural dominance from day one.",
    icon: import.meta.env.BASE_URL + "images/icon5.png",
    image: import.meta.env.BASE_URL + "images/serpic1.jpg",
  },
  {
    title: "Distributed Enterprise Cloud",
    content:
      "Decomposing global infrastructure challenges into Agile Cloud Native architectures. We establish hyper-scalable, decentralized foundations that guarantee technical continuity and seamless Global Sync across distributed operational theaters in the US, EU, and APAC.",
    icon: import.meta.env.BASE_URL + "images/icon4.png",
    image: import.meta.env.BASE_URL + "images/serpic2.jpg",
  },
  {
    title: "Cognitive & Applied AI Systems",
    content:
      "Driving absolute efficiency in AI and Cloud through bespoke Predictive Intelligence Systems. We embed autonomous neural workflows directly into core enterprise architectures, systematically building the world's most resilient infrastructure and AI workflows.",
    icon: import.meta.env.BASE_URL + "images/icon3.png",
    image: import.meta.env.BASE_URL + "images/serpic3.jpg",
  },
  {
    title: "Collaborative Joint Ventures",
    content:
      "Executing strategic, high-stakes expansions via Joint Venture Engineering. Leveraging Bangalore's aggressive engineering talent pool, we co-engineer specialized, high-velocity technical artifacts to accelerate market penetration without compromising baseline architectural integrity.",
    icon: import.meta.env.BASE_URL + "images/icon2.png",
    image: import.meta.env.BASE_URL + "images/serpic4.jpg",
  },
  {
    title: "Mission-Critical Operations",
    content:
      "Guided by the core principles of Engineering First and Obsessive Efficiency, we fortify operational perimeters for high-volume ecosystems. Our deployments rely on Radical Transparency at the architecture level to eliminate system friction and enforce absolute technical dominance.",
    icon: import.meta.env.BASE_URL + "images/icon1.png",
    image: import.meta.env.BASE_URL + "images/serpic5.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="pt-40 pb-20 lg:pt-60 relative z-10">
        <Container>
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-left mb-24">
            <Badge variant="brand" className="mb-6">
              OUR MISSION
            </Badge>
            <h1 className="text-6xl md:text-8xl font-title font-bold mb-2 tracking-tighter leading-tight">
              <span className="text-white">SECTORS</span>{" "}
              <span className="text-[#E5BA41]">we</span>
              <br />
              <span className="text-[#E5BA41]">work with.</span>
            </h1>
            
            <p className="text-[10px] uppercase tracking-[0.4em] text-text-muted font-mono font-bold mt-12 mb-4">
              Strategic Focus
            </p>
            <h2 className="text-3xl md:text-5xl font-title font-bold text-white tracking-tight max-w-2xl">
              Five operating domains, one cohesive system.
            </h2>
          </div>

          {/* Sequential Cards */}
          <div className="mb-24 lg:mb-36 flex flex-col gap-12 lg:gap-20">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center"
              >
                {/* Number on the left */}
                <div className="flex-shrink-0 w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center rounded-full border border-brand-orange/60 bg-brand-orange/10 text-brand-orange text-3xl lg:text-5xl font-mono font-bold uppercase tracking-widest shadow-[0_0_50px_rgba(255,123,0,0.15)] relative">
                  {/* Optional connecting line for visual flow */}
                  {index !== sectors.length - 1 && (
                    <div className="hidden lg:block absolute top-[110%] left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-brand-orange/40 to-transparent" />
                  )}
                  0{index + 1}
                </div>

                {/* Card Content */}
                <div className="flex-1 rounded-[2rem] border border-white/10 bg-black/55 shadow-[0_0_80px_rgba(0,0,0,0.35)] backdrop-blur-xl p-8 lg:p-12 w-full transition-colors hover:border-white/20">
                  <div className="flex flex-col sm:flex-row gap-8 items-start h-full">
                    
                    {/* Left Side: Icon, Heading, Text */}
                    <div className="flex-1">
                      <div className="mb-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl overflow-hidden p-1">
                          <img 
                            src={sector.icon} 
                            alt={`${sector.title} Icon`} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-title font-bold text-[#E5BA41] leading-tight">
                        {sector.title}
                      </h3>
                      <p className="mt-5 text-lg leading-relaxed text-text-muted font-medium">
                        {sector.content}
                      </p>
                    </div>

                    {/* Right Side: Image Placeholder */}
                    <div className="w-full sm:w-56 h-56 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                      <img 
                        src={sector.image} 
                        alt={sector.title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final CTA */}
          <Card
            variant="low"
            className="p-12 lg:p-24 text-center border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-brand-orange/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-title font-bold text-white mb-10 tracking-tighter">
                Initiate a Strategic Audit.
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="h-16 px-12" href="/contact">
                  Get in Touch
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-16 px-12"
                  href="/work"
                >
                  The Methodology
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
}


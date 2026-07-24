import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black pb-24 pt-24 md:pt-28 lg:pb-40 lg:pt-44">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={`${import.meta.env.BASE_URL}videos/HeroVideo.mov`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/65" />
      {/* Obsidian Background FX */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/5 blur-[120px] animate-krintix-drift" />

      <Container className="relative z-10">
        <div className="grid items-start gap-08 lg:grid-cols-2 lg:items-center lg:gap-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="will-change-transform"
          >
            <motion.h1
              variants={staggerItem}
              className="mb-10 font-title text-6xl font-bold leading-[0.95] tracking-tighter text-white md:text-8xl"
            >
              Intelligent Architecture.<br />
              <span className="text-yellow-400">Scalable Systems.</span>
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="mb-4 max-w-xl text-xl font-semibold leading-relaxed text-white md:text-2xl"
            >
              AI Software Development & Growth Platform.
            </motion.p>
            <motion.p
              variants={staggerItem}
              className="mb-12 max-w-xl text-lg font-medium leading-relaxed text-white/80 md:text-xl"
            >
              We engineer custom SaaS platforms and automation systems. By integrating predictive analytics and machine learning, we replace manual workflows with autonomous, high-converting digital architecture.
            </motion.p>
            <motion.div variants={staggerItem} className="flex flex-col gap-8 sm:flex-row">
              <Button size="lg" icon={ArrowRight}>
                Get AI Audit in 24 Hours
              </Button>
              <Button variant="secondary" size="lg">
                Free Strategy Call
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

/*@/components/ui/Button: Used for the primary "Get Free Audit" and secondary "The Methodology" call-to-action buttons.

@/components/ui/Container: A structural wrapper used to maintain consistent horizontal margins and responsive centering for the hero content.

@/components/ui/Badge: Used for the top-level "Konnecting Real-world INnovations..." label, ensuring a unified design language for decorative status tags. 

*/
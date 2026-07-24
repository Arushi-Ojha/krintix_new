import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { staggerContainer, staggerItem, springSoft } from "@/lib/motion";

export function EngineeringAuditCta() {
  return (
    <section className="relative overflow-hidden bg-transparent py-40 lg:py-56">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/algorithm.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/40 blur-[120px]"
        aria-hidden
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-center"
        >
          <motion.h2
            variants={staggerItem}
            className="mb-10 font-title text-5xl font-bold leading-tight tracking-tighter text-white md:text-7xl"
          >
            Initiate your <br />
            <span className="text-brand-orange">Engineering Audit.</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mb-16 max-w-2xl text-lg font-medium leading-relaxed text-white/90"
          >
            Experience the Krintix methodology. We uncover the technical debt and
            infrastructure waste that standard audits miss.
          </motion.p>
          <motion.div
            variants={staggerItem}
            className="flex flex-col justify-center gap-6 sm:flex-row"
          >
            <Button size="lg" className="h-16 px-12" href="/contact">
              Book Discovery Call
            </Button>
            <Button size="lg" variant="secondary" className="h-16 px-12" href="/work">
              View Case Studies
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

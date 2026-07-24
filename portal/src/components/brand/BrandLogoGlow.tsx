import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSnappy } from "@/lib/motion";

type BrandLogoGlowProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogoGlow({ className }: BrandLogoGlowProps) {
  return (
    <motion.div
      className={cn("relative h-8 w-32", className)}
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.98 }}
      transition={springSnappy}
    >
      <img
        src="/images/krintix-logo.jpeg"
        alt="Krintix Logo"
        className="brand-logo-mark object-contain w-full h-full"
      />
    </motion.div>
  );
}

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSoft } from "@/lib/motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  variant?: "base" | "low" | "mid" | "high";
  bloom?: boolean;
  borderless?: boolean;
  compact?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = true, variant = "mid", bloom = false, borderless = false, compact = false, children, ...props }, ref) => {
    const surfaceClasses = {
      base: "bg-surface-base/40",
      low: "bg-surface-low/50",
      mid: "bg-surface-mid/60",
      high: "bg-surface-high/70",
    };
    const borderClass = borderless ? "border-none" : "border border-border-ghost";
    return (
      <motion.div
        ref={ref}
        whileHover={
          hoverEffect
            ? { y: -10, scale: 1.012, transition: springSoft }
            : {}
        }
        className={cn(
          "relative overflow-hidden rounded-[2rem] backdrop-blur-3xl transition-all duration-500 group/card",
          borderClass,
          surfaceClasses[variant],
          hoverEffect && !borderless && "hover:border-foreground/20",
          hoverEffect && "hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)]",
          className
        )}
        {...props as any}
      >
        {/* Signature Gloss Gradient - The Kaba Stitch Special (Dark Only) */}
        <div className="absolute inset-0 bg-linear-to-br from-brand-blue/10 via-brand-cyan/5 to-transparent opacity-0 dark:opacity-50 group-hover/card:opacity-80 transition-opacity pointer-events-none" />
        
        {/* Inner Shadow for Glass Thickness */}
        {!borderless && (
          <div className="absolute inset-px rounded-[1.95rem] border border-foreground/[0.03] dark:border-white/10 pointer-events-none" />
        )}
        <div className="absolute inset-0 shadow-inner shadow-foreground/[0.02] dark:shadow-white/[0.05] pointer-events-none" />
        
        {bloom && (
          <div className="absolute -inset-40 bg-bloom opacity-20 pointer-events-none" />
        )}
        
        <div className={cn("relative z-10 shadow-inner shadow-foreground/[0.01] dark:shadow-white/[0.02]", compact ? 'p-6' : 'p-8')}>
          {children}
        </div>
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export { Card };

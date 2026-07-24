import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "brand" | "blue" | "success" | "outline" | "cyan";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-white/5 text-text-muted border-white/10",
    brand: "bg-brand-orange/10 border-brand-orange/20 text-brand-orange",
    blue: "bg-brand-blue/10 border-brand-blue/20 text-brand-blue",
    success: "bg-brand-emerald/10 border-brand-emerald/20 text-brand-emerald",
    outline: "border-border-ghost bg-transparent text-text-muted",
    cyan: "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] uppercase tracking-widest font-mono font-bold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };

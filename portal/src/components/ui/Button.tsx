import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { springSnappy } from "@/lib/motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "md" | "lg" | "sm";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "right",
      isLoading,
      href,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "bg-brand-orange text-white hover:bg-brand-orange/90 shadow-[0_20px_40px_rgba(255,77,45,0.25)] border border-brand-orange/20",
      secondary: "glass-artifact text-foreground hover:bg-foreground/[0.03] shadow-sm",
      ghost: "bg-transparent text-text-muted hover:text-foreground hover:bg-foreground/5",
      outline: "bg-transparent border border-brand-orange text-brand-orange hover:bg-brand-orange/5",
    };

    const sizes = {
      sm: "px-4 py-2 text-[10px]",
      md: "px-8 py-3.5 text-[11px]",
      lg: "px-10 py-4.5 text-xs",
    };

    const content = (
      <>
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
            <span className="font-mono font-bold uppercase tracking-[0.2em]">{children}</span>
            {Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
          </>
        )}
      </>
    );

    const classes = cn(
      "inline-flex items-center justify-center rounded-2xl transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-orange/50 disabled:opacity-50 disabled:pointer-events-none gap-3 cursor-pointer",
      variants[variant],
      sizes[size],
      className
    );

    if (href) {
      return (
        <motion.div
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          transition={springSnappy}
          className="inline-block"
        >
          <Link to={href} className={classes}>
            {content}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={springSnappy}
        className={classes}
        {...props as any}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };

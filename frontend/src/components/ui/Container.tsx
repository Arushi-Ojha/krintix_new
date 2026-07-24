import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  clean?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = "div", clean = false, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "mx-auto w-full",
          !clean && "max-w-7xl px-6 lg:px-8",
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container };

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "@/components/ui/loader";

export function PageTransitionLoader() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`fixed inset-0 z-[60] items-center justify-center bg-black/45 backdrop-blur-sm transition-opacity duration-300 ${
        isLoading ? "flex pointer-events-auto opacity-100" : "flex pointer-events-none opacity-0"
      }`}
      aria-hidden={!isLoading}
      aria-live="polite"
    >
      <div className="flex flex-col items-center justify-center gap-6 text-center text-white">
        <Loader color="#ffffff" size={1.8} />
        <span className="text-sm uppercase tracking-[0.3em] text-white/90">
          Loading...
        </span>
      </div>
    </div>
  );
}

import * as React from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const VIDEO_ASSETS = {
  HOME: "/videos/abouthero.mp4",
  TECHNICAL: "/videos/abouthero.mp4",
  GENERAL: "/videos/abouthero.mp4",
  ADMIN: "/videos/abouthero.mp4",
};

export function BackgroundVideo() {
  const location = useLocation();
  const pathname = location.pathname;
  const [activeVideo, setActiveVideo] = React.useState(VIDEO_ASSETS.GENERAL);

  React.useEffect(() => {
    if (pathname === "/") {
      setActiveVideo(VIDEO_ASSETS.HOME);
    } else if (pathname.startsWith("/solutions") || pathname === "/work") {
      setActiveVideo(VIDEO_ASSETS.TECHNICAL);
    } else if (pathname.startsWith("/admin")) {
      setActiveVideo(VIDEO_ASSETS.ADMIN);
    } else {
      setActiveVideo(VIDEO_ASSETS.GENERAL);
    }
  }, [pathname]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-background pointer-events-none">
      {/* Scrim */}
      <div className="absolute inset-0 z-10 bg-black/25 dark:block hidden pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-black/10 dark:hidden block pointer-events-none" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVideo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={activeVideo} type="video/mp4" />
          </video>
        </motion.div>
      </AnimatePresence>

      {/* Global Vignette */}
      <div className="absolute inset-0 z-20 bg-radial-[at_center] from-transparent via-transparent to-black/80 dark:block hidden pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-radial-[at_center] from-transparent via-transparent to-white/30 dark:hidden block pointer-events-none" />
    </div>
  );
}

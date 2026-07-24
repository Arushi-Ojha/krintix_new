import * as React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { springSoft, springSnappy, staggerContainer, staggerItem } from "@/lib/motion";

type NavItem = {
  name: string;
  href?: string;
  children?: { name: string; href: string }[];
};

const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Insights", href: "/insights" },
  {
    name: "Services",
    children: [
      { name: "SEO Optimization", href: "/services/seo-optimization" },
      { name: "AI Solutions", href: "/services/ai-solutions" },
      { name: "Web Development", href: "/services/web-development" },
      { name: "Cloud & DevOps", href: "/services/cloud-devops" },
      { name: "Data & Analytics", href: "/services/data-analytics" },
    ],
  },
  { name: "About", href: "/about" },
];

const menuCloseDelay = 160;

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelCloseMenu = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleCloseMenu = React.useCallback(() => {
    cancelCloseMenu();
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), menuCloseDelay);
  }, [cancelCloseMenu]);

  const openDropdown = React.useCallback(
    (name: string) => {
      cancelCloseMenu();
      setOpenMenu(name);
    },
    [cancelCloseMenu]
  );

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => () => cancelCloseMenu(), [cancelCloseMenu]);

  return (
    <motion.nav
      layout
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-[padding,background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "border-border-ghost bg-[#0d1754]/80 py-4 backdrop-blur-2xl text-white"
          : "border-transparent bg-transparent py-8 backdrop-blur-none text-white"
      )}
    >
      <Container className="flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}images/krintix-text.png`} alt="Krintix" className="h-8 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 md:flex">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => openDropdown(item.name)}
                onMouseLeave={scheduleCloseMenu}
              >
                <motion.div
                  className="inline-flex"
                  whileHover={{ y: -2 }}
                  transition={springSoft}
                >
                  <Link
                    to={item.children[0].href}
                    className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
                  >
                    {item.name}
                    <motion.span
                      animate={{ rotate: openMenu === item.name ? 180 : 0 }}
                      transition={springSnappy}
                    >
                      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </motion.span>
                  </Link>
                </motion.div>

                <AnimatePresence>
                  {openMenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={springSoft}
                      className="absolute left-1/2 top-full z-50 min-w-[17rem] -translate-x-1/2 pt-4"
                      onMouseEnter={cancelCloseMenu}
                      onMouseLeave={scheduleCloseMenu}
                    >
                      <div className="rounded-xl border border-white/10 bg-black/95 py-3 shadow-xl backdrop-blur-xl">
                        {item.children.map((child, i) => (
                          <motion.div
                            key={child.href}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ ...springSoft, delay: i * 0.04 }}
                          >
                            <Link
                              to={child.href}
                              className="block px-6 py-2.5 text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              {child.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                key={item.name}
                className="inline-flex"
                whileHover={{ y: -2 }}
                transition={springSoft}
              >
                <Link
                  to={item.href || "#"}
                  className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
                >
                  {item.name}
                </Link>
              </motion.div>
            )
          )}

          <div className="flex items-center gap-4 border-l border-white/20 pl-6 ml-2">
            <Button variant="primary" size="sm" href="/contact" className="group">
              Connect
              <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <motion.button
            type="button"
            className="p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.92 }}
            transition={springSnappy}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={springSnappy}
                  className="flex"
                >
                  <X size={28} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={springSnappy}
                  className="flex"
                >
                  <Menu size={28} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={springSoft}
            className="overflow-y-auto border-t border-white/10 bg-black/95 backdrop-blur-3xl md:hidden absolute top-full left-0 right-0"
          >
            <Container className="py-10 pb-32">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6"
              >
                {navigation.map((item) =>
                  item.children ? (
                    <motion.div
                      key={item.name}
                      variants={staggerItem}
                      className="flex flex-col gap-3"
                    >
                      <h4 className="font-mono text-[16px] font-bold text-white/80 uppercase tracking-[0.1em] pb-2 border-b border-white/10 block w-full">
                        {item.name}
                      </h4>
                      <div className="flex flex-col gap-3 pl-4 border-l border-white/20 mt-2">
                        {item.children.map((child) => (
                          <motion.div
                            key={child.href}
                            whileHover={{ x: 4 }}
                            transition={springSoft}
                          >
                            <Link
                              to={child.href}
                              onClick={() => setIsOpen(false)}
                              className="font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-white/60 transition-colors hover:text-white"
                            >
                              {child.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key={item.name} variants={staggerItem}>
                      <Link
                        to={item.href || "#"}
                        onClick={() => setIsOpen(false)}
                        className="font-mono text-[16px] font-bold text-white/80 uppercase tracking-[0.1em] pb-4 border-b border-white/10 block w-full hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                )}
                <motion.div variants={staggerItem} className="pt-6">
                  <Button variant="primary" size="lg" className="w-full justify-center group" href="/contact">
                    Connect
                    <ArrowRight className="ml-2 w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}


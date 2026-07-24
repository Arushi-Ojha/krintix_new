import * as React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { BrandLogoGlow } from "@/components/brand/BrandLogoGlow";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import { springSoft, springSnappy, staggerContainer, staggerItem } from "@/lib/motion";

const navigation = [
  {
    name: "Services",
    href: "/solutions",
    children: [
      { name: "Startups & scale", href: "/solutions/startup" },
      { name: "Projects", href: "/solutions/projects" },
      { name: "AI & ML", href: "/solutions/ai" },
      { name: "Co-creation", href: "/solutions/co-creation" },
    ],
  },
  { name: "Work", href: "/work" },
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
] as const;

const menuCloseDelay = 160;

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { theme, toggleTheme } = useTheme();

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
        "fixed left-0 right-0 top-0 z-50 border-b text-white transition-[padding,background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "border-border-ghost bg-[#0d1754]/70 py-4 backdrop-blur-xl supports-backdrop-filter:bg-[#0d1754]/60"
          : "border-transparent bg-transparent py-8 backdrop-blur-none"
      )}
    >
      <Container className="flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <img src="/images/krintix-text.png" alt="Krintix" className="h-8 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 md:flex">
          {navigation.map((item) =>
            "children" in item ? (
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
                    to={item.href}
                    className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white"
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
                      <div className="rounded-xl border border-border-ghost bg-surface-base/95 py-2 shadow-xl backdrop-blur-xl">
                        {item.children.map((child, i) => (
                          <motion.div
                            key={child.href}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ ...springSoft, delay: i * 0.04 }}
                          >
                            <Link
                              to={child.href}
                              className="block px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-foreground/72 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
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
                  to={item.href}
                  className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white"
                >
                  {item.name}
                </Link>
              </motion.div>
            )
          )}

          <div className="flex items-center gap-4 border-l border-border-ghost pl-4">
            <motion.button
              type="button"
              onClick={toggleTheme}
              className="rounded-xl border border-border-ghost bg-foreground/[0.04] p-2 text-white/70 transition-colors hover:bg-foreground/[0.07] hover:text-white"
              aria-label="Toggle Theme"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={springSnappy}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -50, opacity: 0, scale: 0.85 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 50, opacity: 0, scale: 0.85 }}
                  transition={springSnappy}
                  className="flex"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <Button variant="secondary" size="sm" href="/login">
              Log In
            </Button>
            <Button variant="primary" size="sm" href="/contact">
              Connect
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <motion.button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-border-ghost bg-foreground/[0.04] p-2 text-white/70"
            whileTap={{ scale: 0.94 }}
            transition={springSnappy}
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -40, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 40, opacity: 0 }}
                transition={springSnappy}
                className="flex"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={springSoft}
            className="overflow-hidden border-b border-border-ghost bg-surface-base/95 backdrop-blur-2xl md:hidden"
          >
            <Container className="py-10">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6"
              >
                {navigation.map((item) =>
                  "children" in item ? (
                    <motion.div
                      key={item.name}
                      variants={staggerItem}
                      className="flex flex-col gap-3"
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="font-title text-2xl font-bold text-foreground/88 transition-colors hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                      <div className="flex flex-col gap-2 border-l border-border-ghost pl-4">
                        {item.children.map((child) => (
                          <motion.div
                            key={child.href}
                            whileHover={{ x: 4 }}
                            transition={springSoft}
                          >
                            <Link
                              to={child.href}
                              onClick={() => setIsOpen(false)}
                              className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-white"
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
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="font-title text-2xl font-bold text-foreground/88 transition-colors hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                )}
                <motion.div variants={staggerItem} className="pt-2 flex flex-col gap-3">
                  <Button variant="secondary" size="lg" className="w-full" href="/login">
                    Log In
                  </Button>
                  <Button variant="primary" size="lg" className="w-full" href="/contact">
                    Connect
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

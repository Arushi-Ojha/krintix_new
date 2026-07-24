import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { BrandLogoGlow } from "@/components/brand/BrandLogoGlow";

const footerNavigation = {
  company: [
    { name: "Work", href: "/work" },
    { name: "Insights", href: "/insights" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.7998L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31398 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-surface-base ghost-border border-t">
      <Container className="py-16 lg:py-20">
        <div className="xl:grid xl:grid-cols-3 xl:gap-24">
          <div className="space-y-10">
            <Link to="/" className="group flex items-center gap-3">
              <BrandLogoGlow />
            </Link>
            <p className="text-base text-text-muted max-w-xs font-medium leading-relaxed">
              Technical Excellence from Bangalore. Engineering the world's most efficient infrastructure and AI workflows.
            </p>
            <div className="flex gap-8">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-text-muted hover:text-foreground transition-colors"
                >
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-12 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="text-[10px] font-bold text-foreground uppercase tracking-[0.3em] font-mono mb-8">
                  Solutions
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/solutions/startup" className="text-sm text-text-muted hover:text-foreground transition-colors font-medium">Venture Launch Dynamics</Link>
                  </li>
                  <li>
                    <Link to="/solutions/projects" className="text-sm text-text-muted hover:text-foreground transition-colors font-medium">Agile Orchestration</Link>
                  </li>
                  <li>
                    <Link to="/solutions/ai" className="text-sm text-text-muted hover:text-foreground transition-colors font-medium">Predictive Intelligence Systems</Link>
                  </li>
                  <li>
                    <Link to="/solutions/co-creation" className="text-sm text-text-muted hover:text-foreground transition-colors font-medium">Joint Venture Engineering</Link>
                  </li>
                </ul>
              </div>
              <div className="mt-16 md:mt-0">
                <h3 className="text-[10px] font-bold text-foreground uppercase tracking-[0.3em] font-mono mb-8">
                  Company
                </h3>
                <ul className="space-y-4">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm text-text-muted hover:text-foreground transition-colors font-medium"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-12">
              <div>
                <h3 className="text-[10px] font-bold text-foreground uppercase tracking-[0.3em] font-mono mb-8">
                  Operational Hub
                </h3>
                <div className="space-y-4 text-sm text-text-muted font-medium mb-8">
                  <p>Bengaluru, KA 560068</p>
                  <p className="pt-2">Tel: +91 99212 00036</p>
                  <p>Mail: Info@krintix.com</p>
                </div>
                <form className="flex max-w-md gap-x-3">
                  <input
                    type="email"
                    required
                    placeholder="Engineering Feed"
                    className="min-w-0 flex-auto rounded-xl border-border-ghost bg-foreground/[0.03] px-4 py-3 text-foreground shadow-xs focus:ring-1 focus:ring-brand-orange outline-hidden text-sm font-medium"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-xl bg-brand-orange px-5 py-3 text-[11px] font-bold text-white shadow-xl hover:bg-brand-orange/90 transition-all uppercase tracking-widest font-mono"
                  >
                    Ingest
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border-ghost pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-text-muted font-mono font-bold tracking-widest uppercase italic max-w-sm">
            &copy; {new Date().getFullYear()} Krintix Systems.
          </p>
          <div className="flex gap-10">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-[10px] text-text-muted hover:text-foreground font-mono font-bold tracking-widest transition-colors uppercase"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/HoveringBars/Navbar";
import { Footer } from "@/components/HoveringBars/Footer";
import { Container } from "@/components/ui/Container";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo"; 
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function InsightsPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${apiUrl}/articles/`);
        if (res.ok) {
          const data = await res.json();
          // Sort by newest first (descending id/date)
          setArticles(data.sort((a: any, b: any) => b.id - a.id));
        }
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        setLoadingArticles(false);
      }
    };
    fetchArticles();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    try {
      const response = await fetch(`${apiUrl}/subscriptions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Subscription failed");
      }

      setStatus("success");
      setMessage("Successfully subscribed!");
      setEmail("");
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "An error occurred");
    }
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-yellow-400 selection:text-white">
      <Navbar />

      {/* --- BACKGROUND VIDEO WITH HIGH-VISIBILITY OVERLAY --- */}
      <div className="fixed inset-0 -z-20">
        <BackgroundVideo />
      </div>
      {/* 
        Reduced opacity and blur to make the video clearly visible. 
        Added a subtle yellow mix-blend to tie the video into your color scheme.
      */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-[3px] -z-10" />
      <div className="fixed inset-0 bg-yellow-400/5 mix-blend-overlay -z-10 pointer-events-none" />

      <main className="pb-24 pt-40 md:pt-48">
        <Container className="relative z-10">
          
          {/* Header Section */}
          <header className="mb-16 max-w-3xl md:mb-24 relative">
            {/* Soft glow behind text to maintain contrast against moving video */}
            <div className="absolute -inset-10 bg-black/40 blur-2xl rounded-full -z-10 pointer-events-none" />
            
            <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-blue-950">
              Journal
            </p>
            <h1 className="mb-6 font-serif text-5xl md:text-7xl font-black tracking-tight text-blue-950 leading-tight">
              Engineering <br />
              <span className="font-sans font-black text-yellow-500 underline decoration-yellow-500 underline-offset-8">
                Insights.
              </span>
            </h1>
            <p className="text-lg md:text-xl font-bold leading-relaxed text-white/80 max-w-2xl">
              Deep dives, tutorials, and field notes from the Krintix team—cloud
              efficiency, AI automation, and how we ship.
            </p>
          </header>

          {/* 
            --- INDIVIDUAL STACKED-BORDER CARDS --- 
            Mimicking the Cedar&Sage menu aesthetic per individual card
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-y-16 min-h-[300px]">
            {loadingArticles ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-yellow-400 animate-spin mb-4" />
                <p className="text-white/60 font-bold">Loading insights...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <p className="text-white/60 font-bold text-lg">No articles published yet.</p>
              </div>
            ) : (
              articles.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/insights/${post.id}`}
                  className="group relative block h-full outline-none"
                >
                  {/* Back Stacked Border */}
                  <div className="absolute inset-0 border border-blue-950 rounded-[2rem] translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4 opacity-30 pointer-events-none" />
                  
                  {/* Middle Stacked Border */}
                  <div className="absolute inset-0 border border-blue-950 rounded-[2rem] translate-x-1.5 translate-y-1.5 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 opacity-60 pointer-events-none" />
                  
                  {/* Main Front Card */}
                  <div className="relative h-full bg-white/95 backdrop-blur-2xl border-[1.5px] border-blue-950 rounded-[2rem] p-8 flex flex-col z-10 transition-colors duration-500 group-hover:bg-[#fcfdfa] shadow-xl shadow-blue-950/5">
                    
                    {/* Card Header (Category & Icon) */}
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-black text-blue-950 border border-blue-950/20 px-3 py-1 rounded-full">
                        {post.category || "Architecture"}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 text-black" />
                      </div>
                    </div>
                    
                    {/* Card Title */}
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-blue-950 mb-4 leading-tight group-hover:text-black transition-colors line-clamp-3">
                      {post.topic}
                    </h2>
                    
                    {/* Card Summary */}
                    <p className="text-[14px] font-medium text-black/70 leading-relaxed mb-8 flex-1 line-clamp-3">
                      {post.detail || "Explore our latest strategies and technical breakdowns."}
                    </p>
                    
                    {/* Card Footer (Date / Read Time) */}
                    <div className="flex items-center justify-between pt-4 border-t border-blue-950/10 mt-auto">
                      <span className="text-xs font-bold text-blue-950 tracking-wide">
                        {post.published_date || "Just now"}
                      </span>
                      <span className="text-xs font-bold text-black/50">
                        {post.read_minutes || "5"} min read
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* --- NEWSLETTER SECTION (Stacked Card Style) --- */}
          <section className="relative mt-24 md:mt-32 max-w-4xl mx-auto" aria-labelledby="insights-newsletter-heading">
            {/* Background Borders for Newsletter */}
            <div className="absolute inset-0 border border-blue-950 rounded-[2.5rem] translate-x-3 translate-y-3 opacity-30 pointer-events-none" />
            <div className="absolute inset-0 border border-blue-950 rounded-[2.5rem] translate-x-1.5 translate-y-1.5 opacity-60 pointer-events-none" />
            
            {/* Newsletter Front Card */}
            <div className="relative z-10 bg-blue-950 rounded-[2.5rem] p-10 md:p-16 text-center border-2 border-blue-950 overflow-hidden shadow-2xl">
              
              {/* Decorative accent inside newsletter */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-400/20 blur-3xl rounded-full pointer-events-none" />
              
              <div className="relative z-10 max-w-xl mx-auto">
                <h2
                  id="insights-newsletter-heading"
                  className="mb-4 font-serif text-3xl md:text-4xl font-bold tracking-tight text-white"
                >
                  Never miss an insight
                </h2>
                <p className="mb-10 text-white/70 font-medium">
                  Bi-weekly notes on cloud efficiency and AI automation—no spam.
                </p>
                
                <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe}>
                  <label htmlFor="insights-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="insights-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                    disabled={status === "loading"}
                    className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-bold text-white placeholder:text-white/40 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-colors disabled:opacity-50"
                  />
                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="shrink-0 bg-yellow-400 hover:bg-yellow-500 text-black text-[15px] font-black px-8 py-4 rounded-xl transition-colors active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
                {status === "success" && (
                  <p className="mt-4 text-sm font-bold text-green-400 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {message}
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-4 text-sm font-bold text-red-400 flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4" /> {message}
                  </p>
                )}
              </div>
            </div>
          </section>

        </Container>
      </main>
      <Footer />
    </div>
  );
}
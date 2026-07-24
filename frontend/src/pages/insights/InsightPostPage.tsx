import React, { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/HoveringBars/Navbar";
import { Footer } from "@/components/HoveringBars/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Calendar, Clock, Loader2 } from "lucide-react";

export default function InsightPostPage() {
  const { slug } = useParams<{ slug: string }>(); // This is actually the article ID
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${apiUrl}/articles/${slug}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-blue-950 flex flex-col items-center justify-center">
        <Navbar />
        <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
        <p className="mt-4 text-white/70 font-bold">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return <Navigate to="/insights" replace />;
  }

  return (
    <div className="relative min-h-screen bg-blue-950">
      <Navbar />
      <main className="pb-24 pt-36 md:pt-44">
        <Container className="max-w-3xl">
          <Link
            to="/insights"
            className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-yellow-400 transition-colors hover:text-yellow-300"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            All insights
          </Link>
          
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-widest font-black text-yellow-400 border border-yellow-400/30 px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>

          <h1 className="mb-8 font-serif text-4xl font-black tracking-tight text-white md:text-5xl leading-tight">
            {article.topic}
          </h1>
          
          <div className="mb-12 flex flex-wrap gap-6 text-sm text-white/70 font-bold">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-yellow-400" />
              {article.published_date}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-400" />
              {article.read_minutes} min read
            </span>
            <span className="text-white/50">By Krintix</span>
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none text-white/90 leading-relaxed font-medium">
            <div dangerouslySetInnerHTML={{ __html: article.detail.replace(/\n/g, '<br/>') }} />
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/60 font-medium">
              Want to dive deeper?{" "}
              <Link to="/contact" className="font-bold text-yellow-400 underline-offset-4 hover:underline">
                Talk to us
              </Link>{" "}
              about this topic.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

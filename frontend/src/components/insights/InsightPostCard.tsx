import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { InsightPost } from "@/lib/insights-posts";
import { springSoft } from "@/lib/motion";

type Props = {
  post: InsightPost;
  index: number;
};

export function InsightPostCard({ post, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...springSoft, delay: index * 0.06 }}
      className="h-full"
    >
      <Link
        to={`/insights/${post.slug}`}
        className="group/card-link block h-full rounded-[2rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Card
          variant="low"
          className="flex h-full flex-col border-border-ghost bg-surface-low/60 transition-[border-color,box-shadow] duration-300 hover:border-brand-orange/35 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_28px_56px_-16px_rgba(255,77,45,0.12)]"
        >
          <div className="mb-5">
            <Badge variant="outline" className="text-[10px] text-text-secondary">
              {post.category}
            </Badge>
          </div>
          <h3 className="mb-3 font-title text-xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover/card-link:text-brand-orange">
            {post.title}
          </h3>
          <p className="mb-8 line-clamp-3 flex-grow text-sm leading-relaxed text-text-secondary">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between gap-4 border-t border-border-ghost pt-5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden />
                {post.readTime}
              </span>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-orange opacity-90 transition-all duration-300 group-hover/card-link:translate-x-0.5 group-hover/card-link:opacity-100">
              Read
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

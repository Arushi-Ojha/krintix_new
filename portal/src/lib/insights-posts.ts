export type InsightPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  slug: string;
};

export const insightsPosts: InsightPost[] = [
  {
    title: "How we cut $18k/mo with spot instances",
    excerpt:
      "A deep dive into the architecture changes and monitoring setup required to run production workloads on spot instances without downtime.",
    date: "Nov 12, 2025",
    readTime: "8 min read",
    author: "Arjun Rao",
    category: "Cloud Ops",
    slug: "cut-costs-spot-instances",
  },
  {
    title: "Building a RAG pipeline for customer support",
    excerpt:
      "Learn how we integrated vector databases and LLMs to automate 60% of technical support queries for a growing SaaS platform.",
    date: "Oct 28, 2025",
    readTime: "12 min read",
    author: "Sarah Chen",
    category: "AI Automation",
    slug: "rag-pipeline-support",
  },
  {
    title: "5 AWS billing mistakes we see every week",
    excerpt:
      "From orphaned snapshots to overprovisioned EBS volumes, these are the top drainers of your cloud budget and how to fix them.",
    date: "Oct 15, 2025",
    readTime: "6 min read",
    author: "Dave Miller",
    category: "Technical Leadership",
    slug: "aws-billing-mistakes",
  },
];

export function getInsightPost(slug: string): InsightPost | undefined {
  return insightsPosts.find((p) => p.slug === slug);
}

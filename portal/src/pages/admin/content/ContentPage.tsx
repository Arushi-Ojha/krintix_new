import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/HoveringBars/AdminSidebar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FileEdit, Plus, Search, Filter, MoreVertical, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

const articles = [
  { id: 1, title: "The Discovery Protocol: Deep Diving into Business Gaps", author: "Pranav V.", status: "Published", date: "April 08, 2026", category: "Methodology" },
  { id: 2, title: "Cutting-Edge Development: Beyond Standard Best Practices", author: "Aswin S.", status: "Draft", date: "April 05, 2026", category: "Engineering" },
  { id: 3, title: "Seamless Deployment: Managing Performance from Day One", author: "Deepak K.", status: "Published", date: "March 28, 2026", category: "Ops" },
];

export default function ContentStudioPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-10 lg:p-16">
        <header className="flex justify-between items-end mb-20">
          <div>
            <h1 className="text-4xl font-title font-bold mb-3 tracking-tighter">Content Studio</h1>
            <p className="text-text-muted text-base font-medium font-sans">Drafting & Asset Management</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-orange transition-colors" />
              <input 
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/[0.03] border border-white/5 rounded-xl py-3 pl-10 pr-6 text-sm outline-hidden focus:ring-1 focus:ring-brand-orange w-80 transition-all focus:bg-white/[0.05]"
              />
            </div>
            <Button variant="secondary" icon={Plus}>New Drafting Session</Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-12 space-y-8">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-title font-bold flex items-center gap-3">
                <FileEdit className="w-5 h-5 text-brand-blue" />
                Article Library
              </h2>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" icon={Filter}>Filter</Button>
              </div>
            </div>

            <Card variant="low" className="p-0 border-white/5 overflow-hidden" hoverEffect={false}>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/[0.02]">
                    <tr className="border-b border-white/5 text-[9px] uppercase tracking-[0.3em] text-text-secondary font-mono font-bold">
                      <td className="px-8 py-5">Article Title / Author</td>
                      <td className="px-8 py-5">Category</td>
                      <td className="px-8 py-5">Last Modified</td>
                      <td className="px-8 py-5 text-center">Status</td>
                      <td className="px-8 py-5 text-right">Actions</td>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {articles.map((article) => (
                      <tr key={article.id} className="group hover:bg-white/[0.01] transition-colors">
                        <td className="px-8 py-6">
                          <p className="text-sm font-bold mb-0.5 group-hover:text-brand-orange transition-colors cursor-pointer">{article.title}</p>
                          <p className="text-xs text-text-muted font-medium italic">By {article.author}</p>
                        </td>
                        <td className="px-8 py-6">
                          <Badge variant="default" className="bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                            {article.category}
                          </Badge>
                        </td>
                        <td className="px-8 py-6 text-xs text-text-muted font-mono">
                          {article.date}
                        </td>
                        <td className="px-8 py-6 text-center">
                          <Badge variant={article.status === "Published" ? "brand" : "default"}>
                            {article.status}
                          </Badge>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-white/5 rounded-lg text-text-muted hover:text-foreground transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-white/5 rounded-lg text-text-muted hover:text-foreground transition-colors">
                              <FileEdit className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-white/5 rounded-lg text-text-muted hover:text-red-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

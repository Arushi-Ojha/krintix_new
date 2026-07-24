import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/HoveringBars/AdminSidebar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Search, Filter, Archive, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";

const messages = [
  { id: 1, sender: "James Wilson", company: "Skyline Tech", subject: "Cloud Security Audit Inquiry", time: "2h ago", status: "Unread" },
  { id: 2, sender: "Sarah Chen", company: "BioGen Systems", subject: "AI Automation for Lab Workflows", time: "5h ago", status: "Read" },
  { id: 3, sender: "Michael Ross", company: "Nexus Dynamics", subject: "Partnership Opportunity", time: "1d ago", status: "Archived" },
];

export default function InboundFeedPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-10 lg:p-16">
        <header className="flex justify-between items-end mb-20">
          <div>
            <h1 className="text-4xl font-title font-bold mb-3 tracking-tighter">Inbound Feed</h1>
            <p className="text-text-muted text-base font-medium font-sans">Strategic Communication Hub</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-orange transition-colors" />
              <input 
                placeholder="Search messages..."
                className="bg-white/[0.03] border border-white/5 rounded-xl py-3 pl-10 pr-6 text-sm outline-hidden focus:ring-1 focus:ring-brand-orange w-80 transition-all focus:bg-white/[0.05]"
              />
            </div>
            <Button variant="secondary" icon={Archive}>Batch Archive</Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-4 lg:grid-rows-1 gap-10">
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-mono font-bold px-2 mb-6">Categorization</h2>
            <nav className="space-y-2">
              {[
                { name: "All Messages", icon: MessageSquare, count: 12 },
                { name: "Unread", icon: Clock, count: 3 },
                { name: "Responded", icon: CheckCircle2, count: 8 },
                { name: "Archived", icon: Archive, count: 45 },
              ].map((tab) => (
                <button 
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.name ? "bg-brand-blue/10 text-brand-blue" : "text-text-muted hover:bg-foreground/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm font-bold font-sans">{tab.name}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-60 font-bold">{tab.count}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-title font-bold px-2">Recent Inquiries</h2>
              <Button variant="ghost" size="sm" icon={Filter}>Filter</Button>
            </div>

            <div className="space-y-4">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  whileHover={{ x: 4 }}
                  className="group relative cursor-pointer"
                >
                  <Card variant="low" className={`p-6 border-white/5 transition-all group-hover:bg-foreground/5 ${
                    msg.status === "Unread" ? "border-l-2 border-l-brand-orange" : ""
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <p className="text-lg font-title font-bold group-hover:text-brand-orange transition-colors">{msg.sender}</p>
                          <Badge variant="default" className="text-[10px] bg-white/5 border-white/5">{msg.company}</Badge>
                        </div>
                        <p className="text-sm text-text-muted font-medium">{msg.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-3 font-bold">{msg.time}</p>
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-foreground/10 rounded-lg text-brand-blue transition-colors">
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-foreground/10 rounded-lg text-text-muted transition-colors">
                            <Archive className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

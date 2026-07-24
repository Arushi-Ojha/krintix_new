import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/HoveringBars/AdminSidebar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Mail, Search, Send, Clock, AlertTriangle, RefreshCw } from "lucide-react";
import { useState } from "react";

const queueData = [
  { id: 1, recipient: "management@inditech.co", template: "Scale_Reachout_V2", scheduled: "14:30 PM", status: "Pending" },
  { id: 2, recipient: "it-ops@futurefoundry.com", template: "FollowUp_Optimization", scheduled: "15:00 PM", status: "Sending" },
  { id: 3, recipient: "cto@nova-ai.io", template: "Audit_Intro", scheduled: "11:00 AM", status: "Failed" },
  { id: 4, recipient: "ashish@krintix.com", template: "Scale_Reachout_V2", scheduled: "09:00 AM", status: "Sent" },
];

export default function EmailQueuePage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-10 lg:p-16">
        <header className="flex justify-between items-end mb-20">
          <div>
            <h1 className="text-4xl font-title font-bold mb-3 tracking-tighter">Email Queue</h1>
            <p className="text-text-muted text-base font-medium font-sans">Automated Pipeline Monitoring</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-orange transition-colors" />
              <input 
                placeholder="Search queue..."
                className="bg-white/[0.03] border border-white/5 rounded-xl py-3 pl-10 pr-6 text-sm outline-hidden focus:ring-1 focus:ring-brand-orange w-80 transition-all focus:bg-white/[0.05]"
              />
            </div>
            <Button variant="secondary" icon={RefreshCw}>Resync Engine</Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <h2 className="text-xl font-title font-bold mb-8 flex items-center gap-3">
              <Clock className="w-5 h-5 text-brand-orange" />
              Active Queue
            </h2>
            <div className="space-y-4">
              {queueData.map((item) => (
                <Card key={item.id} variant="low" className="p-6 border-white/5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                      <div className={`p-3 rounded-xl ${
                        item.status === "Failed" ? "bg-red-500/10 text-red-500" : 
                        item.status === "Sent" ? "bg-green-500/10 text-green-500" : 
                        "bg-brand-blue/10 text-brand-blue"
                      }`}>
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-base font-bold mb-0.5">{item.recipient}</p>
                        <p className="text-xs text-text-muted font-mono tracking-wider font-bold">{item.template}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-10 text-right">
                      <div>
                        <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-1 font-bold">Scheduled</p>
                        <p className="text-sm font-bold">{item.scheduled}</p>
                      </div>
                      <div className="w-32">
                        <Badge variant={item.status === "Sent" ? "brand" : item.status === "Failed" ? "default" : "default"}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-foreground/5 rounded-lg text-text-muted hover:text-foreground transition-colors">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-text-muted font-mono font-bold mb-6">Engine Analytics</h2>
              <Card variant="base" className="p-8 border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
                <div className="space-y-8">
                  <div>
                    <p className="text-text-muted text-sm font-medium mb-1">Daily Throughput</p>
                    <p className="text-4xl font-title font-bold tracking-tighter">1,284</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm font-medium mb-1">Success Rate</p>
                    <p className="text-4xl font-title font-bold text-brand-cyan tracking-tighter">99.2%</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm font-medium mb-1">Avg. Delivery</p>
                    <p className="text-4xl font-title font-bold tracking-tighter">1.8s</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card variant="low" className="p-6 bg-red-500/5 border-red-500/10 backdrop-blur-3xl">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-bold text-red-500 mb-1">API Threshold Warning</h3>
                  <p className="text-xs text-text-muted leading-relaxed">Gmail API quota at 85%. Automated batches will be throttled for the next 12 hours to maintain system integrity.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

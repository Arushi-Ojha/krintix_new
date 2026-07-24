import * as React from "react";
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  FileText, 
  MessageSquare, 
  Settings,
  LogOut,
  PenTool
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export function AdminSidebar({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "employees", label: "Employee Details", icon: Users },
    { id: "attendance", label: "Attendance", icon: CalendarDays },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "contacts", label: "Contacts", icon: MessageSquare },
    { id: "communications", label: "Communications", icon: FileText },
    { id: "articles", label: "Articles", icon: PenTool },
    { id: "profile", label: "Profile", icon: Settings },
  ];

  return (
    <div className="w-[240px] bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Logo Area */}
      <div className="p-8 pb-8 flex items-center gap-3">
        <img src="/images/krintix-text.png" alt="Krintix" className="h-6 w-auto" />
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-2 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-8 py-3 transition-all font-medium text-sm relative",
                  isActive
                    ? "text-blue-700 bg-blue-50/30"
                    : "text-gray-500 hover:text-blue-700 hover:bg-gray-50"
                )}
              >
                {/* Pink Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-md" />
                )}
                <Icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-gray-400")} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="p-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-gray-500 hover:text-red-500 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          System Logout
        </button>
      </div>
    </div>
  );
}
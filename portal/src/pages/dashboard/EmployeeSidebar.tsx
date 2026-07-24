import * as React from "react";
import { 
  BarChart2, 
  Clock, 
  Settings,
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EmployeeSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export function EmployeeSidebar({ activeTab, setActiveTab, onLogout }: EmployeeSidebarProps) {
  const mainTabs = [
    { id: "overview", label: "Overview", icon: BarChart2 },
    { id: "punch", label: "Time Tracking", icon: Clock },
    { id: "profile", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-[240px] bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      {/* Logo Area */}
      <div className="p-8 pb-8 flex items-center gap-3">
        <img src="/images/krintix-text.png" alt="Krintix" className="h-6 w-auto" />
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-2">
        <div className="space-y-2">
          {mainTabs.map((tab) => {
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
                {/* Blue/Pink Active Indicator matching the image */}
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
          Logout
        </button>
      </div>
    </div>
  );
}
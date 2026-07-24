import * as React from "react";
import { EmployeeSidebar } from "@/pages/dashboard/EmployeeSidebar";
import { cn } from "@/lib/utils";
import { 
  RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  BarChart, Bar
} from "recharts";
import { 
  CheckCircle2, StopCircle, UserCircle, 
  Clock, Activity, Users, ShoppingBag, ArrowUpRight, ArrowDownRight, ChevronDown
} from "lucide-react";

export default function EmployeeDashboard() {
  const [employeeId, setEmployeeId] = React.useState<string | null>(null);
  const [employeeData, setEmployeeData] = React.useState<any>(null);
  const [activeTab, setActiveTab] = React.useState("overview");
  
  // Daily Punch State Tracking
  const [dailyStatus, setDailyStatus] = React.useState<"NOT_PUNCHED" | "PUNCHED_IN" | "PUNCHED_OUT">("NOT_PUNCHED");
  const [punchState, setPunchState] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [punchMessage, setPunchMessage] = React.useState("");
  
  const [reportText, setReportText] = React.useState("");
  const [assignmentStatus, setAssignmentStatus] = React.useState("IN_PROGRESS");
  
  const [profileData, setProfileData] = React.useState({ name: "", email: "", role: "", picture: "" });
  const [profileState, setProfileState] = React.useState("idle");

  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  React.useEffect(() => {
    const id = localStorage.getItem("krintix_employee_id");
    if (!id) {
      window.location.href = "/login";
      return;
    }
    setEmployeeId(id);
    fetchEmployeeData(id);

    const today = new Date().toDateString();
    const savedStatus = localStorage.getItem(`punch_status_${id}_${today}`);
    if (savedStatus) {
      setDailyStatus(savedStatus as any);
    }
  }, []);

  const fetchEmployeeData = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/employees/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEmployeeData(data);
        setProfileData({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "",
          picture: data.picture || ""
        });
      }
    } catch (error) {
      console.error("Failed to load profile", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("krintix_employee_id");
    localStorage.removeItem("krintix_employee_name");
    window.location.href = "/login";
  };

  const handlePunchIn = async () => {
    setPunchState("loading");
    try {
      const res = await fetch(`${apiUrl}/employees/${employeeId}/attendance/login`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);
      
      setPunchState("success");
      setPunchMessage(`Successfully punched in at ${new Date(data.logged_in_at).toLocaleTimeString()}`);
      
      setDailyStatus("PUNCHED_IN");
      localStorage.setItem(`punch_status_${employeeId}_${new Date().toDateString()}`, "PUNCHED_IN");
      fetchEmployeeData(employeeId!); 
    } catch (err: any) {
      setPunchState("error");
      setPunchMessage(err.message);
      if (err.message.toLowerCase().includes("already logged in")) {
        setDailyStatus("PUNCHED_IN");
        localStorage.setItem(`punch_status_${employeeId}_${new Date().toDateString()}`, "PUNCHED_IN");
      }
    }
  };

  const handlePunchOut = async (e: React.FormEvent) => {
    e.preventDefault();
    setPunchState("loading");
    try {
      const res = await fetch(`${apiUrl}/employees/${employeeId}/attendance/logout`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report: reportText, status: assignmentStatus }) 
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);

      setPunchState("success");
      setPunchMessage(`Punched out! Hours worked today: ${data.hours_worked}`);
      
      setDailyStatus("PUNCHED_OUT");
      localStorage.setItem(`punch_status_${employeeId}_${new Date().toDateString()}`, "PUNCHED_OUT");
      fetchEmployeeData(employeeId!); 
    } catch (err: any) {
      setPunchState("error");
      setPunchMessage(err.message);
      if (err.message.toLowerCase().includes("already logged out")) {
        setDailyStatus("PUNCHED_OUT");
        localStorage.setItem(`punch_status_${employeeId}_${new Date().toDateString()}`, "PUNCHED_OUT");
      }
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileState("loading");
    try {
      const res = await fetch(`${apiUrl}/employees/${employeeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData)
      });
      if (!res.ok) throw new Error("Failed to update profile");
      setProfileState("success");
      setTimeout(() => setProfileState("idle"), 3000);
      fetchEmployeeData(employeeId!);
    } catch (err) {
      setProfileState("error");
    }
  };

  // Google Calendar-style grid generator
  const renderCalendar = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];

    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border-r border-b border-gray-100 bg-gray-50/30 min-h-[120px]"></div>);
    }

    // Days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      
      // Assumes API eventually returns an array of attendance records in employeeData.attendance
      const record = (employeeData?.attendance || []).find((r: any) => r.date === dateStr);

      days.push(
        <div key={i} className="p-2 border-r border-b border-gray-100 min-h-[120px] transition-colors hover:bg-gray-50 flex flex-col group">
          <span className="text-sm font-semibold text-gray-700 mb-1">{i}</span>
          {record && record.report && (
            <div className="mt-1 p-2 bg-blue-50 text-blue-800 text-xs rounded border border-blue-100 leading-tight break-words flex-1 overflow-y-auto custom-scrollbar">
              {record.report}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  if (!employeeData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-blue-600 font-bold text-xl">
        <Activity className="animate-spin w-8 h-8 mr-3"/> Loading...
      </div>
    );
  }

  // --- Strictly API Data Mapping ---
  // Using actual data, or returning empty structures if the arrays are missing
  const totalDays = (employeeData.present || 0) + (employeeData.absent || 0); 
  
  // Concentric Radial Chart Data
  const concentricData = [
    { name: "Present", value: employeeData.present || 0, fill: "#f472b6" },
    { name: "Absent", value: employeeData.absent || 0, fill: "#3b82f6" },
    { name: "Total Record", value: totalDays || 1, fill: "#e5e7eb" }
  ];

  // Bar/Line arrays depend on backend providing an 'attendance' array. 
  // If undefined, graphs safely render empty.
  const apiAttendanceData = employeeData.attendance || []; 
  const lineChartData = apiAttendanceData.map((record: any) => ({
    date: record.date,
    hours: record.hours_worked || 0
  }));
  const barChartData = [
    { name: "Days Present", count: employeeData.present || 0 },
    { name: "Days Absent", count: employeeData.absent || 0 }
  ];

  return (
    <div className="min-h-screen bg-white flex font-sans text-gray-800">
      
      <EmployeeSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* MAIN CONTENT AREA */}
        <div className="p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
          
          {/* TAB 1: OVERVIEW / STATS */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              
              {/* Header Profile Section - Matched to Image */}
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Welcome Back, {employeeData.name.split(' ')[0]}</h1>
                  <p className="text-[15px] text-gray-400 mt-1">Here is the information about your work records</p>
                </div>
                <div className="flex items-center gap-3 pr-4">
                  {profileData.picture ? (
                    <img src={profileData.picture} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      {employeeData.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span className="text-sm font-semibold text-gray-700">{employeeData.name}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Top Stat Cards - Matched to image layout */}
              <div className="grid grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl border border-gray-100 bg-white flex flex-col justify-between h-[140px]">
                  <div className="flex justify-between items-start">
                    <p className="text-[32px] font-bold text-gray-900 leading-none">{employeeData.present}</p>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <img src="/images/d4.png" alt="Present" className="w-6 h-6 object-contain" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[15px] text-gray-500 font-medium">Total Present</p>
                    <p className="text-xs font-semibold text-emerald-500 flex items-center mt-1"><ArrowUpRight className="w-3 h-3 mr-1"/> Active Record</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-gray-100 bg-white flex flex-col justify-between h-[140px]">
                  <div className="flex justify-between items-start">
                    <p className="text-[32px] font-bold text-gray-900 leading-none">{employeeData.absent}</p>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <img src="/images/d2.png" alt="Absent" className="w-6 h-6 object-contain" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[15px] text-gray-500 font-medium">Total Absent</p>
                    <p className="text-xs font-semibold text-red-500 flex items-center mt-1"><ArrowDownRight className="w-3 h-3 mr-1"/> Needs attention</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-gray-100 bg-white flex flex-col justify-between h-[140px]">
                  <div className="flex justify-between items-start">
                    <p className="text-[32px] font-bold text-gray-900 leading-none">{totalDays}</p>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <img src="/images/d3.png" alt="Logged Days" className="w-6 h-6 object-contain" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[15px] text-gray-500 font-medium">Logged Days</p>
                  </div>
                </div>

                {/* Role Box Fixed Formatting */}
                <div className="p-6 rounded-2xl border border-gray-100 bg-white flex flex-col justify-between h-[140px]">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-[20px] font-bold text-gray-900 leading-tight break-words whitespace-normal">{employeeData.role || "N/A"}</p>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <img src="/images/d1.png" alt="Role" className="w-6 h-6 object-contain" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[15px] text-gray-500 font-medium">Current Role</p>
                  </div>
                </div>
              </div>

              {/* Middle Row Charts - Exact layout as reference */}
              <div className="grid lg:grid-cols-12 gap-6">
                
                {/* Line Chart Component */}
                <div className="lg:col-span-8 p-6 rounded-2xl border border-gray-100 bg-white min-h-[350px] flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-[18px] font-bold text-gray-900">Work Hours Analytics</h3>
                    <div className="flex items-center gap-4 text-sm font-medium">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Daily Hours</span>
                      <select className="border border-gray-200 rounded-md px-3 py-1.5 text-gray-600 outline-none text-sm bg-gray-50">
                        <option>Monthly</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-1 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineChartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                        <Tooltip cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }} contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} />
                        <Line type="monotone" dataKey="hours" stroke="#ec4899" strokeWidth={2.5} dot={false} activeDot={{r: 6, fill: '#ec4899', stroke: '#fff', strokeWidth: 2}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Concentric Circle Chart Component */}
                <div className="lg:col-span-4 p-6 rounded-2xl border border-gray-100 bg-white min-h-[350px] flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[18px] font-bold text-gray-900">Attendance Ratio</h3>
                    <button className="text-gray-400 hover:text-gray-600">•••</button>
                  </div>
                  <div className="flex-1 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={280}>
                      <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={16} data={concentricData}>
                        <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                        <Tooltip />
                        <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Bottom Row - Bar Chart & Calendar View */}
              <div className="grid lg:grid-cols-12 gap-6 pb-12">
                
                {/* General Bar Chart strictly from API total present/absent */}
                <div className="lg:col-span-4 p-6 rounded-2xl border border-gray-100 bg-white">
                   <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[18px] font-bold text-gray-900">Summary Distribution</h3>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barChartData} barSize={40}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13}} dy={10} />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} />
                        <Bar dataKey="count" fill="#ec4899" radius={[6, 6, 6, 6]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Google Calendar Style Report Grid */}
                <div className="lg:col-span-8 p-6 rounded-2xl border border-gray-100 bg-white">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[18px] font-bold text-gray-900">Monthly Reports Calendar</h3>
                    <p className="text-sm font-medium text-gray-500">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="border border-gray-100 rounded-xl overflow-hidden">
                    {/* Days Header */}
                    <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 border-r border-gray-100 last:border-0">{day}</div>
                      ))}
                    </div>
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 bg-white">
                      {renderCalendar()}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: PUNCH IN / OUT */}
          {activeTab === "punch" && (
            <div className="max-w-2xl mx-auto animate-in fade-in duration-500 py-12">
              <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Time Tracking</h1>
                <p className="text-gray-500">Record your daily attendance and submit shift reports.</p>
              </div>

              {dailyStatus === "PUNCHED_OUT" && (
                <div className="text-center text-xl font-bold text-gray-800 bg-white py-16 rounded-2xl border border-gray-100 shadow-sm">
                  <CheckCircle2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  You have already punched out
                </div>
              )}

              {dailyStatus === "NOT_PUNCHED" && (
                <div className="p-10 border border-gray-100 shadow-sm bg-white rounded-2xl mb-8 text-center relative overflow-hidden">
                  <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Shift</h2>
                  <p className="text-gray-500 mb-10 max-w-sm mx-auto">Click below to record your exact login time for today.</p>
                  <button 
                    onClick={handlePunchIn} 
                    disabled={punchState === "loading"}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-12 rounded-full transition-all active:scale-95 disabled:opacity-70 text-lg shadow-md shadow-blue-600/20"
                  >
                    {punchState === "loading" ? "Processing..." : "Punch In Now"}
                  </button>
                  
                  {punchMessage && punchState === "error" && (
                    <div className="mt-8 p-4 rounded-xl border font-semibold flex items-center justify-center gap-3 bg-red-50 border-red-100 text-red-600">
                      <StopCircle className="w-5 h-5"/> {punchMessage}
                    </div>
                  )}
                </div>
              )}

              {dailyStatus === "PUNCHED_IN" && (
                <div className="p-10 border border-gray-100 shadow-sm bg-white rounded-2xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">End Shift & Report</h2>
                  <form onSubmit={handlePunchOut} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700">Daily Report</label>
                      <textarea
                        required
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors min-h-[140px]"
                        placeholder="What did you accomplish today?"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700">Task Status</label>
                      <select
                        value={assignmentStatus}
                        onChange={(e) => setAssignmentStatus(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors appearance-none"
                      >
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="ASSIGNED">Assigned (Not Started)</option>
                      </select>
                    </div>
                    <button 
                      type="submit" 
                      disabled={punchState === "loading"}
                      className="w-full bg-white border-2 border-blue-700 text-blue-700 hover:bg-blue-50 font-bold py-3 px-4 rounded-xl transition-all active:scale-95 disabled:opacity-70 mt-4"
                    >
                      {punchState === "loading" ? "Processing..." : "Submit Report & Punch Out"}
                    </button>
                  </form>
                  
                  {punchMessage && punchState === "error" && (
                    <div className="mt-6 p-4 rounded-xl border font-semibold flex items-center justify-center gap-3 bg-red-50 border-red-100 text-red-600">
                      <StopCircle className="w-5 h-5"/> {punchMessage}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE */}
          {activeTab === "profile" && (
            <div className="max-w-2xl mx-auto animate-in fade-in duration-500 py-12">
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                <p className="text-gray-500">Manage your personal information and account settings.</p>
              </div>

              <div className="p-10 border border-gray-100 shadow-sm bg-white rounded-2xl">
                <form onSubmit={handleUpdateProfile} className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-8 pb-8 border-b border-gray-100">
                    <div className="w-24 h-24 rounded-full bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                      {profileData.picture ? (
                        <img src={profileData.picture} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <UserCircle className="w-12 h-12 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 w-full space-y-3">
                      <label className="text-sm font-bold text-gray-700">Profile Picture URL</label>
                      <input
                        type="url"
                        value={profileData.picture}
                        onChange={(e) => setProfileData({...profileData, picture: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700">Full Name</label>
                      <input
                        required
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700">Email Address</label>
                      <input
                        required
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700">Current Role</label>
                    <input
                      type="text"
                      value={profileData.role}
                      onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                      placeholder="e.g. Software Developer"
                    />
                  </div>

                  <div className="pt-6 mt-6 flex items-center gap-6">
                    <button 
                      type="submit" 
                      disabled={profileState === "loading"}
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-70"
                    >
                      {profileState === "loading" ? "Saving..." : "Save Changes"}
                    </button>
                    {profileState === "success" && (
                      <span className="text-emerald-600 font-bold text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5"/> Saved successfully
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
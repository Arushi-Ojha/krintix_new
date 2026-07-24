import React, { useState, useEffect, useMemo } from 'react';
import { AdminSidebar } from "../../../components/HoveringBars/AdminSidebar";

import { cn } from "@/lib/utils";
import { 
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend
} from "recharts";
import { 
  Users, Trash2, X, Mail, MapPin, CheckCircle2, ChevronDown, Activity, UserCircle, AlertCircle, Clock, FileText, Calendar as CalIcon
} from 'lucide-react';

// --- Types mapping to your FastAPI schemas ---
interface Attendance {
  id: number;
  date: string;
  logged_in: string | null;
  logged_out: string | null;
  status: string;
  report: string | null;
}

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string | null;
  picture: string | null;
  present: number;
  absent: number;
  // Updated to match your exact JSON response
  attendance_records: Attendance[]; 
}

interface Contact {
  id: number;
  name: string;
  email: string;
  company: string | null;
  need?: string; 
  details?: string;
  message?: string; 
  created_at: string;
}

interface AdminProfile {
  id: number;
  name: string;
  email: string;
  picture: string | null;
  logged_in: string | null;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Data States
  const [adminData, setAdminData] = useState<AdminProfile | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  
  // Modal & Edit States
  const [selectedEmpId, setSelectedEmpId] = useState<number | null>(null);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  
  const [editFormData, setEditFormData] = useState<Partial<Employee> & { password?: string }>({});
  const [adminEditForm, setAdminEditForm] = useState<Partial<AdminProfile> & { password?: string }>({});

  // Communications State
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState<number[]>([]);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailHistory, setEmailHistory] = useState<any[]>([]);

  // Articles State
  const [articleTopic, setArticleTopic] = useState("");
  const [articleCategory, setArticleCategory] = useState("Architecture");
  const [articleReadMinutes, setArticleReadMinutes] = useState(5);
  const [articleDetail, setArticleDetail] = useState("");
  const [isPublishingArticle, setIsPublishingArticle] = useState(false);

  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingContactId, setMeetingContactId] = useState<number | "">("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingDuration, setMeetingDuration] = useState(30);
  const [isBookingMeeting, setIsBookingMeeting] = useState(false);
  const [meetingHistory, setMeetingHistory] = useState<any[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const adminId = 1; 

  useEffect(() => {
    if (!localStorage.getItem("krintix_admin_logged_in")) {
      window.location.href = "/login";
      return;
    }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [adminRes, empRes, contactRes] = await Promise.all([
        fetch(`${apiUrl}/admin/me/${adminId}`), 
        fetch(`${apiUrl}/admin/employees`),     
        fetch(`${apiUrl}/admin/contacts`)       
      ]);

      if (adminRes.ok) {
        const data = await adminRes.json();
        setAdminData(data);
        setAdminEditForm(data);
      }
      if (empRes.ok) setEmployees(await empRes.json());
      if (contactRes.ok) setContacts(await contactRes.json());

      const emailRes = await fetch(`${apiUrl}/admin/emails`);
      if (emailRes.ok) setEmailHistory(await emailRes.json());

      const meetRes = await fetch(`${apiUrl}/admin/meetings`);
      if (meetRes.ok) setMeetingHistory(await meetRes.json());
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    }
  };

  const selectedEmployee = useMemo(() => employees.find(e => e.id === selectedEmpId), [employees, selectedEmpId]);

  // Extract all reports looking at the correct 'attendance_records' key
  const allReports = useMemo(() => {
    return employees.flatMap(emp => 
      (emp.attendance_records || [])
        .filter(att => att.report)
        .map(att => ({ ...att, employeeName: emp.name, employeePicture: emp.picture, employeeRole: emp.role }))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [employees]);

  const totalPresent = employees.reduce((sum, emp) => sum + (emp.present || 0), 0);
  const totalAbsent = employees.reduce((sum, emp) => sum + (emp.absent || 0), 0);
  const totalLoggedDays = totalPresent + totalAbsent;
  
  const concentricData = [
    { name: "Present", value: totalPresent, fill: "#f472b6" },
    { name: "Absent", value: totalAbsent, fill: "#3b82f6" },
    { name: "Total Record", value: totalLoggedDays || 1, fill: "#e5e7eb" }
  ];

  const barChartData = [
    { name: "Active Employees", count: employees.length },
    { name: "Total Messages", count: contacts.length }
  ];

  // --- Handlers ---
  const handleDeleteEmployee = async (id: number) => {
    if (window.confirm('Are you sure you want to permanently remove this employee?')) {
      try {
        const res = await fetch(`${apiUrl}/admin/employees/${id}`, { method: "DELETE" }); 
        if (res.ok) {
          setEmployees(prev => prev.filter(e => e.id !== id));
          setSelectedEmpId(null);
        }
      } catch (e) {
        alert("Failed to delete employee.");
      }
    }
  };

  const handleSaveEmpDetails = async () => {
    try {
      const payload: any = {
        name: editFormData.name,
        email: editFormData.email,
        role: editFormData.role,
      };
      if (editFormData.password) {
        payload.password = editFormData.password;
      }

      const res = await fetch(`${apiUrl}/admin/employees/${selectedEmpId}`, { 
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const updated = await res.json();
        setEmployees(prev => prev.map(e => e.id === selectedEmpId ? { ...e, ...updated } : e));
        setIsEditingDetails(false);
        setEditFormData(prev => ({ ...prev, password: "" })); 
      }
    } catch (e) {
      alert("Failed to update.");
    }
  };

  const handleSaveAdminProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        name: adminEditForm.name,
        email: adminEditForm.email,
        picture: adminEditForm.picture,
      };
      if (adminEditForm.password) {
        payload.password = adminEditForm.password;
      }

      const res = await fetch(`${apiUrl}/admin/me/${adminId}`, { 
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setAdminData(await res.json());
        alert("Profile updated successfully!");
        setAdminEditForm(prev => ({ ...prev, password: "" })); 
      }
    } catch (e) {
      alert("Failed to update profile.");
    }
  };

  const handleLogout = async () => {
    await fetch(`${apiUrl}/admin/${adminId}/logout`, { method: "POST" }); 
    localStorage.removeItem("krintix_admin_logged_in");
    window.location.href = "/login";
  };

  const handleSendCustomEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedContactIds.length === 0) return alert("Select at least one contact.");
    setIsSendingEmail(true);
    let allSuccess = true;
    try {
      for (const id of selectedContactIds) {
        const res = await fetch(`${apiUrl}/emails/send-custom`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contact_ids: [id], subject: emailSubject, body: emailBody })
        });
        if (!res.ok) allSuccess = false;
      }
      if (allSuccess) {
        alert("Emails sent successfully!");
        setEmailSubject(""); setEmailBody(""); setSelectedContactIds([]);
        fetchAllData(); 
      } else {
        alert("Some or all emails failed to send.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handlePublishArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTopic || !articleDetail) return alert("Please fill the topic and detail fields.");
    setIsPublishingArticle(true);
    try {
      const now = new Date();
      const published_date = now.toISOString().split('T')[0];
      const published_time = now.toTimeString().split(' ')[0];

      const res = await fetch(`${apiUrl}/articles/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          topic: articleTopic, 
          category: articleCategory, 
          detail: articleDetail, 
          read_minutes: articleReadMinutes,
          published_date,
          published_time
        })
      });
      if (res.ok) {
        alert("Article published successfully! Subscribers have been notified.");
        setArticleTopic("");
        setArticleDetail("");
        setArticleReadMinutes(5);
      } else {
        alert("Failed to publish article.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setIsPublishingArticle(false);
    }
  };

  const handleBookMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingContactId || !meetingDate || !meetingTime) return alert("Please fill required meeting fields.");
    setIsBookingMeeting(true);
    try {
      const scheduled_at = new Date(`${meetingDate}T${meetingTime}`).toISOString();
      const payload = {
        contact_id: Number(meetingContactId),
        title: meetingTitle,
        description: meetingDescription || null,
        scheduled_at,
        duration_minutes: meetingDuration
      };
      const res = await fetch(`${apiUrl}/meetings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert("Meeting booked successfully! Check your Google Calendar.");
        setMeetingTitle(""); setMeetingDescription(""); setMeetingDate(""); setMeetingTime("");
        fetchAllData(); 
      } else {
        alert("Failed to book meeting.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setIsBookingMeeting(false);
    }
  };

  const formatTime = (isoString: string | null) => {
    if (!isoString) return "--:--";
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMasterCalendar = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];

    // Map all dates looking at the correct 'attendance_records' key
    const attendanceMap = new Map<string, string[]>();
    employees.forEach(emp => {
      (emp.attendance_records || []).forEach(record => {
        if (!attendanceMap.has(record.date)) attendanceMap.set(record.date, []);
        attendanceMap.get(record.date)!.push(emp.name.split(' ')[0]);
      });
    });

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border-r border-b border-gray-100 bg-gray-50/30 min-h-[100px]"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const activeStaff = attendanceMap.get(dateStr) || [];

      days.push(
        <div key={i} className="p-2 border-r border-b border-gray-100 min-h-[100px] hover:bg-gray-50 flex flex-col transition-colors">
          <span className="text-sm font-semibold text-gray-700 mb-1">{i}</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {activeStaff.slice(0, 3).map((name, idx) => (
              <span key={idx} className="bg-blue-50 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded">{name}</span>
            ))}
            {activeStaff.length > 3 && (
              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded">+{activeStaff.length - 3}</span>
            )}
          </div>
        </div>
      );
    }
    return days;
  };

  if (!adminData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-blue-600 font-bold text-xl">
        <Activity className="animate-spin w-8 h-8 mr-3"/> Loading Workspace...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex font-sans text-gray-800">
      
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <div className="p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
          
          {/* Header Profile Section */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">System Overview</h1>
              <p className="text-[15px] text-gray-400 mt-1 capitalize">{activeTab.replace('_', ' ')} Management</p>
            </div>
            <div className="flex items-center gap-3 pr-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-700">{adminData.name}</p>
                <p className="text-[11px] font-medium text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded flex items-center justify-end gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Logged in: {adminData.logged_in ? new Date(adminData.logged_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                </p>
              </div>
              {adminData.picture ? (
                <img src={adminData.picture} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm ml-2" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold ml-2">
                  {adminData.name.charAt(0)}
                </div>
              )}
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl border border-gray-100 bg-white flex flex-col justify-between h-[140px]">
                  <div className="flex justify-between items-start">
                    <p className="text-[32px] font-bold text-gray-900 leading-none">{employees.length}</p>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center"><Users className="w-5 h-5 text-blue-600" /></div>
                  </div>
                  <p className="text-[15px] text-gray-500 font-medium">Total Registered Staff</p>
                </div>

                <div className="p-6 rounded-2xl border border-gray-100 bg-white flex flex-col justify-between h-[140px]">
                  <div className="flex justify-between items-start">
                    <p className="text-[32px] font-bold text-gray-900 leading-none">{contacts.length}</p>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center"><Mail className="w-5 h-5 text-blue-500" /></div>
                  </div>
                  <p className="text-[15px] text-gray-500 font-medium">Client Messages</p>
                </div>

                <div className="p-6 rounded-2xl border border-gray-100 bg-white flex flex-col justify-between h-[140px]">
                  <div className="flex justify-between items-start">
                    <p className="text-[32px] font-bold text-gray-900 leading-none">{totalLoggedDays}</p>
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                  </div>
                  <p className="text-[15px] text-gray-500 font-medium">Global Logged Days</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-6 pt-4">
                <div className="lg:col-span-8 p-6 rounded-2xl border border-gray-100 bg-white min-h-[350px]">
                  <h3 className="text-[18px] font-bold text-gray-900 mb-6">Platform Distribution</h3>
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

                <div className="lg:col-span-4 p-6 rounded-2xl border border-gray-100 bg-white min-h-[350px] flex flex-col">
                  <h3 className="text-[18px] font-bold text-gray-900 mb-2">Global Attendance Ratio</h3>
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
            </div>
          )}

          {/* TAB 2: EMPLOYEE DETAILS */}
          {activeTab === "employees" && (
            <div className="animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {employees.map(emp => (
                  <div key={emp.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        {emp.picture ? (
                          <img src={emp.picture} alt={emp.name} className="w-14 h-14 rounded-full object-cover border border-gray-100" />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-xl">{emp.name.charAt(0)}</div>
                        )}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{emp.name}</h3>
                          <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md uppercase tracking-wider">ID: {emp.id}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6 flex-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2"><UserCircle className="w-4 h-4 text-gray-400"/> {emp.role || "Unassigned"}</p>
                      <p className="flex items-center gap-2 truncate"><Mail className="w-4 h-4 text-gray-400"/> {emp.email}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-50 flex justify-between gap-3">
                      <button onClick={() => { setSelectedEmpId(emp.id); setEditFormData(emp); setIsEditingDetails(false); }} className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2 rounded-xl transition-colors text-sm">
                        View & Edit Details
                      </button>
                      <button onClick={() => handleDeleteEmployee(emp.id)} className="px-4 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Employee Detail & Edit Modal */}
              {selectedEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:pl-[240px]">
                  <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" onClick={() => setSelectedEmpId(null)} />
                  
                  <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative z-10 animate-in zoom-in-95 duration-300 border border-gray-100">
                    
                    <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
                      <div className="flex items-center gap-5">
                        {selectedEmployee.picture ? (
                          <img src={selectedEmployee.picture} alt="profile" className="w-14 h-14 rounded-full object-cover border border-gray-100" />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-2xl">{selectedEmployee.name.charAt(0)}</div>
                        )}
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md uppercase">ID: {selectedEmployee.id}</span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setSelectedEmpId(null)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-8 custom-scrollbar">
                      
                      {/* Left: Edit Form */}
                      <div className="space-y-5 border-b lg:border-b-0 lg:border-r border-gray-100 pb-8 lg:pb-0 lg:pr-8">
                        <div className="flex justify-between items-center mb-2">
                           <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
                        </div>
                        
                        <div>
                          <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                          <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 mt-1 outline-none focus:border-blue-600" value={editFormData.name || ""} onChange={e => setEditFormData({...editFormData, name: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                          <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 mt-1 outline-none focus:border-blue-600" value={editFormData.email || ""} onChange={e => setEditFormData({...editFormData, email: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-500 uppercase">Role</label>
                          <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 mt-1 outline-none focus:border-blue-600" value={editFormData.role || ""} onChange={e => setEditFormData({...editFormData, role: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-500 uppercase flex justify-between">New Password <span className="text-gray-400 font-normal normal-case">(Leave blank to keep current)</span></label>
                          <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 mt-1 outline-none focus:border-blue-600 placeholder:text-gray-300" value={editFormData.password || ""} onChange={e => setEditFormData({...editFormData, password: e.target.value})} />
                        </div>
                        <button onClick={handleSaveEmpDetails} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-colors mt-2">
                          Save Changes
                        </button>
                      </div>

                      {/* Right: Detailed Attendance Log mapped to attendance_records */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-gray-400"/> Attendance Logs
                        </h3>
                        
                        <div className="space-y-3 pr-2">
                          {(!selectedEmployee.attendance_records || selectedEmployee.attendance_records.length === 0) && (
                            <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-100">
                              <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2"/>
                              <p className="text-sm font-medium text-gray-500">No attendance logs available.</p>
                            </div>
                          )}
                          
                          {[...(selectedEmployee.attendance_records || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((record, idx) => (
                            <div key={idx} className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl flex items-center justify-between">
                              <div>
                                <p className="text-sm font-bold text-gray-900">{record.date}</p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 font-medium">
                                  <span><span className="text-emerald-500">In:</span> {formatTime(record.logged_in)}</span>
                                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                  <span><span className="text-red-400">Out:</span> {formatTime(record.logged_out)}</span>
                                </div>
                              </div>
                              <span className={cn(
                                "text-[10px] px-2 py-1 rounded-md font-bold uppercase",
                                record.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                              )}>
                                {record.status.replace('_', ' ')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ATTENDANCE CALENDAR */}
          {activeTab === "attendance" && (
            <div className="animate-in fade-in duration-500 p-6 rounded-2xl border border-gray-100 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[18px] font-bold text-gray-900">Master Attendance Calendar</h3>
                <p className="text-sm font-medium text-gray-500">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 border-r border-gray-100 last:border-0">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 bg-white">
                  {renderMasterCalendar()}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REPORTS */}
          {activeTab === "reports" && (
            <div className="animate-in fade-in duration-500 space-y-4">
              {allReports.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
                  <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3"/>
                  <p className="text-gray-500 font-medium">No shift reports have been submitted yet.</p>
                </div>
              )}
              {allReports.map((report, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-6">
                   <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                     {report.employeePicture ? (
                       <img src={report.employeePicture} alt="" className="w-full h-full rounded-full object-cover" />
                     ) : (
                       <span className="text-blue-700 font-bold">{report.employeeName.charAt(0)}</span>
                     )}
                   </div>
                   <div className="flex-1">
                     <div className="flex justify-between items-start mb-2">
                       <div>
                         <h4 className="font-bold text-gray-900">{report.employeeName}</h4>
                         <p className="text-xs text-gray-400">{report.employeeRole || "Employee"} • {report.date}</p>
                       </div>
                       <span className={cn(
                          "text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider",
                          report.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                        )}>
                          {report.status.replace('_', ' ')}
                        </span>
                     </div>
                     <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 mt-3">
                       {report.report}
                     </p>
                   </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: CONTACTS */}
          {activeTab === "contacts" && (
            <div className="animate-in fade-in duration-500 space-y-4">
              {contacts.length === 0 && (
                <p className="text-gray-400 font-medium text-center py-10">No messages found.</p>
              )}
              {contacts.map(contact => (
                <div key={contact.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 space-y-1">
                    <h3 className="font-bold text-gray-900 text-lg">{contact.name}</h3>
                    <p className="text-sm font-medium text-blue-700">{contact.email}</p>
                    
                    {contact.company && <p className="text-xs font-semibold text-gray-400 uppercase flex items-center gap-1 mt-3"><MapPin size={12}/> {contact.company}</p>}
                    {contact.need && (
                      <p className="text-xs font-semibold text-gray-500 uppercase mt-2 bg-gray-50 inline-block px-2 py-1 rounded">Need: {contact.need}</p>
                    )}
                  </div>
                  <div className="md:w-2/3 bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message / Details</h4>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {contact.details || contact.message || "No specific details provided."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5.5: COMMUNICATIONS */}
          {activeTab === "communications" && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-[28px] font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="text-blue-600" size={28} /> Communications Center
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Custom Email Blaster */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Mail className="text-blue-600" size={20} /> Email Blast
                  </h3>
                  <form onSubmit={handleSendCustomEmail} className="space-y-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 block mb-2">Select Contacts</label>
                      <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-xl p-3 bg-gray-50 space-y-2 focus-within:border-blue-600">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded">
                          <input type="checkbox" checked={selectedContactIds.length === contacts.length && contacts.length > 0} onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedContactIds(contacts.map(c => c.id));
                            } else {
                              setSelectedContactIds([]);
                            }
                          }} className="w-4 h-4 text-blue-700 rounded border-gray-300 focus:ring-blue-600" />
                          Select All
                        </label>
                        <hr className="border-gray-200 my-1" />
                        {contacts.map(c => (
                          <label key={c.id} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer p-1 hover:bg-gray-100 rounded">
                            <input type="checkbox" checked={selectedContactIds.includes(c.id)} onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedContactIds([...selectedContactIds, c.id]);
                              } else {
                                setSelectedContactIds(selectedContactIds.filter(id => id !== c.id));
                              }
                            }} className="w-4 h-4 text-blue-700 rounded border-gray-300 focus:ring-blue-600" />
                            {c.name} ({c.email})
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 block mb-2">Use a Template (Optional)</label>
                      <select 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600 mb-4"
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "apology") {
                            setEmailSubject("Regarding Your Inquiry with Krintix");
                            setEmailBody("Thank you for reaching out to us. We have carefully reviewed your request. Unfortunately, we are unable to accommodate your inquiry at this time. We sincerely apologize for any inconvenience this may cause and wish you the best in your future endeavors.\n\nBest regards,\nThe Krintix Team");
                          } else if (val === "confirmation") {
                            setEmailSubject("Moving Forward with Krintix");
                            setEmailBody("Thank you for connecting with us! We are glad to move forward with your request. You will receive a meeting link shortly to discuss the next steps in detail. We look forward to speaking with you soon.\n\nBest regards,\nThe Krintix Team");
                          }
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>-- Select a Template --</option>
                        <option value="apology">Apology - Sorry we couldn't accommodate you</option>
                        <option value="confirmation">Confirmation - Glad to move forward</option>
                      </select>
                      
                      <label className="text-sm font-bold text-gray-700 block mb-2">Subject</label>
                      <input type="text" required value={emailSubject} onChange={e => setEmailSubject(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 block mb-2">Message</label>
                      <textarea required rows={5} value={emailBody} onChange={e => setEmailBody(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600" />
                    </div>
                    <button type="submit" disabled={isSendingEmail} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-xl transition-colors disabled:opacity-50">
                      {isSendingEmail ? "Sending..." : "Send Emails"}
                    </button>
                  </form>
                </div>

                {/* Meeting Scheduler */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CalIcon className="text-blue-600" size={20} /> Schedule Meeting
                  </h3>
                  <form onSubmit={handleBookMeeting} className="space-y-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 block mb-2">Select Contact</label>
                      <select required value={meetingContactId} onChange={e => setMeetingContactId(Number(e.target.value))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600">
                        <option value="" disabled>-- Select a Contact --</option>
                        {contacts.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 block mb-2">Meeting Title</label>
                      <input type="text" required value={meetingTitle} onChange={e => setMeetingTitle(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Date</label>
                        <input type="date" required value={meetingDate} onChange={e => setMeetingDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600" />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Time</label>
                        <input type="time" required value={meetingTime} onChange={e => setMeetingTime(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="text-sm font-bold text-gray-700 block mb-2">Duration (Minutes)</label>
                        <input type="number" required min={15} step={15} value={meetingDuration} onChange={e => setMeetingDuration(Number(e.target.value))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 block mb-2">Description (Optional)</label>
                      <textarea rows={2} value={meetingDescription} onChange={e => setMeetingDescription(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600" />
                    </div>
                    <button type="submit" disabled={isBookingMeeting} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-xl transition-colors disabled:opacity-50">
                      {isBookingMeeting ? "Booking..." : "Book Google Meet"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ARTICLES */}
          {activeTab === "articles" && (
            <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FileText className="text-blue-700 w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Publish Article</h2>
                  <p className="text-sm text-gray-500 font-medium">Write a new insight and notify subscribers.</p>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                <form onSubmit={handlePublishArticle} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-bold text-gray-700 block mb-2">Topic / Title</label>
                      <input 
                        type="text" 
                        required
                        value={articleTopic}
                        onChange={e => setArticleTopic(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500" 
                        placeholder="e.g. Scaling Kubernetes..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 block mb-2">Category</label>
                      <input 
                        type="text" 
                        required
                        value={articleCategory}
                        onChange={e => setArticleCategory(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2">Read Time (minutes)</label>
                    <input 
                      type="number" 
                      min="1"
                      required
                      value={articleReadMinutes}
                      onChange={e => setArticleReadMinutes(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2">Article Body (Markdown/HTML)</label>
                    <textarea 
                      required
                      value={articleDetail}
                      onChange={e => setArticleDetail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 min-h-[300px]" 
                      placeholder="Write your article content here..."
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit" 
                      disabled={isPublishingArticle}
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-xl shadow-lg shadow-yellow-400/20 transition-all disabled:opacity-70"
                    >
                      {isPublishingArticle ? "Publishing..." : "Publish & Notify"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 6: PROFILE */}
          {activeTab === "profile" && (
            <div className="max-w-2xl animate-in fade-in duration-500">
              <div className="p-8 border border-gray-100 shadow-sm bg-white rounded-2xl">
                <form onSubmit={handleSaveAdminProfile} className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pb-8 border-b border-gray-100">
                    <div className="w-24 h-24 rounded-full bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                      {adminEditForm.picture ? (
                        <img src={adminEditForm.picture} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <UserCircle className="w-12 h-12 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 w-full space-y-3">
                      <label className="text-sm font-bold text-gray-700">Profile Picture URL</label>
                      <input type="url" value={adminEditForm.picture || ""} onChange={(e) => setAdminEditForm({...adminEditForm, picture: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" placeholder="https://..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700">Full Name</label>
                      <input required type="text" value={adminEditForm.name || ""} onChange={(e) => setAdminEditForm({...adminEditForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700">Email Address</label>
                      <input required type="email" value={adminEditForm.email || ""} onChange={(e) => setAdminEditForm({...adminEditForm, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700 flex justify-between">
                      New Password 
                      <span className="text-gray-400 font-normal">Leave blank to keep current</span>
                    </label>
                    <input type="password" placeholder="••••••••" value={adminEditForm.password || ""} onChange={(e) => setAdminEditForm({...adminEditForm, password: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300" />
                  </div>

                  <div className="pt-4 border-t border-gray-50">
                    <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-xl transition-colors">
                      Save Changes
                    </button>
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
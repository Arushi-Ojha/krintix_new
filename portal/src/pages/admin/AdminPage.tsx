import { AdminSidebar } from "@/components/HoveringBars/AdminSidebar";
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, CheckSquare, Settings, 
  Trash2, X, Edit2, Save, ShieldCheck, ChevronRight, 
  Mail, Calendar as CalIcon, MapPin, AlertCircle
} from 'lucide-react';
import { cn } from "@/lib/utils";

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
  attendance: Attendance[];
  password?: string; 
}

interface Contact {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
}

interface AdminProfile {
  id: number;
  name: string;
  email: string;
  picture: string | null;
  logged_in: string | null;
  password?: string; 
}

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"employees" | "contacts" | "communications" | "profile">("employees");
  
  // Data States
  const [adminData, setAdminData] = useState<AdminProfile>({ id: 1, name: "Loading...", email: "", picture: "", logged_in: null });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  
  // Modal & Edit States
  const [selectedEmpId, setSelectedEmpId] = useState<number | null>(null);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Employee>>({});
  const [adminEditForm, setAdminEditForm] = useState<Partial<AdminProfile>>({});

  // Communications State
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState<number[]>([]);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailHistory, setEmailHistory] = useState<any[]>([]);

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
    setMounted(true);
    if (!localStorage.getItem("krintix_admin_logged_in")) {
      window.location.href = "/login";
      return;
    }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const adminRes = await fetch(`${apiUrl}/admin/me/${adminId}`);
      if (adminRes.ok) setAdminData(await adminRes.json());

      const empRes = await fetch(`${apiUrl}/admin/employees`);
      if (empRes.ok) setEmployees(await empRes.json());

      const contactRes = await fetch(`${apiUrl}/admin/contacts`);
      if (contactRes.ok) setContacts(await contactRes.json());

      const emailRes = await fetch(`${apiUrl}/admin/emails`);
      if (emailRes.ok) setEmailHistory(await emailRes.json());

      const meetRes = await fetch(`${apiUrl}/admin/meetings`);
      if (meetRes.ok) setMeetingHistory(await meetRes.json());
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    }
  };

  const selectedEmployee = useMemo(() => 
    employees.find(e => e.id === selectedEmpId), 
  [employees, selectedEmpId]);

  const handleDeleteEmployee = async (id: number) => {
    if (window.confirm('Are you sure you want to completely remove this employee? This cannot be undone.')) {
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
        present: editFormData.present,
        absent: editFormData.absent
      };
      
      if (editFormData.password && editFormData.password.trim() !== "") {
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
        setEditFormData({ ...updated, password: "" }); 
        alert("Employee updated successfully!");
      } else {
        alert("Failed to update employee details.");
      }
    } catch (e) {
      alert("Network error.");
    }
  };

  const handleSaveAdminProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        name: adminEditForm.name,
        email: adminEditForm.email,
        picture: adminEditForm.picture
      };
      
      if (adminEditForm.password && adminEditForm.password.trim() !== "") {
        payload.password = adminEditForm.password;
      }

      const res = await fetch(`${apiUrl}/admin/me/${adminId}`, { 
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setAdminData(await res.json());
        setAdminEditForm({...adminEditForm, password: ""}); 
        alert("Admin profile & credentials updated!");
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
    try {
      const res = await fetch(`${apiUrl}/emails/send-custom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact_ids: selectedContactIds, subject: emailSubject, body: emailBody })
      });
      if (res.ok) {
        alert("Emails sent successfully!");
        setEmailSubject(""); setEmailBody(""); setSelectedContactIds([]);
        fetchAllData(); 
      } else {
        alert("Failed to send emails.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setIsSendingEmail(false);
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

  const openModal = (emp: Employee) => {
    setSelectedEmpId(emp.id);
    setEditFormData({ ...emp, password: "" }); 
    setIsEditingDetails(false);
  };

  // --- SAFE CALENDAR LOGIC ---
  // The signature now explicitly defaults to an empty array if undefined is passed
  const renderCalendar = (attendanceRecords: Attendance[] = []) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Bulletproof fallback: ensuring we always map over an array
    const presentDates = new Set((attendanceRecords || []).map(record => record.date));

    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => <div key={`blank-${i}`} className="aspect-square"></div>);
    
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const dateNum = i + 1;
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(dateNum).padStart(2, '0')}`;
      const isPresent = presentDates.has(dateString);
      
      return (
        <div 
          key={dateNum} 
          className={cn(
            "aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all border",
            isPresent 
              ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30 ring-2 ring-yellow-400 ring-offset-1" 
              : "bg-white text-slate-400 border-slate-100"
          )}
        >
          {dateNum}
        </div>
      );
    });

    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-blue-950 flex items-center gap-2"><CalIcon size={16} className="text-yellow-500"/> Current Month Activity</h4>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-slate-400 mb-2 tracking-widest uppercase">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {blanks}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      
      <AdminSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="flex-1 pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Header */}
          <header className="mb-10 flex flex-col xl:flex-row xl:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-blue-900/40 uppercase tracking-widest mb-2">
                <span>System</span> <ChevronRight size={14} /> 
                <span className="text-blue-600">
                  {activeTab === "employees" ? "Team Directory" : activeTab === "contacts" ? "Client Messages" : activeTab === "communications" ? "Communications" : "Admin Profile"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-blue-950">
                Command Center
              </h1>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5 min-w-[300px]">
              <div className="relative">
                {adminData.picture ? (
                  <img src={adminData.picture} alt="Admin" className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-black border-2 border-blue-100">
                    {adminData.name.charAt(0)}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 p-1 rounded-full border-2 border-white">
                  <ShieldCheck size={10} className="text-blue-950" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-blue-950 text-sm">{adminData.name}</h2>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>
                  Active Session
                </div>
              </div>
            </div>
          </header>

          {/* Layer 2: Employees Section */}
          {activeTab === "employees" && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-blue-950 flex items-center gap-2">
                  <Users className="text-yellow-500" size={24} /> Active Employees
                </h2>
                <div className="bg-yellow-400 text-blue-950 px-4 py-1.5 rounded-full text-xs font-black shadow-sm">
                  {employees.length} Members
                </div>
              </div>

              {/* Employee Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map(emp => {
                  const totalDays = emp.present + emp.absent;
                  const attendancePercentage = totalDays === 0 ? 0 : Math.round((emp.present / totalDays) * 100);
                  
                  return (
                    <div 
                      key={emp.id} 
                      onClick={() => openModal(emp)}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 cursor-pointer group flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-4">
                        {emp.picture ? (
                          <img src={emp.picture} alt={emp.name} className="w-14 h-14 rounded-full object-cover group-hover:ring-2 ring-yellow-400 ring-offset-2 transition-all" />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xl group-hover:ring-2 ring-yellow-400 ring-offset-2 transition-all">{emp.name.charAt(0)}</div>
                        )}
                        <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-md">ID: {emp.id}</span>
                      </div>
                      
                      <h3 className="text-lg font-black text-blue-950 mb-1 group-hover:text-blue-600 transition-colors">{emp.name}</h3>
                      <p className="text-xs font-bold text-slate-400 mb-6 flex-1 uppercase tracking-wider">{emp.role || "Unassigned"}</p>
                      
                      <div className="w-full space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-500">Attendance Ratio</span>
                          <span className={attendancePercentage < 50 ? 'text-red-500' : 'text-blue-600'}>{attendancePercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-yellow-400 h-full rounded-full transition-all duration-1000" style={{ width: `${attendancePercentage}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Layer 3: Contacts / Messages */}
          {activeTab === "contacts" && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-black text-blue-950 flex items-center gap-2 mb-6">
                <Mail className="text-yellow-500" size={24} /> Inbox
              </h2>
              <div className="space-y-4">
                {contacts.length === 0 && <p className="text-slate-400 font-bold">No messages found.</p>}
                {contacts.map(contact => (
                  <div key={contact.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 hover:shadow-md transition-all">
                    <div className="md:w-1/3 space-y-1">
                      <h3 className="font-black text-blue-950">{contact.name}</h3>
                      <p className="text-sm font-bold text-blue-600">{contact.email}</p>
                      {contact.company && <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mt-2"><MapPin size={12}/> {contact.company}</p>}
                    </div>
                    <div className="md:w-2/3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">{contact.message}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-4 text-right">{new Date(contact.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Layer 4: Admin Profile */}
          {activeTab === "profile" && (
            <div className="animate-in fade-in duration-300 max-w-2xl">
              <h2 className="text-xl font-black text-blue-950 flex items-center gap-2 mb-6">
                <Settings className="text-yellow-500" size={24} /> Security & Profile
              </h2>
              <form onSubmit={handleSaveAdminProfile} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Admin Full Name</label>
                  <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-bold focus:ring-2 focus:ring-yellow-400 focus:outline-none" 
                    value={adminEditForm.name ?? adminData.name} 
                    onChange={e => setAdminEditForm({...adminEditForm, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Admin Email Address</label>
                  <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-bold focus:ring-2 focus:ring-yellow-400 focus:outline-none" 
                    value={adminEditForm.email ?? adminData.email} 
                    onChange={e => setAdminEditForm({...adminEditForm, email: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Profile Picture URL</label>
                  <input type="url" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-bold focus:ring-2 focus:ring-yellow-400 focus:outline-none" 
                    value={adminEditForm.picture ?? adminData.picture ?? ""} 
                    onChange={e => setAdminEditForm({...adminEditForm, picture: e.target.value})} 
                  />
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Change Admin Password</label>
                  <input type="text" placeholder="Enter new password to change..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-bold focus:ring-2 focus:ring-yellow-400 focus:outline-none" 
                    value={adminEditForm.password ?? ""} 
                    onChange={e => setAdminEditForm({...adminEditForm, password: e.target.value})} 
                  />
                  <p className="text-xs text-slate-400 font-bold mt-2">Leave blank to keep current password.</p>
                </div>
                <div className="pt-4">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-8 rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition-all">
                    Update Security Details
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Layer 5: Communications Section */}
          {activeTab === "communications" && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-black text-blue-950 flex items-center gap-2 mb-6">
                <FileText className="text-yellow-500" size={24} /> Communications Center
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Custom Email Blaster */}
                <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-slate-100">
                  <h3 className="text-lg font-black text-blue-950 mb-6 flex items-center gap-2">
                    <Mail className="text-blue-500" size={20} /> Email Blast
                  </h3>
                  <form onSubmit={handleSendCustomEmail} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Select Contacts</label>
                      <select 
                        multiple 
                        value={selectedContactIds.map(String)} 
                        onChange={e => setSelectedContactIds(Array.from(e.target.selectedOptions, option => Number(option.value)))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-medium focus:ring-2 focus:ring-yellow-400 focus:outline-none min-h-[120px] custom-scrollbar"
                      >
                        {contacts.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                        ))}
                      </select>
                      <p className="text-xs text-slate-400 mt-1">Hold Ctrl/Cmd to select multiple.</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Subject</label>
                      <input type="text" required value={emailSubject} onChange={e => setEmailSubject(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-bold focus:ring-2 focus:ring-yellow-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Message</label>
                      <textarea required rows={5} value={emailBody} onChange={e => setEmailBody(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-medium focus:ring-2 focus:ring-yellow-400 focus:outline-none custom-scrollbar" />
                    </div>
                    <button type="submit" disabled={isSendingEmail} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                      {isSendingEmail ? "Sending..." : "Send Emails"}
                    </button>
                  </form>
                </div>

                {/* Meeting Scheduler */}
                <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-slate-100">
                  <h3 className="text-lg font-black text-blue-950 mb-6 flex items-center gap-2">
                    <CalIcon className="text-green-500" size={20} /> Schedule Meeting
                  </h3>
                  <form onSubmit={handleBookMeeting} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Select Contact</label>
                      <select required value={meetingContactId} onChange={e => setMeetingContactId(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-bold focus:ring-2 focus:ring-yellow-400 focus:outline-none">
                        <option value="" disabled>-- Select a Contact --</option>
                        {contacts.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Meeting Title</label>
                      <input type="text" required value={meetingTitle} onChange={e => setMeetingTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-bold focus:ring-2 focus:ring-yellow-400 focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Date</label>
                        <input type="date" required value={meetingDate} onChange={e => setMeetingDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-bold focus:ring-2 focus:ring-yellow-400 focus:outline-none" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Time</label>
                        <input type="time" required value={meetingTime} onChange={e => setMeetingTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-bold focus:ring-2 focus:ring-yellow-400 focus:outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Duration (Minutes)</label>
                        <input type="number" required min={15} step={15} value={meetingDuration} onChange={e => setMeetingDuration(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-bold focus:ring-2 focus:ring-yellow-400 focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Description (Optional)</label>
                      <textarea rows={2} value={meetingDescription} onChange={e => setMeetingDescription(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-blue-950 font-medium focus:ring-2 focus:ring-yellow-400 focus:outline-none custom-scrollbar" />
                    </div>
                    <button type="submit" disabled={isBookingMeeting} className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                      {isBookingMeeting ? "Booking..." : "Book Google Meet"}
                    </button>
                  </form>
                </div>
              </div>

              {/* History Lists */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Email History */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 max-h-[400px] overflow-y-auto custom-scrollbar">
                  <h4 className="text-sm font-black text-blue-950 mb-4 uppercase tracking-widest sticky top-0 bg-white py-2">Recent Emails</h4>
                  <div className="space-y-3">
                    {emailHistory.length === 0 ? (
                      <p className="text-sm text-slate-400">No emails sent yet.</p>
                    ) : (
                      emailHistory.map(email => (
                        <div key={email.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-xs font-bold text-blue-600 mb-1">{email.recipient_email}</p>
                          <p className="text-sm font-bold text-blue-950 truncate">{email.subject}</p>
                          <p className="text-xs text-slate-500 mt-2">{new Date(email.sent_at).toLocaleString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Meeting History */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 max-h-[400px] overflow-y-auto custom-scrollbar">
                  <h4 className="text-sm font-black text-blue-950 mb-4 uppercase tracking-widest sticky top-0 bg-white py-2">Upcoming Meetings</h4>
                  <div className="space-y-3">
                    {meetingHistory.length === 0 ? (
                      <p className="text-sm text-slate-400">No meetings booked yet.</p>
                    ) : (
                      meetingHistory.map(meet => (
                        <div key={meet.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-bold text-blue-950">{meet.title}</p>
                            <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{meet.duration_minutes} min</span>
                          </div>
                          <p className="text-xs font-medium text-slate-500 mb-3">{new Date(meet.scheduled_at).toLocaleString()}</p>
                          {meet.meeting_link && (
                            <a href={meet.meeting_link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                              <CalIcon size={12} /> Join Meeting
                            </a>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Employee Detail Modal Overlay */}
          {selectedEmployee && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:pl-72">
              <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" onClick={() => setSelectedEmpId(null)} />
              
              <div className="bg-slate-50 rounded-[32px] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col relative z-10 animate-in zoom-in-95 duration-300 border border-white">
                
                {/* Modal Header */}
                <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-20">
                  <div className="flex items-center gap-5">
                    {selectedEmployee.picture ? (
                      <img src={selectedEmployee.picture} alt="profile" className="w-16 h-16 rounded-full object-cover ring-2 ring-yellow-400 ring-offset-2" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-2xl ring-2 ring-yellow-400 ring-offset-2">{selectedEmployee.name.charAt(0)}</div>
                    )}
                    <div>
                      <h2 className="text-2xl font-black text-blue-950">{selectedEmployee.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">ID: {selectedEmployee.id}</span>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{selectedEmployee.role || "Unassigned"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDeleteEmployee(selectedEmployee.id)} className="p-3 text-slate-400 hover:text-white hover:bg-red-500 rounded-xl transition-all shadow-sm" title="Fire Employee">
                      <Trash2 size={20} />
                    </button>
                    <button onClick={() => setSelectedEmpId(null)} className="p-3 bg-slate-100 text-blue-950 hover:bg-slate-200 rounded-xl transition-all shadow-sm">
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Left Column: Details & Calendar */}
                  <div className="space-y-6">
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                      <div className="flex justify-between items-center mb-5">
                        <h3 className="font-black text-blue-950 flex items-center gap-2"><Settings size={18} className="text-yellow-500"/> Core Administration</h3>
                        {!isEditingDetails ? (
                          <button onClick={() => setIsEditingDetails(true)} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-100"><Edit2 size={12}/> Edit</button>
                        ) : (
                          <button onClick={handleSaveEmpDetails} className="text-xs font-bold text-black bg-yellow-400 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-yellow-500"><Save size={12}/> Save</button>
                        )}
                      </div>
                      
                      {isEditingDetails ? (
                        <div className="space-y-4 animate-in fade-in">
                          <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</label><input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-blue-950 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none" value={editFormData.name || ""} onChange={e => setEditFormData({...editFormData, name: e.target.value})} /></div>
                          <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</label><input type="email" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-blue-950 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none" value={editFormData.email || ""} onChange={e => setEditFormData({...editFormData, email: e.target.value})} /></div>
                          <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</label><input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-blue-950 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none" value={editFormData.role || ""} onChange={e => setEditFormData({...editFormData, role: e.target.value})} /></div>
                          
                          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mt-2">
                             <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Days Present</label><input type="number" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-blue-950 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none" value={editFormData.present ?? 0} onChange={e => setEditFormData({...editFormData, present: parseInt(e.target.value)})} /></div>
                             <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Days Absent</label><input type="number" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold text-blue-950 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none" value={editFormData.absent ?? 0} onChange={e => setEditFormData({...editFormData, absent: parseInt(e.target.value)})} /></div>
                          </div>

                          <div className="pt-4 border-t border-slate-100 mt-2">
                             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-red-500">Force Password Reset</label>
                             <input type="text" placeholder="Enter new password..." className="w-full bg-red-50 border border-red-100 p-3 rounded-xl text-sm font-bold text-red-700 mt-1 focus:ring-2 focus:ring-red-400 outline-none placeholder:text-red-300" value={editFormData.password || ""} onChange={e => setEditFormData({...editFormData, password: e.target.value})} />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 text-sm animate-in fade-in">
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100"><span className="font-bold text-slate-400 text-xs uppercase tracking-widest">Email</span> <span className="font-black text-blue-950">{selectedEmployee.email}</span></div>
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100"><span className="font-bold text-slate-400 text-xs uppercase tracking-widest">Role</span> <span className="font-black text-blue-950">{selectedEmployee.role || "N/A"}</span></div>
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100"><span className="font-bold text-slate-400 text-xs uppercase tracking-widest">Total Days Recorded</span> <span className="font-black text-blue-950">{selectedEmployee.present + selectedEmployee.absent}</span></div>
                        </div>
                      )}
                    </section>

                    {/* Visual Calendar Widget */}
                    {renderCalendar(selectedEmployee.attendance)}
                  </div>

                  {/* Right Column: Attendance Records */}
                  <div className="space-y-6">
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
                      <h3 className="font-black text-blue-950 flex items-center gap-2 mb-5">
                        <CheckSquare size={18} className="text-yellow-500"/> Recent Daily Reports
                      </h3>
                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {(!selectedEmployee.attendance || selectedEmployee.attendance.length === 0) && (
                          <div className="bg-slate-50 p-6 rounded-xl text-center border border-slate-100">
                            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2"/>
                            <p className="text-sm font-bold text-slate-400">No shift reports submitted yet.</p>
                          </div>
                        )}
                        {(selectedEmployee.attendance || []).slice().reverse().map(record => (
                          <div key={record.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-2 gap-4">
                              <p className="text-xs font-black text-blue-950">{new Date(record.date).toDateString()}</p>
                              <span className={cn(
                                "shrink-0 text-[9px] px-2 py-1 rounded-md font-black uppercase tracking-widest",
                                record.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                                record.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700' : 
                                'bg-slate-200 text-slate-600'
                              )}>
                                {record.status.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 font-medium line-clamp-2 mt-2 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                              {record.report || "No report provided."}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
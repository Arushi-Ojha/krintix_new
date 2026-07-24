import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/HoveringBars/Footer";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

export default function Login() {
  const [loginType, setLoginType] = React.useState<"employee" | "admin">("employee");
  
  const [formState, setFormState] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    const endpoint = loginType === "employee" ? "/auth/login" : "/admin/login"; 

    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Invalid credentials");
      }

      setFormState("success");
      
      if (loginType === "employee") {
        localStorage.setItem("krintix_employee_id", data.employee_id);
        localStorage.setItem("krintix_employee_name", data.name);
        setTimeout(() => { window.location.href = "/dashboard"; }, 1500);
      } else {
        localStorage.setItem("krintix_admin_logged_in", "true");
        setTimeout(() => { window.location.href = "/admin/dashboard"; }, 1500); 
      }
      
    } catch (error: any) {
      setFormState("error");
      setErrorMessage(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrorMessage("Please enter your email to reset your password.");
      setFormState("error");
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    try {
      await fetch(`${apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      alert("If your email is registered, a new password has been sent.");
    } catch (error) {
      alert("Failed to request password reset.");
    }
  };

  return (
    <>
      {/* 
        h-screen and overflow-hidden lock the layout to the viewport, 
        preventing the entire page from scrolling 
      */}
      <main className="h-screen bg-white flex font-sans overflow-hidden">
        
        {/* 
          LEFT SIDE: Fixed, no scrollbar.
          Using flex items-center and pt-28 ensures it is centered but clears the navbar. 
        */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-16 pt-28 lg:pt-32 relative z-10">
          <div className="w-full max-w-[440px]">
            
            {formState === "success" ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                <div className="w-20 h-20 bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-950/20">
                  <CheckCircle2 className="w-10 h-10 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-black text-blue-950 mb-2">Login Successful</h2>
                <p className="text-gray-500 font-medium">Redirecting to your dashboard...</p>
              </motion.div>
            ) : (
              <>
                <div className="flex gap-8 mb-10 border-b border-gray-200">
                  <button 
                    type="button"
                    onClick={() => { setLoginType("employee"); setFormState("idle"); setErrorMessage(""); }}
                    className={cn(
                      "text-[17px] font-black pb-3 border-b-[3px] transition-all -mb-[1.5px]", 
                      loginType === "employee" 
                        ? "border-blue-950 text-blue-950" 
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    )}
                  >
                    Employee
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setLoginType("admin"); setFormState("idle"); setErrorMessage(""); }}
                    className={cn(
                      "text-[17px] font-black pb-3 border-b-[3px] transition-all -mb-[1.5px]", 
                      loginType === "admin" 
                        ? "border-blue-950 text-blue-950" 
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    )}
                  >
                    Administrator
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[15px] font-black text-black mb-2">Email address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-950/20 focus:border-blue-950 transition-colors text-black font-medium placeholder:text-gray-300 placeholder:font-normal"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-[15px] font-black text-black mb-2">Password</label>
                    <input
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-950/20 focus:border-blue-950 transition-colors text-black font-medium placeholder:text-gray-300 placeholder:font-normal tracking-widest"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2 mb-8">
                    <div className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-blue-950 focus:ring-blue-950 cursor-pointer" 
                      />
                      <span className="text-[13px] font-bold text-gray-600 group-hover:text-black transition-colors">
                        Keep me signed in
                      </span>
                    </div>
                    {loginType === "employee" && (
                      <button 
                        type="button" 
                        onClick={handleForgotPassword} 
                        className="text-[13px] font-black text-black hover:text-blue-950 transition-colors underline decoration-2 underline-offset-4"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>

                  {formState === "error" && (
                    <div className="bg-black text-yellow-400 text-sm font-bold p-4 rounded-xl text-center shadow-lg shadow-black/10">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-[17px] font-black py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center mt-2 shadow-sm"
                  >
                    {formState === "submitting" ? (
                      <span className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                {loginType === "employee" && (
                  <p className="text-[15px] font-medium text-center text-gray-500 mt-10">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-950 font-black hover:text-blue-800 transition-colors">
                      Sign Up
                    </Link>
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Constrained Background Video */}
        <div 
          className="hidden md:block w-1/2 relative bg-blue-950 overflow-hidden shadow-inner"
          style={{ transform: "translateZ(0)" }}
        >
          <BackgroundVideo />
        </div>

      </main>
      <Footer />
    </>
  );
}
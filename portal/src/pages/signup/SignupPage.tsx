import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/HoveringBars/Navbar";
import { Footer } from "@/components/HoveringBars/Footer";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

export default function Signup() {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [formState, setFormState] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirm_password: "",
    otp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setErrorMessage("Passwords do not match.");
      setFormState("error");
      return;
    }

    setFormState("submitting");
    setErrorMessage("");
    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    try {
      const response = await fetch(`${apiUrl}/auth/signup/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirm_password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to request OTP");
      }

      setFormState("idle");
      setStep(2); 
    } catch (error: any) {
      setFormState("error");
      setErrorMessage(error.message);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");
    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    try {
      const response = await fetch(`${apiUrl}/auth/signup/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Invalid OTP");
      }

      setFormState("success");
    } catch (error: any) {
      setFormState("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="h-screen bg-white flex font-sans overflow-hidden">
        
        {/* Fixed, centered left side, no scrollbar */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-16 pt-28 lg:pt-32 relative z-10">
          <div className="w-full max-w-[440px]">
            
            {formState === "success" ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                <div className="w-20 h-20 bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-950/20">
                  <ShieldCheck className="w-10 h-10 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-black text-blue-950 mb-2">Account Created!</h2>
                <p className="text-gray-500 font-medium mb-8">Your registration is complete and verified.</p>
                <Link 
                  to="/login" 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-[17px] font-black py-4 px-12 rounded-xl transition-all active:scale-[0.98] shadow-sm inline-block"
                >
                  Go to Login
                </Link>
              </motion.div>
            ) : step === 1 ? (
              <>
                <div className="mb-10">
                  <h1 className="text-[32px] font-black text-blue-950 tracking-tight mb-2">
                    Join Krintix.
                  </h1>
                  <p className="text-[15px] font-medium text-gray-500">
                    Create your employee profile today.
                  </p>
                </div>

                <form onSubmit={handleRequestOTP} className="space-y-5">
                  <div>
                    <label className="block text-[14px] font-black text-black mb-2 uppercase tracking-wider">Email address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-950/20 focus:border-blue-950 transition-colors text-black font-medium placeholder:text-gray-300 placeholder:font-normal"
                      placeholder="employee@krintix.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-black text-black mb-2 uppercase tracking-wider">Password</label>
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

                  <div>
                    <label className="block text-[14px] font-black text-black mb-2 uppercase tracking-wider">Confirm Password</label>
                    <input
                      required
                      type="password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-950/20 focus:border-blue-950 transition-colors text-black font-medium placeholder:text-gray-300 placeholder:font-normal tracking-widest"
                      placeholder="••••••••"
                    />
                  </div>

                  {formState === "error" && (
                    <div className="bg-black text-yellow-400 text-sm font-bold p-4 rounded-xl text-center shadow-lg shadow-black/10 mt-4">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-[17px] font-black py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center mt-6 shadow-sm"
                  >
                    {formState === "submitting" ? (
                      <span className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      "Send Verification OTP"
                    )}
                  </button>
                </form>

                <p className="text-[15px] font-medium text-center text-gray-500 mt-10">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-950 font-black hover:text-blue-800 transition-colors">
                    Log In
                  </Link>
                </p>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="mb-10 text-center">
                  <h1 className="text-[28px] font-black text-blue-950 tracking-tight mb-3">
                    Check your email
                  </h1>
                  <p className="text-[15px] font-medium text-gray-500">
                    We've sent a 6-digit verification code to <br/>
                    <strong className="text-black">{formData.email}</strong>
                  </p>
                </div>

                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div>
                    <label className="block text-[14px] font-black text-black mb-3 text-center uppercase tracking-wider">
                      Enter Security Code
                    </label>
                    <input
                      required
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      maxLength={6}
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-950/20 focus:border-blue-950 transition-colors text-black font-black text-2xl text-center tracking-[1em] placeholder:text-gray-200 placeholder:font-normal placeholder:tracking-normal"
                      placeholder="123456"
                    />
                  </div>

                  {formState === "error" && (
                    <div className="bg-black text-yellow-400 text-sm font-bold p-4 rounded-xl text-center shadow-lg shadow-black/10">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full bg-blue-950 hover:bg-blue-900 text-white text-[17px] font-black py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center mt-2 shadow-sm"
                  >
                    {formState === "submitting" ? (
                      <span className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Verify & Create Account"
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[14px] font-bold text-gray-400 hover:text-black transition-colors w-full mt-6"
                  >
                    ← Use a different email
                  </button>
                </form>
              </motion.div>
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
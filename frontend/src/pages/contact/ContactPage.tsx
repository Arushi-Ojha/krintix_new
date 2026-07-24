import * as React from "react";
import { Navbar } from "@/components/HoveringBars/Navbar";
import { Footer } from "@/components/HoveringBars/Footer";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Mail, Clock, MapPin, Send, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  
  // 1. Setup controlled state matching your backend schema
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    budget: "",
    need: "Cloud Cost Optimization", // Default selected value
    details: "",
  });

  // 2. Handle input changes dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Connect to the backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Fetch API URL from .env, fallback to localhost if missing
    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    try {
      const response = await fetch(`${apiUrl}/contacts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      setFormState("success");
      // Optional: Reset form fields after success
      setFormData({
        name: "",
        email: "",
        budget: "",
        need: "Cloud Cost Optimization",
        details: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setFormState("error");
      alert("Something went wrong. Please try again."); // Simple error fallback
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Let's optimize your <span className="text-yellow-400">Future.</span>
              </h1>
              <p className="text-xl text-white/80 mb-12">
                Whether you're looking for a cloud audit, AI automation, or technical leadership, we're here to help.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-indigo/10 rounded flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-brand-indigo" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Direct Outreach</h3>
                    <p className="text-white/70">hello@krintix.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-cyan/10 rounded flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Response Time</h3>
                    <p className="text-white/70">Typically within 24 business hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-emerald/10 rounded flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Bangalore Hub</h3>
                    <p className="text-white/70">Indiranagar, Bangalore, Karnataka, India.</p>
                  </div>
                </div>
              </div>
            </div>



            <Card className="p-8 lg:p-12 border-brand-indigo/20 glow">
              {formState === "success" ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-brand-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-brand-emerald" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">Request Received!</h2>
                  <p className="text-text-secondary mb-8">
                    An optimization expert will review your information and reach out shortly.
                  </p>
                  <Button variant="secondary" onClick={() => setFormState("idle")}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-tertiary uppercase">Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-surface-2 border border-border-brand rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-tertiary uppercase">Email</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-surface-2 border border-border-brand rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-tertiary uppercase">Budget (Monthly)</label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-surface-2 border border-border-brand rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
                      placeholder="e.g. $5000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-tertiary uppercase">Primary Need</label>
                    <select 
                      name="need"
                      value={formData.need}
                      onChange={handleChange}
                      className="w-full bg-surface-2 border border-border-brand rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
                    >
                      {/* Styled options for dark background / white text */}
                      <option className="bg-[#1a1a2e] text-white" value="Cloud Cost Optimization">Cloud Cost Optimization</option>
                      <option className="bg-[#1a1a2e] text-white" value="AI Automation / LLM">AI Automation / LLM</option>
                      <option className="bg-[#1a1a2e] text-white" value="Internal Tools Development">Internal Tools Development</option>
                      <option className="bg-[#1a1a2e] text-white" value="Technical Fractional CTO">Technical Fractional CTO</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-tertiary uppercase">How can we help?</label>
                    <textarea
                      rows={4}
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      className="w-full bg-surface-2 border border-border-brand rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
                      placeholder="Tell us about your current challenges..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    isLoading={formState === "submitting"}
                    icon={Send}
                  >
                    Request Free Audit
                  </Button>
                  <p className="text-[10px] text-center text-text-tertiary mt-4">
                    By submitting, you agree to our Privacy Policy and consent to us contacting you about your request.
                  </p>
                </form>
              )}
            </Card>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
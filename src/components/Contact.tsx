"use client";

import React, { useState } from "react";
import { Send, Mail, ShieldAlert, CheckCircle, RefreshCw } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Required fields are missing: NAME, EMAIL, or MESSAGE.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to transmit secure package.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Connection refused. Firewall or network anomaly.");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Glowing background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#ff5353]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
            CONTACT <span className="text-[#ff5353]">ME</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#ff5353] mt-2" />
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
          
          {/* Info & Handles */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Get In Touch
              </h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                Whether you're looking to recruit an aspiring SecOps Engineer for internships, discuss malware analysis, or collaborate on SIEM detection playbooks, feel free to send a secure message or reach out via social channels.
              </p>
            </div>

            {/* Channels lists */}
            <div className="space-y-4 font-sans text-xs">
              <a
                href="mailto:sridharsri5959@gmail.com"
                className="flex items-center gap-3 p-4 border border-neutral-900 bg-neutral-950/20 rounded-xl hover:border-[#ff5353]/30 transition-all duration-300 group"
              >
                <div className="p-2 border border-neutral-900 rounded-lg bg-neutral-950/60 text-[#ff5353] group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">EMAIL ENDPOINT</div>
                  <div className="text-neutral-300 font-bold group-hover:text-white transition-colors">sridharsri5959@gmail.com</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/sridhar-konda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border border-neutral-900 bg-neutral-950/20 rounded-xl hover:border-[#ff5353]/30 transition-all duration-300 group"
              >
                <div className="p-2 border border-neutral-900 rounded-lg bg-neutral-950/60 text-[#ff5353] group-hover:scale-105 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">LINKEDIN PROFILE</div>
                  <div className="text-neutral-300 font-bold group-hover:text-white transition-colors">konda-sridhar</div>
                </div>
              </a>

              <a
                href="https://github.com/Sridharsri67"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border border-neutral-900 bg-neutral-950/20 rounded-xl hover:border-[#ff5353]/30 transition-all duration-300 group"
              >
                <div className="p-2 border border-neutral-900 rounded-lg bg-neutral-950/60 text-[#ff5353] group-hover:scale-105 transition-transform">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">GITHUB REPOSITORIES</div>
                  <div className="text-slate-300 font-bold group-hover:text-white transition-colors">Sridharsri67</div>
                </div>
              </a>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-3">
            <div className="p-6 md:p-8 rounded-xl border border-neutral-900 bg-neutral-950/30 shadow-2xl relative">
              
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Inputs layout row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 font-sans text-[10px]">
                    <label htmlFor="name" className="text-neutral-500 font-bold uppercase tracking-wider">NAME / SENDER*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full px-3 py-2.5 bg-black/60 border border-neutral-900 rounded-lg outline-none text-neutral-200 focus:border-[#ff5353] transition-colors placeholder:text-neutral-700 text-xs"
                      placeholder="e.g. Recruiter Name"
                    />
                  </div>

                  <div className="space-y-1.5 font-sans text-[10px]">
                    <label htmlFor="email" className="text-neutral-500 font-bold uppercase tracking-wider">EMAIL / ENDPOINT*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full px-3 py-2.5 bg-black/60 border border-neutral-900 rounded-lg outline-none text-neutral-200 focus:border-[#ff5353] transition-colors placeholder:text-neutral-700 text-xs"
                      placeholder="e.g. sender@company.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5 font-sans text-[10px]">
                  <label htmlFor="subject" className="text-neutral-500 font-bold uppercase tracking-wider">SUBJECT / HEADER</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="w-full px-3 py-2.5 bg-black/60 border border-neutral-900 rounded-lg outline-none text-neutral-200 focus:border-[#ff5353] transition-colors placeholder:text-neutral-700 text-xs"
                    placeholder="e.g. SecOps Internship Inquiry"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5 font-sans text-[10px]">
                  <label htmlFor="message" className="text-neutral-500 font-bold uppercase tracking-wider">MESSAGE PAYLOAD*</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="w-full px-3 py-2.5 bg-black/60 border border-neutral-900 rounded-lg outline-none text-neutral-200 focus:border-[#ff5353] transition-colors placeholder:text-neutral-700 text-xs resize-none"
                    placeholder="Type details of your request here..."
                  />
                </div>

                {/* Form state message banner indicators */}
                {status === "error" && (
                  <div className="p-3 bg-red-950/20 border border-red-500/30 text-red-400 rounded-lg text-[10px] font-mono flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                    <div>
                      <div className="font-bold">TRANSMISSION_FAILED.ERR</div>
                      <div className="mt-0.5">{errorMessage}</div>
                    </div>
                  </div>
                )}

                {status === "success" && (
                  <div className="p-3 bg-green-950/20 border border-green-500/30 text-green-400 rounded-lg text-[10px] font-mono flex items-start gap-2 animate-pulse">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <div>
                      <div className="font-bold">TRANSMISSION_SUCCESS.OK</div>
                      <div className="mt-0.5">Secure message package was successfully uploaded to the SOC backend. Handshake complete!</div>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3.5 bg-[#ff5353] hover:bg-[#ff6868] text-white font-sans font-bold text-xs tracking-widest rounded-none flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-[0_6px_20px_rgba(255,83,83,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      ENCRYPTING & TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      TRANSMIT SECURE PACKAGE
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

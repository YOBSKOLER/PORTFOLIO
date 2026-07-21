"use client";
import { useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Globe2,
  MessagesSquare,
} from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "yobskoler9@gmail.com",
    href: "mailto:yobskoler9@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+237 653 639 816",
    href: "tel:+237653639816",
  },
  { icon: MapPin, label: "Location", value: "Douala, Cameroon", href: "#" },
  {
    icon: Globe2,
    label: "LinkedIn",
    value: "linkedin.com/in/yobs-koler",
    href: "https://linkedin.com",
  },
];

const socials = [
  { icon: Globe2, href: "https://github.com", label: "GitHub" },
  { icon: Send, href: "https://twitter.com", label: "Twitter" },
  { icon: MessagesSquare, href: "https://linkedin.com", label: "LinkedIn" },
];

export function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: connecter à un service email (Resend, EmailJS, etc.)
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <ParticlesBackground />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t.contact.title}{" "}
            <span className="text-violet-light">{t.contact.titleAccent}</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-navy-800/60 border backdrop-blur-md border-slate-700/50 rounded-2xl p-8 space-y-5"
          >
            <h3 className="text-xl font-bold text-white">
              {t.contact.sendMessage}
            </h3>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                {t.contact.fullname}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-navy-950/60 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-violet transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                {t.contact.email}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-navy-950/60 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-violet transition"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                {t.contact.message}
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-navy-950/60 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-violet transition resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 w-full bg-violet hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition"
            >
              <Send size={16} />
              {sent ? "✅ Sent!" : t.contact.send}
            </button>
          </motion.div>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 bg-navy-800/60 border backdrop-blur-md border-slate-700/50 rounded-xl p-4 hover:border-violet/40 transition group"
          >
            <h3 className="text-xl font-bold text-white">
              {t.contact.contactDetails}
            </h3>

            <div className="space-y-4">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`${label}: ${value}`}
                  className="flex items-center gap-4 bg-navy-800/60 border border-slate-700/50 rounded-xl p-4 hover:border-violet/40 transition group"
                >
                  <div className="p-2.5 bg-violet/10 rounded-lg group-hover:bg-violet/20 transition">
                    <Icon size={18} className="text-violet-light" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {label}
                    </div>
                    <div className="text-sm text-slate-400">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-slate-400 text-sm mb-3">
                {t.contact.followMe}
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-3 bg-navy-800/60 border border-slate-700/50 rounded-xl hover:border-violet/40 hover:bg-violet/10 text-slate-400 hover:text-violet-light transition"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

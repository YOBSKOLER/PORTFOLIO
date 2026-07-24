'use client'
import { useState } from 'react'
import { useLang } from '@/components/providers/LanguageProvider'
import { ParticlesBackground } from '@/components/ui/ParticlesBackground'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Globe2 } from 'lucide-react'

type ContactForm = { name: string; email: string; message: string }

export function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch {
      setError("Erreur lors de l'envoi. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

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
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      href: "https://github.com/YOBSKOLER",
      label: "GitHub",
      fill: "white",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg",
      href: "https://gitlab.com",
      label: "GitLab",
      fill: "white",
    },
    {
      icon: "https://www.svgrepo.com/show/271111/reddit.svg",
      href: "https://reddit.com",
      label: "Reddit",
      fill: "white",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg",
      href: "https://twitter.com",
      label: "Twitter",
      fill: "",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg",
      href: "https://www.facebook.com/profile.php?id=61572933984252",
      label: "Facebook",
      fill: "",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg",
      href: "https://www.linkedin.com/in/yobs-k%C3%B6ler-37859b385/",
      label: "LinkedIn",
      fill: "",
    },
  ];

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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-navy-800/60 border border-slate-700/50 rounded-2xl p-8 space-y-5"
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

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading || sent}
              className="flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white py-3 rounded-xl font-medium transition"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : sent ? (
                "✅ Message envoyé !"
              ) : (
                <>
                  <Send size={16} /> {t.contact.send}
                </>
              )}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white">
              {t.contact.contactDetails}
            </h3>

            <div className="space-y-4">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
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
                    <img
                      src={Icon}
                      alt={label}
                      className={`w-5 h-5 object-contain shrink-0 group-hover:scale-110 transition
                       ${label === "GitHub" || label === "Twitter" ? "filter brightness-0 invert" : ""}`}
                    />
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

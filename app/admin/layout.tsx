"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderOpen,
  Briefcase,
  Award,
  MessageSquare,
  Code2,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projets", icon: FolderOpen },
  { href: "/admin/experience", label: "Expériences", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: Code2 },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    const auth = document.cookie
      .split(";")
      .some((c) => c.trim().startsWith("admin_auth="));
    if (!auth) router.push("/admin/login");
  }, [pathname]);

  const logout = () => {
    document.cookie = "admin_auth=; path=/; max-age=0";
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#111827] border-r border-slate-800 p-6">
        <div className="text-2xl font-bold text-violet-400 mb-8">
          YOBS.K Admin
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                pathname === href
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 transition mt-4"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#111827] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <span className="text-violet-400 font-bold">YOBS.K Admin</span>
        <button onClick={() => setOpen(!open)}>
          {open ? (
            <X size={22} className="text-white" />
          ) : (
            <Menu size={22} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#111827] pt-16 px-4">
          <nav className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  pathname === href
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-slate-800 transition w-full"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
          </nav>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 md:ml-0 pt-16 md:pt-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}

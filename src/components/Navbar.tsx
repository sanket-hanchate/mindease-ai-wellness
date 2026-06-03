import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { Logo } from "./Logo";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const publicNav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/disorders", label: "Disorders" },
  { to: "/resources", label: "Resources" },
  { to: "/faq", label: "FAQ" },
] as const;

const protectedNav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/chat", label: "Chatbot" },
  { to: "/cognitive", label: "Cognitive Wellness" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const nav = user ? [...publicNav, ...protectedNav] : publicNav;

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm hover:bg-accent transition">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-primary text-white text-xs font-semibold">
                  {user.fullName.charAt(0).toUpperCase()}
                </span>
                <span className="font-medium">{user.fullName.split(" ")[0]}</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => { logout(); navigate({ to: "/login" }); }}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link to="/register"><Button size="sm" className="bg-gradient-primary text-white shadow-soft hover:opacity-95">Get Started</Button></Link>
            </>
          )}
        </div>

        <button className="lg:hidden p-2 rounded-md hover:bg-secondary" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-3 space-y-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
                {n.label}
              </Link>
            ))}
            <div className="border-t border-border pt-3 mt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-secondary">
                    <UserIcon className="h-4 w-4" /> Profile
                  </Link>
                  <button onClick={() => { logout(); setOpen(false); navigate({ to: "/login" }); }} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-secondary text-left">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
                  <Link to="/register" onClick={() => setOpen(false)}><Button className="w-full bg-gradient-primary text-white">Get Started</Button></Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/Logo";
import { Eye, EyeOff, Sparkles, Shield, MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — MindEase" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { language } = useLanguage();
  const t = translations[language];

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error(t.toastEnterEmailPassword); return; }
    try {

      setLoading(true);

      await login(email, password);

      toast.success(t.toastWelcomeBack);

      navigate({ to: "/dashboard" });

    }
    catch (err: any) {

      toast.error(err.message);

    }
    finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative bg-gradient-primary text-white p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 0%, transparent 40%), radial-gradient(circle at 70% 80%, white 0%, transparent 40%)" }} />
        <div className="relative"><Logo /></div>
        <div className="relative space-y-6 max-w-sm">
          <h2 className="text-4xl font-bold leading-tight">{t.loginTitleLeft}</h2>
          <p className="text-white/90">{t.loginDescLeft}</p>
          <div className="space-y-3 pt-4">
            {[{ icon: Sparkles, text: t.loginFeature1 }, { icon: MessageCircle, text: t.loginFeature2 }, { icon: Shield, text: t.loginFeature3 }].map((f) => (
              <div key={f.text} className="flex items-center gap-3"><f.icon className="h-5 w-5" /><span>{f.text}</span></div>
            ))}
          </div>
        </div>
        <p className="relative text-sm text-white/70">
          {t.loginQuote}
        </p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="text-3xl font-bold">{t.loginTitleRight}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{t.loginDescRight}</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">{t.emailLabel}</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.passwordLabel}</Label>
              <div className="relative">
                <Input id="password" type={show ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground"><Checkbox /> {t.rememberMe}</label>
              <a href="#" className="text-primary hover:underline">{t.forgotPassword}</a>
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-white shadow-soft">
              {loading ? t.signingIn : t.signInBtn}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {t.noAccount} <Link to="/register" className="text-primary font-medium hover:underline">{t.createOne}</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo } from "@/components/Logo";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create your account — MindEase" }] }),
  component: RegisterPage,
});

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];
const MARITAL = ["Single", "Married", "Divorced", "Widowed", "Prefer not to say"];
const PROFESSIONS = ["Student", "Software Engineer", "Teacher", "Doctor", "Business Owner", "Government Employee", "Freelancer", "Homemaker", "Other"];

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    fullName: "", gender: "", email: "", phone: "",
    password: "", confirm: "", maritalStatus: "", profession: "",
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) { toast.error("Please fill required fields."); return; }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) { toast.error("Enter a valid email."); return; }
    if (form.phone && !/^[+\d\s\-()]{7,}$/.test(form.phone)) { toast.error("Enter a valid phone."); return; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    if (form.password !== form.confirm) { toast.error("Passwords don't match."); return; }
    await register({
      fullName: form.fullName, email: form.email, gender: form.gender,
      phone: form.phone, maritalStatus: form.maritalStatus, profession: form.profession,
      password: form.password,
    });
    toast.success("Account created!");
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-gradient-soft py-10 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-center mb-6"><Logo /></div>
        <div className="rounded-3xl border border-border bg-card shadow-soft p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-center">Create your account</h1>
          <p className="text-muted-foreground text-center mt-1">Start your personalized wellness journey in under a minute.</p>

          <form onSubmit={onSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
            <Field label="Full Name *"><Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Jane Doe" /></Field>
            <Field label="Gender">
              <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
                <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                <SelectContent>{GENDERS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Email *"><Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" /></Field>
            <Field label="Phone"><Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 555 123 4567" /></Field>

            <Field label="Password *">
              <div className="relative">
                <Input type={show ? "text" : "password"} value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="At least 6 characters" />
                <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>
            <Field label="Confirm Password *">
              <div className="relative">
                <Input type={showConfirm ? "text" : "password"} value={form.confirm} onChange={(e) => set("confirm", e.target.value)} placeholder="Repeat password" />
                <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>

            <Field label="Marital Status">
              <Select value={form.maritalStatus} onValueChange={(v) => set("maritalStatus", v)}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>{MARITAL.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Profession">
              <Select value={form.profession} onValueChange={(v) => set("profession", v)}>
                <SelectTrigger><SelectValue placeholder="Select profession" /></SelectTrigger>
                <SelectContent>{PROFESSIONS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
            </Field>

            <div className="md:col-span-2 mt-2">
              <Button type="submit" className="w-full bg-gradient-primary text-white shadow-soft">Create Account</Button>
              <p className="text-sm text-center text-muted-foreground mt-4">
                Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

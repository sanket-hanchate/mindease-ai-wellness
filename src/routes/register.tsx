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

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create your account — MindEase" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    fullName: "", gender: "", email: "", phone: "",
    password: "", confirm: "", maritalStatus: "", profession: "",
  });
  
  const { language } = useLanguage();
  const t = translations[language];

  const genders = [
    { value: "Male", label: t.genderMale },
    { value: "Female", label: t.genderFemale },
    { value: "Other", label: t.genderOther },
    { value: "Prefer not to say", label: t.genderPreferNotToSay },
  ];

  const marital = [
    { value: "Single", label: t.maritalSingle },
    { value: "Married", label: t.maritalMarried },
    { value: "Divorced", label: t.maritalDivorced },
    { value: "Widowed", label: t.maritalWidowed },
    { value: "Prefer not to say", label: t.maritalPreferNotToSay },
  ];

  const professions = [
    { value: "Student", label: t.professionStudent },
    { value: "Software Engineer", label: t.professionSoftwareEngineer },
    { value: "Teacher", label: t.professionTeacher },
    { value: "Doctor", label: t.professionDoctor },
    { value: "Business Owner", label: t.professionBusinessOwner },
    { value: "Government Employee", label: t.professionGovernmentEmployee },
    { value: "Freelancer", label: t.professionFreelancer },
    { value: "Homemaker", label: t.professionHomemaker },
    { value: "Other", label: t.professionOther },
  ];

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) { toast.error(t.toastFillRequired); return; }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) { toast.error(t.toastValidEmail); return; }
    if (form.phone && !/^[+\d\s\-()]{7,}$/.test(form.phone)) { toast.error(t.toastValidPhone); return; }
    if (form.password.length < 6) { toast.error(t.toastPasswordLength); return; }
    if (form.password !== form.confirm) { toast.error(t.toastPasswordsMatch); return; }
    await register({
      fullName: form.fullName, email: form.email, gender: form.gender,
      phone: form.phone, maritalStatus: form.maritalStatus, profession: form.profession,
      password: form.password,
    });
    toast.success(t.toastAccountCreated);
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-gradient-soft py-10 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-center mb-6"><Logo /></div>
        <div className="rounded-3xl border border-border bg-card shadow-soft p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-center">{t.registerTitle}</h1>
          <p className="text-muted-foreground text-center mt-1">{t.registerDesc}</p>

          <form onSubmit={onSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
            <Field label={t.fullNameLabel}><Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder={t.fullNamePlaceholder} /></Field>
            <Field label={t.genderLabel}>
              <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
                <SelectTrigger><SelectValue placeholder={t.selectGenderPlaceholder} /></SelectTrigger>
                <SelectContent>{genders.map((g) => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label={t.fullNameLabel.includes("*") ? `${t.emailPlaceholder.split("@")[0].charAt(0).toUpperCase() + t.emailPlaceholder.split("@")[0].slice(1)} *` : "Email *"}><Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder={t.emailPlaceholder} /></Field>
            <Field label={t.phoneLabel}><Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder={t.phonePlaceholder} /></Field>

            <Field label={t.passwordRequiredLabel}>
              <div className="relative">
                <Input type={show ? "text" : "password"} value={form.password} onChange={(e) => set("password", e.target.value)} placeholder={t.passwordPlaceholder} />
                <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>
            <Field label={t.confirmPasswordRequiredLabel}>
              <div className="relative">
                <Input type={showConfirm ? "text" : "password"} value={form.confirm} onChange={(e) => set("confirm", e.target.value)} placeholder={t.confirmPasswordPlaceholder} />
                <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>

            <Field label={t.maritalStatusLabel}>
              <Select value={form.maritalStatus} onValueChange={(v) => set("maritalStatus", v)}>
                <SelectTrigger><SelectValue placeholder={t.selectStatusPlaceholder} /></SelectTrigger>
                <SelectContent>{marital.map((g) => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label={t.professionLabel}>
              <Select value={form.profession} onValueChange={(v) => set("profession", v)}>
                <SelectTrigger><SelectValue placeholder={t.selectProfessionPlaceholder} /></SelectTrigger>
                <SelectContent>{professions.map((g) => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}</SelectContent>
              </Select>
            </Field>

            <div className="md:col-span-2 mt-2">
              <Button type="submit" className="w-full bg-gradient-primary text-white shadow-soft">{t.createAccountBtn}</Button>
              <p className="text-sm text-center text-muted-foreground mt-4">
                {t.alreadyHaveAccount} <Link to="/login" className="text-primary font-medium hover:underline">{t.signInLink}</Link>
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

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Save, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — MindEase" }] }),
  component: () => (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
});

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);

  useEffect(() => {
    if (!user) navigate({ to: "/login" });
    else setForm(user);
  }, [user, navigate]);

  if (!user || !form) return null;

  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  return (
    <Layout>
      <section className="bg-gradient-hero py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-gradient-primary grid place-items-center text-white text-3xl font-bold shadow-glow">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.fullName}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card shadow-soft p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              {edit ? (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { setEdit(false); setForm(user); }}><X className="h-4 w-4 mr-1" /> Cancel</Button>
                  <Button size="sm" className="bg-gradient-primary text-white" onClick={() => { updateUser(form); setEdit(false); toast.success("Profile updated"); }}>
                    <Save className="h-4 w-4 mr-1" /> Save Changes
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setEdit(true)}><Pencil className="h-4 w-4 mr-1" /> Edit Profile</Button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Row label="Full Name" value={form.fullName} edit={edit} onChange={(v) => set("fullName", v)} />
              <Row label="Email" value={form.email} edit={false} />
              <SelectRow label="Gender" value={form.gender || ""} edit={edit} options={["Male","Female","Other","Prefer not to say"]} onChange={(v) => set("gender", v)} />
              <Row label="Phone" value={form.phone || ""} edit={edit} onChange={(v) => set("phone", v)} />
              <SelectRow label="Marital Status" value={form.maritalStatus || ""} edit={edit} options={["Single","Married","Divorced","Widowed","Prefer not to say"]} onChange={(v) => set("maritalStatus", v)} />
              <SelectRow label="Profession" value={form.profession || ""} edit={edit} options={["Student","Software Engineer","Teacher","Doctor","Business Owner","Government Employee","Freelancer","Homemaker","Other"]} onChange={(v) => set("profession", v)} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Row({ label, value, edit, onChange }: { label: string; value: string; edit: boolean; onChange?: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {edit && onChange ? <Input value={value} onChange={(e) => onChange(e.target.value)} /> : <p className="text-sm text-foreground bg-secondary rounded-md px-3 py-2.5">{value || "—"}</p>}
    </div>
  );
}
function SelectRow({ label, value, edit, options, onChange }: { label: string; value: string; edit: boolean; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {edit ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent>{options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
      ) : <p className="text-sm text-foreground bg-secondary rounded-md px-3 py-2.5">{value || "—"}</p>}
    </div>
  );
}

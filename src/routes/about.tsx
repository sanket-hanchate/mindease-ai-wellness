import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Target, Eye, AlertTriangle, HeartHandshake, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MindEase — Our Mission" },
      { name: "description", content: "MindEase is on a mission to make evidence-based mental wellness accessible to everyone, everywhere." },
    ],
  }),
  component: About,
});

const roadmap = [
  { quarter: "Q1 2026", title: "Launch MVP", desc: "AI chat, mood tracking, cognitive exercises." },
  { quarter: "Q2 2026", title: "Clinician Pilot", desc: "Pilot programs with 5 university counseling centers." },
  { quarter: "Q3 2026", title: "Mobile Apps", desc: "Native iOS and Android with offline journaling." },
  { quarter: "Q4 2026", title: "Insurance Partners", desc: "Reimbursable care plans with regional providers." },
];

const team = [
  { name: "Digvijay Kadam", role: "Co-Founder", initials: "DK" },
  { name: "M D Tassaduk", role: "Co-Founder & CEO", initials: "MD" },
  { name: "Tejas Mamdyal", role: "Head of AI", initials: "TM" },
  { name: "Sanket Hanchate", role: "Head of Product", initials: "SH" },
];

function About() {
  const { language } =
    useLanguage();

  const t =
    translations[language];

  return (
    <Layout>
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> {t.aboutBadge}
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight">{t.aboutTitle}</h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.aboutDesc}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, title: t.missionTitle, text: t.missionText },
            { icon: Eye, title: t.visionTitle, text: t.visionText },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-white"><c.icon className="h-5 w-5" /></div>
              <h2 className="mt-4 text-2xl font-bold">{c.title}</h2>
              <p className="mt-2 text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-soft">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-destructive/10 text-destructive"><AlertTriangle className="h-5 w-5" /></div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{t.problemTitle}</h2>
            <p className="mt-3 text-muted-foreground">
              {t.problemDesc}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: t.problemStat1Val, label: t.problemStat1Label },
              { stat: t.problemStat2Val, label: t.problemStat2Label },
              { stat: t.problemStat3Val, label: t.problemStat3Label },
              { stat: t.problemStat4Val, label: t.problemStat4Label },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border bg-card p-5">
                <p className="text-3xl font-bold text-primary">{s.stat}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-white"><HeartHandshake className="h-5 w-5" /></div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">{t.whyTitle}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { title: t.whyItem1Title, text: t.whyItem1Text },
              { title: t.whyItem2Title, text: t.whyItem2Text },
              { title: t.whyItem3Title, text: t.whyItem3Text },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border bg-card p-6">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">{t.teamTitle}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="rounded-2xl border bg-card p-6 text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-primary grid place-items-center text-white text-xl font-bold">{m.initials}</div>
                <h4 className="mt-4 font-semibold">{m.name}</h4>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

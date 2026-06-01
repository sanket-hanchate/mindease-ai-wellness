import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Target, Eye, AlertTriangle, HeartHandshake, Sparkles } from "lucide-react";

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
  { name: "Dr. Maya Chen", role: "Co-Founder & Clinical Lead", initials: "MC" },
  { name: "Arjun Patel", role: "Co-Founder & CEO", initials: "AP" },
  { name: "Sofia Reyes", role: "Head of AI", initials: "SR" },
  { name: "Liam Carter", role: "Head of Product", initials: "LC" },
];

function About() {
  return (
    <Layout>
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> About MindEase
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight">Mental wellness, made accessible.</h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            We believe everyone deserves an empathetic, evidence-based companion for the days that feel heavy — and the days that don't.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, title: "Our Mission", text: "Make personalized, science-backed mental wellness support available to anyone with a phone — at any hour." },
            { icon: Eye, title: "Our Vision", text: "A world where seeking support for your mind is as simple, normal and effective as caring for your body." },
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
            <h2 className="mt-4 text-3xl font-bold tracking-tight">The problem</h2>
            <p className="mt-3 text-muted-foreground">
              1 in 4 adults experience anxiety each year, yet over 60% never receive care. Waitlists are long, costs are high,
              and stigma is real. The result: silent suffering and preventable crises.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: "264M", label: "people live with anxiety" },
              { stat: "60%", label: "never seek treatment" },
              { stat: "8 wks", label: "avg therapist waitlist" },
              { stat: "$200+", label: "per session out of pocket" },
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
          <h2 className="mt-4 text-3xl font-bold tracking-tight">Why MindEase</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { title: "Always available", text: "Support at 3am or 3pm — no appointment, no waiting room." },
              { title: "Clinically informed", text: "Built with input from licensed therapists and grounded in CBT principles." },
              { title: "Truly private", text: "Your conversations are encrypted and never sold. You stay in control." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border bg-card p-6">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-soft">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">Roadmap</h2>
          <div className="mt-8 relative">
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {roadmap.map((r, i) => (
                <div key={r.quarter} className={`relative md:grid md:grid-cols-2 md:gap-8 ${i % 2 ? "md:[&>div]:col-start-2" : ""}`}>
                  <div className="pl-10 md:pl-0 md:pr-8 md:text-right">
                    <div className="rounded-2xl border bg-card p-5 inline-block text-left">
                      <p className="text-xs font-mono text-primary">{r.quarter}</p>
                      <h4 className="font-semibold mt-1">{r.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
                    </div>
                  </div>
                  <span className="absolute left-1.5 md:left-1/2 md:-translate-x-1/2 top-4 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">Meet the team</h2>
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

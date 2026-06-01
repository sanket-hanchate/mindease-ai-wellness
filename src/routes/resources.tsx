import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, BookOpen, Wind, Moon, Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({ meta: [{ title: "Resources — MindEase Library" }] }),
  component: Resources,
});

const categories = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "anxiety", label: "Anxiety Management", icon: ShieldCheck },
  { id: "breathing", label: "Breathing", icon: Wind },
  { id: "sleep", label: "Sleep", icon: Moon },
  { id: "mindfulness", label: "Mindfulness", icon: Sparkles },
  { id: "stress", label: "Stress Reduction", icon: ShieldCheck },
];

const resources = [
  { title: "Understanding the Anxiety Cycle", category: "anxiety", time: "6 min", color: "from-blue-400 to-blue-600",
    desc: "Why anxiety feeds on itself — and the small interrupts that break the loop." },
  { title: "The 4-7-8 Breath Explained", category: "breathing", time: "4 min", color: "from-teal-400 to-teal-600",
    desc: "A simple Navy-SEAL-tested technique to calm your nervous system in under a minute." },
  { title: "Building a Wind-Down Ritual", category: "sleep", time: "8 min", color: "from-indigo-400 to-indigo-600",
    desc: "Five tiny habits that signal your body it's safe to sleep." },
  { title: "Mindfulness for Beginners", category: "mindfulness", time: "10 min", color: "from-purple-400 to-purple-600",
    desc: "What it actually is, what it isn't, and how to start without an app." },
  { title: "Cognitive Reframing 101", category: "anxiety", time: "9 min", color: "from-cyan-400 to-cyan-600",
    desc: "The CBT skill that quietly rewires self-critical thinking." },
  { title: "Box Breathing on the Go", category: "breathing", time: "3 min", color: "from-emerald-400 to-teal-600",
    desc: "A discreet technique you can use in meetings, traffic or before bed." },
  { title: "Beating the Sunday Scaries", category: "stress", time: "7 min", color: "from-rose-400 to-pink-600",
    desc: "Where end-of-weekend dread comes from and how to soften it." },
  { title: "Sleep, Caffeine and Anxiety", category: "sleep", time: "5 min", color: "from-violet-400 to-purple-600",
    desc: "The surprising link between your morning coffee and 3am racing thoughts." },
  { title: "Grounding with the 5-4-3-2-1 Method", category: "mindfulness", time: "4 min", color: "from-sky-400 to-blue-600",
    desc: "A gentle sensory exercise to come back to your body in moments of overwhelm." },
];

function Resources() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (cat !== "all" && r.category !== cat) return false;
      if (q && !(`${r.title} ${r.desc}`.toLowerCase().includes(q.toLowerCase()))) return false;
      return true;
    });
  }, [q, cat]);

  return (
    <Layout>
      <section className="bg-gradient-hero py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Mental wellness library</h1>
          <p className="mt-3 text-muted-foreground text-lg max-w-2xl">Short, evidence-informed reads from our clinical team. Bookmark, share, return.</p>
          <div className="mt-6 relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles, techniques, topics..." className="pl-9 h-11 bg-card" />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <Button key={c.id} variant={cat === c.id ? "default" : "outline"} size="sm"
                className={cat === c.id ? "bg-gradient-primary text-white" : ""}
                onClick={() => setCat(c.id)}>
                <c.icon className="h-4 w-4 mr-1.5" /> {c.label}
              </Button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((r) => (
              <article key={r.title} className="rounded-2xl border bg-card overflow-hidden shadow-soft hover:shadow-glow transition group">
                <div className={`h-36 bg-gradient-to-br ${r.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, white 0%, transparent 50%)" }} />
                  <span className="absolute bottom-3 left-3 text-[11px] uppercase tracking-wide rounded-full bg-white/30 backdrop-blur px-2 py-0.5 text-white font-medium">
                    {categories.find((c) => c.id === r.category)?.label}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold group-hover:text-primary transition">{r.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{r.desc}</p>
                  <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {r.time} read</p>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No resources match your search.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

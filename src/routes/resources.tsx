import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, BookOpen, Wind, Moon, Sparkles, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export const Route = createFileRoute("/resources")({
  head: () => ({ meta: [{ title: "Resources — MindEase Library" }] }),
  component: Resources,
});

function Resources() {
  const { language } = useLanguage();
  const t = translations[language];

  const categories = [
    { id: "all", label: t.catAll, icon: BookOpen },
    { id: "anxiety", label: t.catAnxiety, icon: ShieldCheck },
    { id: "breathing", label: t.catBreathing, icon: Wind },
    { id: "sleep", label: t.catSleep, icon: Moon },
    { id: "mindfulness", label: t.catMindfulness, icon: Sparkles },
    { id: "stress", label: t.catStress, icon: ShieldCheck },
  ];

  const resources = [
    { title: t.res1Title, category: "anxiety", time: "6 min", color: "from-blue-400 to-blue-600",
      desc: t.res1Desc },
    { title: t.res2Title, category: "breathing", time: "4 min", color: "from-teal-400 to-teal-600",
      desc: t.res2Desc },
    { title: t.res3Title, category: "sleep", time: "8 min", color: "from-indigo-400 to-indigo-600",
      desc: t.res3Desc },
    { title: t.res4Title, category: "mindfulness", time: "10 min", color: "from-purple-400 to-purple-600",
      desc: t.res4Desc },
    { title: t.res5Title, category: "anxiety", time: "9 min", color: "from-cyan-400 to-cyan-600",
      desc: t.res5Desc },
    { title: t.res6Title, category: "breathing", time: "3 min", color: "from-emerald-400 to-teal-600",
      desc: t.res6Desc },
    { title: t.res7Title, category: "stress", time: "7 min", color: "from-rose-400 to-pink-600",
      desc: t.res7Desc },
    { title: t.res8Title, category: "sleep", time: "5 min", color: "from-violet-400 to-purple-600",
      desc: t.res8Desc },
    { title: t.res9Title, category: "mindfulness", time: "4 min", color: "from-sky-400 to-blue-600",
      desc: t.res9Desc },
  ];

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (cat !== "all" && r.category !== cat) return false;
      if (q && !(`${r.title} ${r.desc}`.toLowerCase().includes(q.toLowerCase()))) return false;
      return true;
    });
  }, [q, cat, resources]);

  return (
    <Layout>
      <section className="bg-gradient-hero py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{t.resourcesTitle}</h1>
          <p className="mt-3 text-muted-foreground text-lg max-w-2xl">{t.resourcesDesc}</p>
          <div className="mt-6 relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.searchPlaceholder} className="pl-9 h-11 bg-card" />
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
                  <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {r.time} {t.readTime}</p>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">{t.noResources}</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

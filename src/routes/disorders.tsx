import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Activity, MapPin, Users2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export const Route = createFileRoute("/disorders")({
  head: () => ({
    meta: [
      { title: "Anxiety Disorders We Support — MindEase" },
      { name: "description", content: "Detailed overviews of anxiety disorders covered by MindEase, including symptoms and supportive techniques." },
    ],
  }),
  component: Disorders,
});

function Disorders() {
  const { language } = useLanguage();
  const t = translations[language];

  const list = [
    { name: t.disorder1NameLong, icon: Activity, color: "from-blue-400 to-blue-600",
      overview: t.disorder1Overview,
      symptoms: [t.disorder1Symptom1, t.disorder1Symptom2, t.disorder1Symptom3, t.disorder1Symptom4, t.disorder1Symptom5] },
    { name: t.disorder2NameLong, icon: Users2, color: "from-teal-400 to-teal-600",
      overview: t.disorder2Overview,
      symptoms: [t.disorder2Symptom1, t.disorder2Symptom2, t.disorder2Symptom3, t.disorder2Symptom4, t.disorder2Symptom5] },
    { name: t.disorder3NameLong, icon: Heart, color: "from-purple-400 to-purple-600",
      overview: t.disorder3Overview,
      symptoms: [t.disorder3Symptom1, t.disorder3Symptom2, t.disorder3Symptom3, t.disorder3Symptom4, t.disorder3Symptom5] },
    { name: t.disorder4NameLong, icon: Brain, color: "from-cyan-400 to-cyan-600",
      overview: t.disorder4Overview,
      symptoms: [t.disorder4Symptom1, t.disorder4Symptom2, t.disorder4Symptom3, t.disorder4Symptom4, t.disorder4Symptom5] },
    { name: t.disorder5NameLong, icon: MapPin, color: "from-indigo-400 to-indigo-600",
      overview: t.disorder5Overview,
      symptoms: [t.disorder5Symptom1, t.disorder5Symptom2, t.disorder5Symptom3, t.disorder5Symptom4, t.disorder5Symptom5] },
  ];

  return (
    <Layout>
      <section className="bg-gradient-hero py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{t.disordersTitleLong}</h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
            {t.disordersDescLong}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((d) => (
            <article key={d.name} className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-glow transition flex flex-col">
              <div className={`h-32 bg-gradient-to-br ${d.color} grid place-items-center text-white`}>
                <d.icon className="h-12 w-12" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold">{d.name}</h2>
                <p className="text-sm text-muted-foreground mt-2">{d.overview}</p>
                <div className="mt-4">
                  <h3 className="text-xs uppercase tracking-wide font-semibold text-foreground/70">{t.commonSymptoms}</h3>
                  <ul className="mt-2 space-y-1">
                    {d.symptoms.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-foreground/80">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="outline" className="mt-6 self-start">
                  {t.learnMoreBtn} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

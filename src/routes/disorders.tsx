import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Activity, MapPin, Users2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/disorders")({
  head: () => ({
    meta: [
      { title: "Anxiety Disorders We Support — MindEase" },
      { name: "description", content: "Detailed overviews of anxiety disorders covered by MindEase, including symptoms and supportive techniques." },
    ],
  }),
  component: Disorders,
});

const list = [
  { name: "Generalized Anxiety Disorder", icon: Activity, color: "from-blue-400 to-blue-600",
    overview: "Persistent and excessive worry about everyday issues — work, health, family — even when there is little or no reason to worry.",
    symptoms: ["Restlessness and feeling on edge","Difficulty concentrating","Muscle tension","Sleep disturbance","Irritability"] },
  { name: "Social Anxiety Disorder", icon: Users2, color: "from-teal-400 to-teal-600",
    overview: "Intense fear of being judged, embarrassed or watched in social or performance situations, often leading to avoidance.",
    symptoms: ["Fear of social judgment","Blushing or sweating in groups","Avoidance of public speaking","Self-consciousness","Anticipatory anxiety"] },
  { name: "Panic Disorder", icon: Heart, color: "from-purple-400 to-purple-600",
    overview: "Recurrent, unexpected panic attacks involving sudden waves of intense fear paired with strong physical symptoms.",
    symptoms: ["Racing heart, chest tightness","Shortness of breath","Dizziness or trembling","Fear of losing control","Fear of future attacks"] },
  { name: "Specific Phobia", icon: Brain, color: "from-cyan-400 to-cyan-600",
    overview: "Marked fear of a specific object or situation (heights, flying, animals) that's out of proportion to actual danger.",
    symptoms: ["Immediate anxiety on exposure","Active avoidance","Physical reactions like nausea","Awareness fear is excessive","Distress disrupts daily life"] },
  { name: "Agoraphobia", icon: MapPin, color: "from-indigo-400 to-indigo-600",
    overview: "Anxiety about being in places or situations from which escape might be difficult or help unavailable in case of a panic-like episode.",
    symptoms: ["Fear of crowds or open spaces","Avoidance of public transit","Reliance on a safe companion","Housebound tendencies","Anticipatory dread"] },
];

function Disorders() {
  return (
    <Layout>
      <section className="bg-gradient-hero py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Understanding anxiety disorders</h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
            Knowledge is the first step toward relief. Explore the conditions MindEase is built to support.
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
                  <h3 className="text-xs uppercase tracking-wide font-semibold text-foreground/70">Common Symptoms</h3>
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
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

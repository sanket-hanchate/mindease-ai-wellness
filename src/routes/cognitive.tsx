import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Zap, Shuffle, Timer, Heart, Award, Play, Trophy, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/cognitive")({
  head: () => ({ meta: [{ title: "Cognitive Wellness — MindEase" }] }),
  component: () => (
    <ProtectedRoute>
      <CognitivePage />
    </ProtectedRoute>
  ),
});

const games = [
  { icon: Brain, name: "Memory Matrix", desc: "Pattern recall with progressive difficulty.",
    color: "from-blue-500 to-cyan-500", score: 76, played: 12, levels: ["Easy","Medium","Hard","Expert"] },
  { icon: Zap, name: "Focus Challenge", desc: "Attention training with accuracy tracking.",
    color: "from-teal-500 to-emerald-500", score: 82, played: 18, levels: ["Beginner","Intermediate","Advanced"] },
  { icon: Shuffle, name: "Cognitive Flexibility", desc: "Rule-switching and pattern recognition.",
    color: "from-purple-500 to-fuchsia-500", score: 71, played: 9, levels: ["Standard","Advanced"] },
  { icon: Timer, name: "Reaction Trainer", desc: "Speed and response measurement.",
    color: "from-orange-500 to-rose-500", score: 88, played: 24, levels: ["Quick","Normal","Endurance"] },
  { icon: Heart, name: "Emotional Awareness", desc: "Recognize emotions in expressions and tone.",
    color: "from-pink-500 to-rose-500", score: 79, played: 7, levels: ["Introductory","Practice","Mastery"] },
];

const badges = [
  { name: "First Step", desc: "Completed your first session", icon: Award },
  { name: "Sharp Focus", desc: "7-day focus streak", icon: Zap },
  { name: "Memory Master", desc: "Reached Memory Level 5", icon: Brain },
  { name: "Quick Mind", desc: "Reaction under 280ms", icon: Timer },
];

function CognitivePage() {
  return (
    <Layout>
      <section className="bg-gradient-hero py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Cognitive Wellness Studio</h1>
          <p className="mt-3 text-muted-foreground text-lg max-w-2xl">Science-inspired exercises to strengthen focus, memory and emotional regulation — a few minutes a day.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Cognitive Score", value: "79", icon: Brain },
              { label: "Weekly Improvement", value: "+14%", icon: TrendingUp },
              { label: "Total Sessions", value: "70", icon: Play },
              { label: "Achievement Badges", value: "8", icon: Trophy },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border bg-card p-5 shadow-soft">
                <s.icon className="h-5 w-5 text-primary" />
                <p className="text-2xl font-bold mt-3">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Exercises</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {games.map((g) => (
              <div key={g.name} className="rounded-2xl border bg-card overflow-hidden shadow-soft hover:shadow-glow transition flex flex-col">
                <div className={`h-28 bg-gradient-to-br ${g.color} relative grid place-items-center text-white`}>
                  <g.icon className="h-12 w-12" />
                  <span className="absolute top-3 right-3 rounded-full bg-white/20 backdrop-blur px-2.5 py-1 text-xs font-medium">{g.played} sessions</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg">{g.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{g.desc}</p>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Accuracy</span><span className="font-medium text-foreground">{g.score}%</span>
                    </div>
                    <Progress value={g.score} />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {g.levels.map((l) => <span key={l} className="text-[11px] rounded-full bg-secondary px-2 py-0.5">{l}</span>)}
                  </div>

                  <Button className="mt-5 bg-gradient-primary text-white w-fit"><Play className="h-4 w-4 mr-1.5" /> Start exercise</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Achievements</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {badges.map((b) => (
              <div key={b.name} className="rounded-2xl border bg-card p-5 text-center shadow-soft">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center text-white">
                  <b.icon className="h-7 w-7" />
                </div>
                <h4 className="mt-3 font-semibold">{b.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

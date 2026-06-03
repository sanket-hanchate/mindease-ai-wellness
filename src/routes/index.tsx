import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  MessageCircle, Activity, Brain, BookHeart, LineChart, Shield, Sparkles,
  ArrowRight, Heart, Users, Clock, Lock, Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MindEase — Personalized AI Mental Wellness" },
      { name: "description", content: "Evidence-based, AI-powered support for anxiety, mood and emotional well-being. Always available, always private." },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "5", label: "Anxiety Disorders Covered", icon: Heart },
  { value: "24/7", label: "AI Support Available", icon: Clock },
  { value: "100%", label: "Personalized Guidance", icon: Sparkles },
  { value: "E2E", label: "Secure & Private", icon: Lock },
];

const features = [
  { icon: MessageCircle, title: "AI Guided Support", desc: "Have a real conversation with an empathetic AI trained in evidence-based techniques." },
  { icon: Activity, title: "Mood Tracking", desc: "Log how you feel and surface patterns over weeks and months — automatically." },
  { icon: Brain, title: "Cognitive Wellness", desc: "Sharpen focus, memory and emotional regulation with science-inspired exercises." },
  { icon: BookHeart, title: "Emotional Journaling", desc: "Guided prompts that turn racing thoughts into clarity and self-understanding." },
  { icon: LineChart, title: "Progress Analytics", desc: "See your wellness score and weekly progress visualized beautifully." },
  { icon: Shield, title: "Private by Design", desc: "Your data stays yours. No selling, no profiling, no judgment — ever." },
];

const disorders = [
  { name: "Generalized Anxiety", color: "from-blue-400 to-blue-600", desc: "Persistent, excessive worry across daily life." },
  { name: "Social Anxiety", color: "from-teal-400 to-teal-600", desc: "Intense fear in social or performance settings." },
  { name: "Panic Disorder", color: "from-purple-400 to-purple-600", desc: "Recurrent panic attacks with physical symptoms." },
  { name: "Specific Phobia", color: "from-cyan-400 to-cyan-600", desc: "Marked fear of specific objects or situations." },
  { name: "Agoraphobia", color: "from-indigo-400 to-indigo-600", desc: "Anxiety about places that feel hard to escape." },
];

const testimonials = [
  { name: "Sara M.", role: "Graduate Student", text: "MindEase helps me untangle my pre-exam spiral. It feels like a calm friend at 2am." },
  { name: "Dev R.", role: "Product Manager", text: "The mood patterns alone were eye-opening. I caught a burnout cycle before it hit." },
  { name: "Aisha K.", role: "Designer", text: "Cognitive exercises are genuinely fun. My focus and sleep both improved in weeks." },
];

function Index() {
  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-teal/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-lavender/30 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Powered by clinical research + modern AI
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Personalized Support for{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Mental</span> and Emotional Well-Being
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl text-balance">
              Accessible, evidence-based mental wellness support powered by AI — built for the moments
              traditional care can't reach.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/chat">
                <Button size="lg" className="bg-gradient-primary text-white shadow-glow hover:opacity-95">
                  Start Chat <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">Learn More</Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-7 w-7 rounded-full ring-2 ring-background bg-gradient-to-br from-primary to-teal" />
                  ))}
                </div>
                <span>12,400+ users supported</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                {[1,2,3,4,5].map((i) => <Star key={i} className="h-4 w-4 fill-warning text-warning" />)}
                <span className="ml-1">4.9 average rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <s.icon className="h-6 w-6 text-primary" />
              <p className="mt-3 text-3xl font-bold tracking-tight">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Everything you need to feel a little better, every day.</h2>
            <p className="mt-3 text-muted-foreground">Tools designed with clinicians and built for real life.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group rounded-2xl border border-border bg-card p-6 hover:shadow-glow transition-all">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-white shadow-soft group-hover:scale-105 transition">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Conditions we support</h2>
              <p className="mt-3 text-muted-foreground max-w-xl">Specialized guidance across the most common anxiety spectrum conditions.</p>
            </div>
            <Link to="/disorders"><Button variant="outline">Explore all <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {disorders.map((d) => (
              <div key={d.name} className="rounded-2xl border border-border bg-card p-5 hover:shadow-soft transition">
                <div className={`h-24 rounded-xl bg-gradient-to-br ${d.color} mb-4 grid place-items-center text-white/90`}>
                  <Heart className="h-8 w-8" />
                </div>
                <h4 className="font-semibold">{d.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">How MindEase works</h2>
          <p className="mt-3 text-muted-foreground text-center max-w-xl mx-auto">Three simple steps to a calmer, clearer mind.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { step: "01", title: "Tell us how you feel", desc: "A quick check-in helps personalize your support, mood tracking and exercises." },
              { step: "02", title: "Chat anytime", desc: "Talk with our empathetic AI companion whenever anxiety, stress or sleep bothers you." },
              { step: "03", title: "Track real progress", desc: "Beautiful analytics show patterns and improvements in your wellness over time." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden">
                <span className="absolute -top-4 -right-2 text-7xl font-bold text-primary/10">{s.step}</span>
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">Loved by people learning to feel better</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl bg-card border border-border p-6 shadow-soft">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="h-4 w-4 fill-warning text-warning" />)}
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">"{t.text}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center text-white text-sm font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 md:p-14 text-white shadow-glow">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 80%, white 0%, transparent 40%)" }} />
            <div className="relative">
              <Users className="h-8 w-8 mb-3" />
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Your calmer mind starts today.</h2>
              <p className="mt-3 max-w-xl text-white/90">Join thousands building healthier mental habits with MindEase. Free to start, no credit card needed.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/register"><Button size="lg" className="bg-white text-primary hover:bg-white/90">Create free account</Button></Link>
                <Link to="/chat"><Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">Try the chat</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

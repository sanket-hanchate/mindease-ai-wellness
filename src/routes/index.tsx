import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  MessageCircle, Activity, Brain, BookHeart, LineChart, Shield, Sparkles,
  ArrowRight, Heart, Users, Clock, Lock, Star,
} from "lucide-react";
import { useLanguage }
from "@/context/LanguageContext";

import { translations }
from "@/lib/translations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MindEase — Personalized AI Mental Wellness" },
      { name: "description", content: "Evidence-based, AI-powered support for anxiety, mood and emotional well-being. Always available, always private." },
    ],
  }),
  component: Index,
});

function Index() {
  const { language } = useLanguage();
  const t = translations[language];

  const stats = [
    { value: t.statAnxietyVal, label: t.statAnxietyLabel, icon: Heart },
    { value: t.statSupportVal, label: t.statSupportLabel, icon: Clock },
    { value: t.statGuidanceVal, label: t.statGuidanceLabel, icon: Sparkles },
    { value: t.statSecureVal, label: t.statSecureLabel, icon: Lock },
  ];

  const features = [
    { icon: MessageCircle, title: t.feature1Title, desc: t.feature1Desc },
    { icon: Activity, title: t.feature2Title, desc: t.feature2Desc },
    { icon: Brain, title: t.feature3Title, desc: t.feature3Desc },
    { icon: BookHeart, title: t.feature4Title, desc: t.feature4Desc },
    { icon: LineChart, title: t.feature5Title, desc: t.feature5Desc },
    { icon: Shield, title: t.feature6Title, desc: t.feature6Desc },
  ];

  const disorders = [
    { name: t.disorder1Name, color: "from-blue-400 to-blue-600", desc: t.disorder1Desc },
    { name: t.disorder2Name, color: "from-teal-400 to-teal-600", desc: t.disorder2Desc },
    { name: t.disorder3Name, color: "from-purple-400 to-purple-600", desc: t.disorder3Desc },
    { name: t.disorder4Name, color: "from-cyan-400 to-cyan-600", desc: t.disorder4Desc },
    { name: t.disorder5Name, color: "from-indigo-400 to-indigo-600", desc: t.disorder5Desc },
  ];

  const steps = [
    { step: t.step1Number, title: t.step1Title, desc: t.step1Desc },
    { step: t.step2Number, title: t.step2Title, desc: t.step2Desc },
    { step: t.step3Number, title: t.step3Title, desc: t.step3Desc },
  ];

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
              <Sparkles className="h-3.5 w-3.5 text-primary" /> {t.heroBadge}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              {t.heroTitlePart1}
              <span className="bg-gradient-primary bg-clip-text text-transparent">{t.heroTitlePart2}</span>{t.heroTitlePart3}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl text-balance">
              {t.heroDesc}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/chat">
                <Button
                  size="lg"
                  className="bg-gradient-primary text-white shadow-glow hover:opacity-95"
                >
                  {t.startChat}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>

              <Link to="/video-chat">
                <Button
                  size="lg"
                  className="bg-gradient-primary text-white shadow-glow hover:opacity-95"
                >
                  {t.videoChat}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>

              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                >
                  {t.btnLearnMore}
                </Button>
              </Link>
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
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t.featuresTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.featuresSubtitle}</p>
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
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t.disordersTitle}</h2>
              <p className="mt-3 text-muted-foreground max-w-xl">{t.disordersSubtitle}</p>
            </div>
            <Link to="/disorders"><Button variant="outline">{t.exploreAll} <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">{t.howItWorksTitle}</h2>
          <p className="mt-3 text-muted-foreground text-center max-w-xl mx-auto">{t.howItWorksSubtitle}</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.step} className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden">
                <span className="absolute -top-4 -right-2 text-7xl font-bold text-primary/10">{s.step}</span>
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
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
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t.ctaTitle}</h2>
              <p className="mt-3 max-w-xl text-white/90">{t.ctaDesc}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/register"><Button size="lg" className="bg-white text-primary hover:bg-white/90">{t.ctaButtonRegister}</Button></Link>
                <Link to="/chat"><Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">{t.ctaButtonChat}</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

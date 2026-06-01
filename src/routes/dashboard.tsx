import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, RadialBarChart, RadialBar, PolarAngleAxis, LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Activity, Brain, Heart, Sparkles, TrendingUp, Calendar, Zap, Smile } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — MindEase" }] }),
  component: Dashboard,
});

const moodTrend = [
  { day: "Mon", mood: 5.2, anxiety: 6.4 },
  { day: "Tue", mood: 5.6, anxiety: 5.9 },
  { day: "Wed", mood: 6.1, anxiety: 5.3 },
  { day: "Thu", mood: 5.8, anxiety: 5.6 },
  { day: "Fri", mood: 6.7, anxiety: 4.8 },
  { day: "Sat", mood: 7.4, anxiety: 4.1 },
  { day: "Sun", mood: 7.8, anxiety: 3.6 },
];

const weeklyProgress = [
  { w: "W1", sessions: 3 },
  { w: "W2", sessions: 5 },
  { w: "W3", sessions: 6 },
  { w: "W4", sessions: 8 },
  { w: "W5", sessions: 7 },
  { w: "W6", sessions: 10 },
];

const wellnessScore = [{ name: "score", value: 78, fill: "var(--color-primary)" }];

const activity = [
  { name: "Chat", value: 42 }, { name: "Journal", value: 28 },
  { name: "Exercises", value: 18 }, { name: "Breathing", value: 12 },
];
const COLORS = ["var(--color-primary)", "var(--color-teal)", "var(--color-lavender)", "var(--color-success)"];

const stressRange = [
  { time: "6am", level: 3 }, { time: "9am", level: 6 }, { time: "12pm", level: 7 },
  { time: "3pm", level: 5 }, { time: "6pm", level: 4 }, { time: "9pm", level: 3 },
];

const sessions = [
  { date: "Today", title: "Morning grounding exercise", duration: "8 min", type: "Breathing" },
  { date: "Today", title: "Chat: pre-meeting worry", duration: "14 min", type: "Chat" },
  { date: "Yesterday", title: "Memory Matrix — Level 4", duration: "6 min", type: "Cognitive" },
  { date: "Yesterday", title: "Evening journal entry", duration: "11 min", type: "Journal" },
  { date: "Wed", title: "Focus Challenge", duration: "9 min", type: "Cognitive" },
];

function Dashboard() {
  const { user } = useAuth();
  return (
    <Layout>
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Welcome back{user ? `, ${user.fullName.split(" ")[0]}` : ""}</p>
              <h1 className="text-3xl font-bold tracking-tight">Your wellness dashboard</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" /> Last 7 days
            </div>
          </div>

          {/* KPI cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Kpi icon={Heart} label="Wellness Score" value="78" delta="+6" tint="primary" />
            <Kpi icon={Smile} label="Avg Mood" value="6.4" delta="+0.8" tint="teal" />
            <Kpi icon={Activity} label="Stress Indicator" value="Low" delta="-12%" tint="success" />
            <Kpi icon={Zap} label="Streak" value="12 days" delta="+3" tint="lavender" />
          </div>

          {/* Charts row */}
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <Card title="Mood vs Anxiety" subtitle="This week" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={moodTrend}>
                  <defs>
                    <linearGradient id="mood" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="anx" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-lavender)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-lavender)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} domain={[0, 10]} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="mood" stroke="var(--color-primary)" fill="url(#mood)" strokeWidth={2} />
                  <Area type="monotone" dataKey="anxiety" stroke="var(--color-lavender)" fill="url(#anx)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Wellness Score" subtitle="Composite metric">
              <ResponsiveContainer width="100%" height={260}>
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={wellnessScore} startAngle={210} endAngle={-30}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "var(--color-secondary)" }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="-mt-44 text-center pointer-events-none">
                <p className="text-5xl font-bold">78</p>
                <p className="text-xs text-muted-foreground mt-1">Good · improving</p>
              </div>
              <div className="mt-32 flex items-center justify-center gap-1 text-sm text-success">
                <TrendingUp className="h-4 w-4" /> +6 vs last week
              </div>
            </Card>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <Card title="Weekly Progress" subtitle="Sessions over time">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="w" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                  <Bar dataKey="sessions" radius={[8,8,0,0]} fill="var(--color-teal)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Emotional Activity" subtitle="Time spent">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={activity} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                    {activity.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Daily Stress Pattern" subtitle="Today">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={stressRange}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} domain={[0, 10]} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="level" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Cognitive Progress widget + sessions */}
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <Card title="Cognitive Progress" subtitle="Brain training" className="lg:col-span-1">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Games Played", value: "47", icon: Brain },
                  { label: "Focus Score", value: "82", icon: Zap },
                  { label: "Memory Score", value: "76", icon: Sparkles },
                  { label: "Cognitive Index", value: "79", icon: Activity },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl bg-gradient-soft p-3">
                    <m.icon className="h-4 w-4 text-primary" />
                    <p className="text-2xl font-bold mt-2">{m.value}</p>
                    <p className="text-[11px] text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success font-medium">+14%</span>
                <span className="text-muted-foreground">improvement this week</span>
              </div>
            </Card>

            <Card title="Session History" subtitle="Recent activity" className="lg:col-span-2">
              <div className="divide-y divide-border">
                {sessions.map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-3 first:pt-0">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 grid place-items-center text-primary">
                        <Activity className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{s.title}</p>
                        <p className="text-xs text-muted-foreground">{s.date} · {s.duration}</p>
                      </div>
                    </div>
                    <span className="text-xs rounded-full bg-secondary px-2.5 py-1">{s.type}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Kpi({ icon: Icon, label, value, delta, tint }: { icon: any; label: string; value: string; delta: string; tint: "primary"|"teal"|"success"|"lavender" }) {
  const tintMap = {
    primary: "bg-primary/10 text-primary",
    teal: "bg-teal/15 text-teal-foreground",
    success: "bg-success/15 text-success",
    lavender: "bg-lavender/20 text-lavender-foreground",
  } as const;
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className={`h-10 w-10 rounded-xl grid place-items-center ${tintMap[tint]}`}><Icon className="h-5 w-5" /></div>
        <span className="text-xs text-success font-medium">{delta}</span>
      </div>
      <p className="mt-4 text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}

function Card({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border bg-card p-5 shadow-soft ${className}`}>
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

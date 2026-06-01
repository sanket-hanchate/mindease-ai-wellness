import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Plus, MessageCircle, User as UserIcon, Bot } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Companion — MindEase" }] }),
  component: ChatPage,
});

interface Msg { id: string; role: "user" | "ai"; text: string; time: string }

const seed: Msg[] = [
  { id: "1",  role: "user", text: "I feel anxious before presentations.", time: "10:02" },
  { id: "2",  role: "ai",   text: "Presentation anxiety is very common. Let's explore what thoughts arise just before you speak — is there a specific moment that feels worst?", time: "10:02" },
  { id: "3",  role: "user", text: "Right when I see everyone looking at me, my mind goes blank.", time: "10:03" },
  { id: "4",  role: "ai",   text: "That blank-mind moment is your nervous system protecting you. A 4-7-8 breath beforehand can lower the spike. Want me to guide one?", time: "10:03" },
  { id: "5",  role: "user", text: "Yes please.", time: "10:04" },
  { id: "6",  role: "ai",   text: "Inhale through your nose for 4… hold for 7… exhale slowly through your mouth for 8. Do this 4 times. Let me know how it feels.", time: "10:04" },
  { id: "7",  role: "user", text: "I keep overthinking at night.", time: "22:11" },
  { id: "8",  role: "ai",   text: "Many people experience increased anxiety during quiet hours. Let's identify recurring thought patterns. What's the most frequent worry that visits you?", time: "22:11" },
  { id: "9",  role: "user", text: "That I haven't done enough today.", time: "22:12" },
  { id: "10", role: "ai",   text: "That's a classic 'productivity guilt' thought. Try this: list 3 small things you DID do, even tiny ones. We can build a nightly closing ritual together.", time: "22:13" },
  { id: "11", role: "user", text: "Sometimes I feel my heart racing for no reason.", time: "14:47" },
  { id: "12", role: "ai",   text: "Heart racing without obvious cause can be a panic response. Have you noticed any triggers in your environment, food or sleep patterns?", time: "14:47" },
  { id: "13", role: "user", text: "Mostly after coffee and emails.", time: "14:48" },
  { id: "14", role: "ai",   text: "Caffeine plus inbox stress is a strong combo. Want me to suggest a gentler morning routine that protects your nervous system?", time: "14:48" },
  { id: "15", role: "user", text: "Yes, that would help.", time: "14:49" },
  { id: "16", role: "ai",   text: "Beautiful. Tomorrow: 1) Drink water before caffeine. 2) Walk 5 minutes outside. 3) Open email AFTER your first task. Try one for a week and we'll track it.", time: "14:49" },
];

const previousChats = [
  { id: "c1", title: "Pre-presentation jitters", time: "Today" },
  { id: "c2", title: "Night-time overthinking", time: "Yesterday" },
  { id: "c3", title: "Sunday scaries", time: "3 days ago" },
  { id: "c4", title: "Sleep hygiene plan", time: "Last week" },
  { id: "c5", title: "Social event anxiety", time: "Last week" },
];

const aiReplies = [
  "That sounds really meaningful — tell me a little more.",
  "Thank you for sharing. Let's look at this together. What feeling shows up strongest?",
  "Many people experience this. You're not alone. Could we try a small grounding exercise?",
  "Noticing the pattern is already progress. What might a kinder response to yourself sound like?",
  "Let's slow down. Take a breath. What's one tiny thing in your control right now?",
];

function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: input.trim(), time };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply: Msg = {
        id: crypto.randomUUID(), role: "ai",
        text: aiReplies[Math.floor(Math.random() * aiReplies.length)],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 1100);
  };

  return (
    <Layout hideFooter>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 h-[calc(100vh-9rem)]">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col rounded-2xl border bg-card overflow-hidden">
            <div className="p-4 border-b">
              <Button className="w-full bg-gradient-primary text-white"><Plus className="h-4 w-4 mr-2" /> New chat</Button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase">Recent</p>
              {previousChats.map((c) => (
                <button key={c.id} className="w-full text-left flex items-start gap-2 rounded-lg px-2 py-2 hover:bg-secondary transition">
                  <MessageCircle className="h-4 w-4 mt-0.5 text-primary" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.time}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-3 border-t flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-primary grid place-items-center text-white text-sm font-semibold">
                {user?.fullName.charAt(0).toUpperCase() ?? "G"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user?.fullName ?? "Guest"}</p>
                <p className="text-xs text-muted-foreground">Free plan</p>
              </div>
            </div>
          </aside>

          {/* Chat area */}
          <section className="flex flex-col rounded-2xl border bg-card overflow-hidden">
            <header className="p-4 border-b flex items-center justify-between bg-gradient-soft">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center text-white shadow-soft">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold">Ease — your AI companion</h2>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Online and listening</p>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-soft/30">
              {messages.map((m) => (
                <div key={m.id} className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
                  {m.role === "ai" && (
                    <div className="h-8 w-8 rounded-full bg-gradient-primary grid place-items-center text-white flex-shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div className={`max-w-[78%] sm:max-w-[65%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
                    m.role === "user" ? "bg-gradient-primary text-white rounded-br-sm" : "bg-card border rounded-bl-sm"
                  }`}>
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <p className={`text-[10px] mt-1 ${m.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>{m.time}</p>
                  </div>
                  {m.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-secondary grid place-items-center flex-shrink-0">
                      <UserIcon className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex items-end gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-primary grid place-items-center text-white"><Bot className="h-4 w-4" /></div>
                  <div className="bg-card border rounded-2xl rounded-bl-sm px-4 py-3 shadow-soft">
                    <div className="flex gap-1">
                      {[0,1,2].map((i) => (
                        <span key={i} className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-4 border-t bg-card">
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Share what's on your mind..." className="flex-1" />
                <Button type="submit" className="bg-gradient-primary text-white"><Send className="h-4 w-4" /></Button>
              </form>
              <p className="text-[11px] text-muted-foreground mt-2 text-center">MindEase is a supportive tool and not a replacement for professional care.</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

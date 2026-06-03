import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Plus, MessageCircle, User as UserIcon, Bot, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Companion — MindEase" }] }),
  component: () => (
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  ),
});

interface Msg { id: string; role: "user" | "ai"; text: string; time: string }


const previousChats = [
  { id: "c1", title: "Pre-presentation jitters", time: "Today" },
  { id: "c2", title: "Night-time overthinking", time: "Yesterday" },
  { id: "c3", title: "Sunday scaries", time: "3 days ago" },
  { id: "c4", title: "Sleep hygiene plan", time: "Last week" },
  { id: "c5", title: "Social event anxiety", time: "Last week" },
];

function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(() => {

    const loadHistory = async () => {

      try {

        const token =
          localStorage.getItem("mindease.token");

        const res = await fetch(
          "http://localhost:5000/api/chat/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        const formatted = data.map(
          (chat: any) => ({
            id: chat._id,
            role: chat.role,
            text: chat.message,
            time: new Date(
              chat.createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          })
        );

        setMessages(formatted);

      } catch (error) {

        console.error(
          "History Load Error:",
          error
        );

      }
    };


    loadHistory();

  }, []);

  const loadConversations = async () => {
    try {
      const token =
        localStorage.getItem(
          "mindease.token"
        );

      const res = await fetch(
        "http://localhost:5000/api/conversations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await res.json();

      setConversations(data);

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadConversations();
  }, []);

  const loadMessages = async (
    conversationId: string
  ) => {

    try {

      const token =
        localStorage.getItem(
          "mindease.token"
        );

      const res = await fetch(
        `http://localhost:5000/api/chat/history/${conversationId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await res.json();

      const formatted =
        data.map((chat: any) => ({
          id: chat._id,
          role: chat.role,
          text: chat.message,
          time: new Date(
            chat.createdAt
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

      setMessages(formatted);

    } catch (error) {

      console.error(error);

    }

  };

  const send = async () => {
    if (!input.trim()) return;

    if (!selectedConversation) {

      alert("Please create a new chat first");

      return;

    }

    const currentInput = input;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: Msg = {
      id: crypto.randomUUID(),
      role: "user",
      text: currentInput,
      time,
    };

    setMessages((m) => [...m, userMsg]);

    setInput("");
    setTyping(true);

    try {
      const token =
        localStorage.getItem("mindease.token");

      const res = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            conversationId: selectedConversation,
            message: currentInput,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Chat request failed"
        );
      }

      await loadConversations();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          text: data.reply,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

    } catch (error) {

      console.error(error);

      const errorMsg: Msg = {
        id: crypto.randomUUID(),
        role: "ai",
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((m) => [...m, errorMsg]);

    } finally {

      setTyping(false);

    }
  };

  const createConversation = async () => {

    try {

      const token =
        localStorage.getItem("mindease.token");

      const res = await fetch(
        "http://localhost:5000/api/conversations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const conversation =
        await res.json();

      setConversations((prev) => [
        conversation,
        ...prev,
      ]);

      setSelectedConversation(
        conversation._id
      );

      setMessages([]);

    } catch (error) {

      console.error(error);

    }
  };

  const deleteConversation =
    async (
      conversationId: string
    ) => {

      try {

        const token =
          localStorage.getItem(
            "mindease.token"
          );

        await fetch(
          `http://localhost:5000/api/conversations/${conversationId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setConversations((prev) =>
          prev.filter(
            (c) =>
              c._id !== conversationId
          )
        );

        if (
          selectedConversation ===
          conversationId
        ) {

          setMessages([]);

          setSelectedConversation(
            null
          );
        }

      } catch (error) {

        console.error(error);

      }
    };

  const loadConversation = async (
    conversationId: string
  ) => {

    try {

      const token =
        localStorage.getItem(
          "mindease.token"
        );

      const res = await fetch(
        `http://localhost:5000/api/chat/conversation/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      const formatted =
        data.map((chat: any) => ({
          id: chat._id,
          role: chat.role,
          text: chat.message,
          time: new Date(
            chat.createdAt
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

      setMessages(formatted);

      setSelectedConversation(
        conversationId
      );

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <Layout hideFooter>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 h-[calc(100vh-9rem)]">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col rounded-2xl border bg-card overflow-hidden">
            <div className="p-4 border-b">
              <Button onClick={createConversation} className="w-full bg-gradient-primary text-white"><Plus className="h-4 w-4 mr-2" /> New chat</Button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase">Recent</p>
              {conversations.map((c) => (
                <div
                  key={c._id}
                  className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-secondary"
                >

                  <button
                    onClick={() =>
                      loadMessages(c._id)
                    }
                    className="flex items-start gap-2 flex-1 text-left"
                  >
                    <MessageCircle
                      className="h-4 w-4 mt-0.5 text-primary"
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {c.title}
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {

                      const confirmed =
                        window.confirm(
                          "Delete this conversation?"
                        );

                      if (confirmed) {
                        deleteConversation(c._id);
                      }

                    }}
                    className="p-1 text-red-500 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                </div>
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
                  <div className={`max-w-[78%] sm:max-w-[65%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${m.role === "user" ? "bg-gradient-primary text-white rounded-br-sm" : "bg-card border rounded-bl-sm"
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
                      {[0, 1, 2].map((i) => (
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

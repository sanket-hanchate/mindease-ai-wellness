import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — MindEase" }] }),
  component: FAQPage,
});

const faqs = [
  { q: "What is MindEase?", a: "MindEase is an AI-powered mental wellness platform offering anxiety support, mood tracking, cognitive wellness exercises and educational resources, built with input from licensed clinicians." },
  { q: "Is my data secure?", a: "Yes. Conversations and journal entries are encrypted in transit and at rest. We never sell your data and you can export or delete it at any time." },
  { q: "Can AI replace therapists?", a: "No. MindEase is a complementary support tool — great for daily check-ins, exercises and reflection. We always recommend professional care for clinical needs." },
  { q: "Which anxiety disorders are covered?", a: "We provide educational content and supportive techniques for Generalized Anxiety, Social Anxiety, Panic Disorder, Specific Phobia and Agoraphobia." },
  { q: "How does the chatbot work?", a: "Our AI is trained with CBT-informed conversational frameworks. It listens, reflects and suggests gentle, evidence-based exercises — never diagnoses." },
  { q: "Are cognitive exercises scientifically inspired?", a: "Yes. Our exercises are inspired by published cognitive training research and reviewed by clinical advisors, focused on focus, memory and emotional regulation." },
  { q: "Is the platform free?", a: "MindEase is free to start with core features. We offer an optional premium plan for advanced analytics and unlimited cognitive sessions." },
  { q: "Can I track my progress?", a: "Absolutely — your dashboard visualizes mood trends, stress patterns, cognitive scores and weekly improvements automatically." },
];

function FAQPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => faqs.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <Layout>
      <section className="bg-gradient-hero py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-card shadow-soft text-primary mb-3">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Frequently asked questions</h1>
          <p className="mt-3 text-muted-foreground text-lg">Everything you wanted to know about MindEase.</p>
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions..." className="pl-9 h-11 bg-card" />
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-3">
            {filtered.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="rounded-2xl border bg-card px-5 shadow-soft">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-16">No questions match your search.</p>}
        </div>
      </section>
    </Layout>
  );
}

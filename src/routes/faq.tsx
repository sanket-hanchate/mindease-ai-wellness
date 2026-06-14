import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, HelpCircle } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — MindEase" }] }),
  component: FAQPage,
});

function FAQPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A },
    { q: t.faq6Q, a: t.faq6A },
    { q: t.faq7Q, a: t.faq7A },
    { q: t.faq8Q, a: t.faq8A },
  ];

  const [q, setQ] = useState("");
  const filtered = useMemo(() => faqs.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q.toLowerCase())), [q, faqs]);

  return (
    <Layout>
      <section className="bg-gradient-hero py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-card shadow-soft text-primary mb-3">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{t.faqTitle}</h1>
          <p className="mt-3 text-muted-foreground text-lg">{t.faqSubtitle}</p>
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.faqSearchPlaceholder} className="pl-9 h-11 bg-card" />
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
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-16">{t.faqNoResults}</p>}
        </div>
      </section>
    </Layout>
  );
}

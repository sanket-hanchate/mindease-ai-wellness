import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Twitter, Linkedin, Instagram, Github } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="border-t border-border bg-gradient-soft mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            {t.footerDescription}
          </p>
          <div className="flex gap-3 mt-4 text-muted-foreground">
            <a href="#" aria-label="Twitter" className="hover:text-primary"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-primary"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="GitHub" className="hover:text-primary"><Github className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">{t.footerProduct}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/disorders" className="hover:text-foreground">{t.navDisorders}</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">{t.navDashboard}</Link></li>
            <li><Link to="/cognitive" className="hover:text-foreground">{t.navCognitiveWellness}</Link></li>
            <li><Link to="/resources" className="hover:text-foreground">{t.navResources}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">{t.footerCompany}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">{t.navAbout}</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">{t.navFAQ}</Link></li>
            <li><a href="#" className="hover:text-foreground">{t.footerContact}</a></li>
            <li><a href="#" className="hover:text-foreground">{t.footerCareers}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">{t.footerLegal}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">{t.footerPrivacyPolicy}</a></li>
            <li><a href="#" className="hover:text-foreground">{t.footerTermsOfService}</a></li>
            <li><a href="#" className="hover:text-foreground">{t.footerCookies}</a></li>
            <li><a href="#" className="hover:text-foreground">{t.footerSecurity}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MindEase. {t.footerRightsReserved}</p>
          <p>{t.footerDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
}

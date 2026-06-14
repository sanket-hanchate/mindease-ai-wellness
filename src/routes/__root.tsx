import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { LanguageProvider } from "@/context/LanguageContext";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "../lib/auth";
import { Toaster } from "@/components/ui/sonner";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

function NotFoundComponent() {
  let language: "en" | "hi" | "mr" | "ta" | "te" = "en";
  try {
    const context = useLanguage();
    if (context) language = context.language;
  } catch (e) {
    // Fallback to English if Context is not available
  }
  const t = translations[language];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">{t.error404Title}</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t.error404Subtitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.error404Desc}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.btnGoHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  let language: "en" | "hi" | "mr" | "ta" | "te" = "en";
  try {
    const context = useLanguage();
    if (context) language = context.language;
  } catch (e) {
    // Fallback to English if Context is not available
  }
  const t = translations[language];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t.errorLoadTitle}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.errorLoadDesc}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.btnTryAgain}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t.btnGoHome}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MindEase — AI-Powered Mental Wellness" },
      { name: "description", content: "Personalized, evidence-based mental wellness support powered by AI. Anxiety care, mood tracking, cognitive exercises and more." },
      { name: "author", content: "MindEase" },
      { property: "og:title", content: "MindEase — AI-Powered Mental Wellness" },
      { property: "og:description", content: "Personalized AI mental wellness support, available 24/7." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
           <Outlet />
        </LanguageProvider>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

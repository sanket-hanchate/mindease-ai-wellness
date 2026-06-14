import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

type LanguageType =
  | "en"
  | "hi"
  | "mr"
  | "ta"
  | "te";

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (
    language: LanguageType
  ) => void;
}

const LanguageContext =
  createContext<
    LanguageContextType | undefined
  >(undefined);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [language, setLanguage] =
    useState<LanguageType>("en");

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "language"
      ) as LanguageType;

    if (saved) {
      setLanguage(saved);
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "language",
      language
    );

  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {

  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
};
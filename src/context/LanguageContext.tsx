import { createContext, useContext, useState } from "react";

export type LanguageType =
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
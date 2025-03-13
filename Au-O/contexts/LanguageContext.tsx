/**
 * Lokalizációs funkciókért felelős context
 * @module contexts/Language
 * @category Contexts
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'EN' | 'HU';
/**
 * Lokalizációs context tulajdonságai
 * @type
 * 
 */
export type LanguageContextProps = {
  /**
   * Visszaadott nyelv
   * @param {Language} language
   */
  language: Language;
  /**
   * Nyelv settere
   * @param {Language} language Beállítandó nyelv 
   * @returns {void}
   */
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('EN');

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;

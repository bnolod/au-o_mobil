/**
 * Első képernyős funkciókért felelős context
 * @category Contexts
 * @module contexts/OnboardingContext
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
/**
 * Első képernyős context tulajdonságai
 * @type
 */
export type OnboardingContextProps = {
  /**
   * Slide index
   */
  index: number;
  /**
   * Slide index settere
   * @param {number} index Beállítandó index
   */
  setIndex: (index: number) => void;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [index, setIndex] = useState(0);

  return <OnboardingContext.Provider value={{ index, setIndex }}>{children}</OnboardingContext.Provider>;
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

/**
 * Képernyők közötti megosztott űrlapkezelésért felelős context
 * @module contexts/FormContext
 * @category Contexts
 */

import { createContext, useContext, useState } from 'react';

/**
 * Űrlap elem tulajdonságai
 * @type
 */
export type FormData = {
  /**
   * @param {string} key Az űrap elemeinek kulcsa
   */
  [key: string]: any;
}
/**
 * Context kiosztott paraméter listája
 * @type
 */
type FormContextType = {
  /**
   * Elem tulajdonságai
   * @type {FormData | undefined} 
   */
  formData: FormData | undefined;
  /**
   * Űrlap adattag settere
   * @param {string} formKey Űrlap azonosító kulcsa 
   * @param {any} data Űrlapba feltöltendő adat 
   * @returns {void}
   */
  setFormData: (formKey: string, data: any) => void;
  /**
   * Űrlap adattag gettere
   * @param {string} formKey Űrlap azonosító kulcsa 
   * @returns {any}
   */
  getFormData: (formKey: string) => any;
  /**
   * 
   * @param {string} formKey A törlésre szánt űrlap azonosító kulcsa 
   * @returns 
   */
  resetFormData: (formKey: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormDataState] = useState<FormData>({});

  //setter
  const setFormData = (formKey: string, data: any) => {
    setFormDataState((prevData) => ({
      ...prevData,
      [formKey]: data,
    }));
  };

  //getter
  const getFormData = (formKey: string) => {
    return formData[formKey] || {};
  };

  //resetter
  const resetFormData = (formKey: string) => {
    setFormDataState((prevData) => {
      const newData = { ...prevData };
      delete newData[formKey];
      return newData;
    });
  };
  return (
    <FormContext.Provider value={{ formData, setFormData, getFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};
export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

import { createContext, useContext, useState } from "react";

interface FormData {
    
    [key: string] : any
}

interface FormContextType {
    formData: FormData | undefined;
    setFormData: (formKey: string, data: any) => void;
    getFormData: (formKey: string) => any;
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
    }

    //resetter
    const resetFormData = (formKey: string) => {
        setFormDataState((prevData) => {
            const newData = {...prevData};
            delete newData[formKey];
            return newData;
        });
    }
    return (
        <FormContext.Provider value={{ formData, setFormData, getFormData, resetFormData }}>
            {children}
        </FormContext.Provider>
    );

}
export const useFormContext = (): FormContextType => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
}
import { UIErrorTexts } from "@/constants/texts";

export function handleFormInputChange(
  formKey: string,
  key: string,
  value: string,
  getFormData: (formKey: string) => any,
  setFormData: (formKey: string, data: any) => void
) {
  const data = getFormData(formKey);
  setFormData(formKey, {
    ...data,
    [key]: value,
  });
}

export function validateLogin(
    identifier: string,
    password: string,
    language: "HU" | "EN" = "EN"
  ) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    const minCharactersRegex = new RegExp(
      `^.{${process.env.EXPO_PUBLIC_MIN_PASSWORD_CHARACTER_LENGTH || 8},}$`
    );
    const noCapitalLettersRegex = /^(?=.*[A-Z])/;
    const noSmallLettersRegex = /^(?=.*[a-z])/;
    const noNumbersRegex = /^(?=.*\d)/;
    const noSpecialCharactersRegex = /^(?=.*\W)/;
  
    const errors: string[] = [];

    if (!emailRegex.test(identifier) && !usernameRegex.test(identifier)) {
      errors.push(UIErrorTexts.email.invalidEmail[language]);
    }

    if (!minCharactersRegex.test(password)) {
      errors.push(UIErrorTexts.password.minCharacters[language]);
    }
    if (!noCapitalLettersRegex.test(password)) {
      errors.push(UIErrorTexts.password.noCapitalLetters[language]);
    }
    if (!noSmallLettersRegex.test(password)) {
      errors.push(UIErrorTexts.password.noSmallLetters[language]);
    }
    if (!noNumbersRegex.test(password)) {
      errors.push(UIErrorTexts.password.noNumbers[language]);
    }
    if (!noSpecialCharactersRegex.test(password)) {
      errors.push(UIErrorTexts.password.noSpecialCharacters[language]);
    }

    if (errors.length > 0) {
      return { valid: false, messages: errors };
    }

    return { valid: true, message: UIErrorTexts.authentication.loginSuccess[language] };
  }
  

  export function validateRegister(
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    language: "HU" | "EN" = "EN"
  ) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    const minCharactersRegex = new RegExp(
      `^.{${process.env.EXPO_PUBLIC_MIN_PASSWORD_CHARACTER_LENGTH || 8},}$`
    );
    const noCapitalLettersRegex = /^(?=.*[A-Z])/;
    const noSmallLettersRegex = /^(?=.*[a-z])/;
    const noNumbersRegex = /^(?=.*\d)/;
    const noSpecialCharactersRegex = /^(?=.*\W)/;
  
    const errors: string[] = [];
  
    if (!emailRegex.test(email)) {
      errors.push(UIErrorTexts.email.invalidEmail[language]);
    }
  

    if (!usernameRegex.test(username)) {
      errors.push(UIErrorTexts.username.invalidUsername[language]);
    }

    if (!minCharactersRegex.test(password)) {
      errors.push(UIErrorTexts.password.minCharacters[language]);
    }
    if (!noCapitalLettersRegex.test(password)) {
      errors.push(UIErrorTexts.password.noCapitalLetters[language]);
    }
    if (!noSmallLettersRegex.test(password)) {
      errors.push(UIErrorTexts.password.noSmallLetters[language]);
    }
    if (!noNumbersRegex.test(password)) {
      errors.push(UIErrorTexts.password.noNumbers[language]);
    }
    if (!noSpecialCharactersRegex.test(password)) {
      errors.push(UIErrorTexts.password.noSpecialCharacters[language]);
    }

    if (password !== confirmPassword) {
      errors.push(UIErrorTexts.password.passwordsDoNotMatch[language]);
    }
  

    if (errors.length > 0) {
      return { valid: false, messages: errors };
    }

    return { valid: true, message: UIErrorTexts.authentication.registrationSuccess[language] };
  }
  
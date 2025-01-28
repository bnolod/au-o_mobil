import { UIErrorTexts } from "@/constants/texts";
import { EventPostData, GroupPostData, PostType, User } from "@/constants/types";
import * as SecureStore from 'expo-secure-store'
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
export async function setTimestamp() {
  await SecureStore.setItemAsync("timestamp", new Date().getTime().toString());
}
export async function getTimestamp() {
  return await SecureStore.getItemAsync("timestamp");
}
export function getPostType( nickname: string, username: string, groupData?: GroupPostData, eventData?: EventPostData): string {
  if (nickname && username) {
    if (!groupData && !eventData) {
      return "USER"
    }
    if (!groupData && eventData) {
      return "EVENT"
    }
    if ((groupData && eventData) || (groupData && !eventData)) {
      return "GROUP"
    }
    else return "INVALID"
  }
  else return "INVALID"
}
export function createTimestamp() {
  return new Date().getTime().toString();
}
export async function convertToBlob(image: string): Promise<string> {
  const response = await fetch(image);
  const blob = await response.blob();
  const  b64 = await new Response(blob).arrayBuffer().then((buffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  })
  return b64;
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
    dateOfBirth: string,
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
    if (Number(dateOfBirth.split("-")[0]) > 2009) {
        errors.push(UIErrorTexts.dateOfBirth.ageRestriction[language]);
    }
    
    if (Number(dateOfBirth.split("-")[0]) < 1930) {
        errors.push(UIErrorTexts.dateOfBirth.invalidDoB[language]);
    }

    errors.map((error) => console.log(error));
    if (errors.length > 0) {
      return { valid: false, messages: errors };
    }

    return { valid: true, message: UIErrorTexts.authentication.registrationSuccess[language] };
  }
  
export async function saveUser(user: User) {
    await SecureStore.setItemAsync("user", JSON.stringify(user));
  }
export async function deleteUser() {
    await SecureStore.deleteItemAsync("user");
  }
  export function formatDate(date: string) {
    return date.replaceAll("-", ". ") + "."
  }
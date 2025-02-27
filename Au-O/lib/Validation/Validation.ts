import * as t from './responses';
import * as r from './regexes';
import { showErrorToast } from '../functions';

export function validateLogin(identifier: string, password: string, language: 'HU' | 'EN' = 'EN') {
  const errors: string[] = [];

  if (!r.emailRegex.test(identifier) && !r.usernameRegex.test(identifier)) {
    errors.push(t.email.invalidEmail[language]);
  }

  if (!r.minPasswordRegex.test(password)) {
    errors.push(t.password.minCharacters[language]);
  }
  if (!r.containsCapitalLettersRegex.test(password)) {
    errors.push(t.password.noCapitalLetters[language]);
  }
  if (!r.containsSmallLettersRegex.test(password)) {
    errors.push(t.password.noSmallLetters[language]);
  }
  if (!r.containsNumbersRegex.test(password)) {
    errors.push(t.password.noNumbers[language]);
  }
  if (!r.containsSpecialCharactersRegex.test(password)) {
    errors.push(t.password.noSpecialCharacters[language]);
  }

  if (errors.length > 0) {
    showErrorToast(t.loginFailed[language], errors[0]);
    return { valid: false, messages: errors };
  }

  return {
    valid: true,
    message: t.loginSuccess[language],
  };
}

export function validateRegister(
  email: string,
  username: string,
  password: string,
  nickname: string,
  confirmPassword: string,
  dateOfBirth: string,
  language: 'HU' | 'EN' = 'EN'
) {
  const errors: string[] = [];

  if (!r.emailRegex.test(email)) {
    errors.push(t.email.invalidEmail[language]);
  }

  if (!r.usernameRegex.test(username)) {
    errors.push(t.username.invalidUsername[language]);
  }
  if (!r.nicknameLengthRegex.test(nickname)) {
    errors.push(t.nickname.invalidLength[language]);
  }
  if (!r.containsAlphanummeric.test(nickname)) {
    errors.push(t.nickname.noAlphanumeric[language]);
  }
  if (!r.containsSpecialCharactersRegex.test(nickname)) {
    errors.push(t.nickname.noAlphanumeric[language]);
  }

  if (new Date(dateOfBirth).getUTCFullYear() > new Date().getUTCFullYear() - 16) {
    errors.push(t.dateOfBirth.ageRestriction[language]);
  }
  if (new Date(dateOfBirth).getUTCFullYear() < 1900) {
    errors.push(t.dateOfBirth.invalidDoB[language]);
  }

  if (password.length < 8) {
    errors.push(t.password.minCharacters[language]);
  }
  if (!r.containsCapitalLettersRegex.test(password)) {
    errors.push(t.password.noCapitalLetters[language]);
  }
  if (!r.containsSmallLettersRegex.test(password)) {
    errors.push(t.password.noSmallLetters[language]);
  }
  if (!r.containsNumbersRegex.test(password)) {
    errors.push(t.password.noNumbers[language]);
  }
  if (!r.containsSpecialCharactersRegex.test(password)) {
    errors.push(t.password.noSpecialCharacters[language]);
  }

  if (password !== confirmPassword) {
    errors.push(t.password.passwordsDoNotMatch[language]);
  }

  if (errors.length > 0) {
    showErrorToast(t.registrationFailed[language], errors[0]);
    return { valid: false, messages: errors };
  }
  return {
    valid: true,
    message: t.registrationSuccess[language],
  };
}

export function validateUserPost(description: string, location: string, language: 'HU' | 'EN' = 'EN') {
  let errors: string[] = [];
  if (description && description.length > 255) {
    errors.push(t.descriptionTooLong[language]);
  }
  if (description && location.length > 32) {
    errors.push(t.locationTooLong[language]);
  }
  if (errors.length > 0) {
    showErrorToast(t.postFailed[language], errors[0]);
    return { valid: false, messages: errors };
  }
  return {
    valid: true,
    message: t.postFailed[language],
  };
}

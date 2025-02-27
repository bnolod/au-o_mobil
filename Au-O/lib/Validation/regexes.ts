export const emailRegex = /^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/;
export const usernameRegex = /^[a-zA-Z0-9]{3,24}$/;
export const containsCapitalLettersRegex = /^(?=.*[A-Z])/;
export const containsSmallLettersRegex = /^(?=.*[a-z])/;
export const containsNumbersRegex = /^(?=.*\d)/;
export const containsSpecialCharactersRegex = /^(?=.*[^\w\s])/;
export const containsAlphanummeric = /^(?=.*[a-zA-Z0-9])/
export const minPasswordRegex = /^[^\s]{8,255}$/;

export const nicknameLengthRegex = /^[^\s]{3,24}$/;

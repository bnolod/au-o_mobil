import { MOCK_validRegisterData } from "@/constants/mocks.test";
import { validateRegister } from "../Validation/Validation";
import { email, password, registrationSuccess, username } from "../Validation/responses";

test("Érvényes bejelentkezési adatok", () => {
  expect(
    validateRegister(
      MOCK_validRegisterData.email,
      MOCK_validRegisterData.username,
      MOCK_validRegisterData.password,
      MOCK_validRegisterData.confirmPassword,
      MOCK_validRegisterData.dateOfBirth,
      "EN"
    )
  ).toStrictEqual({
    valid: true,
    message: registrationSuccess.EN,
  });
});
test("Eltérő jelszavak", () => {
  expect(
    validateRegister(
      MOCK_validRegisterData.email,
      MOCK_validRegisterData.username,
      MOCK_validRegisterData.password,
      MOCK_validRegisterData.confirmPassword + "123",
      MOCK_validRegisterData.dateOfBirth,
      "EN"
    )
  ).toStrictEqual({
    valid: false,
    messages: [password.passwordsDoNotMatch.EN],
  });
});
test("Érvénytelen e-mail", () => {
  expect(
    validateRegister(
      MOCK_validRegisterData.email.split("@")[0],
      MOCK_validRegisterData.username,
      MOCK_validRegisterData.password,
      MOCK_validRegisterData.confirmPassword,
      MOCK_validRegisterData.dateOfBirth,
      "EN"
    )
  ).toStrictEqual({
    valid: false,
    messages: [email.invalidEmail.EN],
  });
});
test("Érvénytelen felhasználónév", () => {
  expect(
    validateRegister(
      MOCK_validRegisterData.email,
      "t",
      MOCK_validRegisterData.password,
      MOCK_validRegisterData.confirmPassword,
      MOCK_validRegisterData.dateOfBirth,
      "EN"
    )
  ).toStrictEqual({
    valid: false,
    messages: [username.invalidUsername.EN],
  });
});
test("Érvénytelen jelszó", () => {
  expect(
    validateRegister(
      MOCK_validRegisterData.email,
      MOCK_validRegisterData.username,
      MOCK_validRegisterData.password.split("@")[0].toLowerCase(),
      MOCK_validRegisterData.confirmPassword,
      MOCK_validRegisterData.dateOfBirth,
      "EN"
    )
  ).toStrictEqual({
    valid: false,
    messages: [
      password.minCharacters.EN,
      password.noCapitalLetters.EN,
      password.noNumbers.EN,
      password.noSpecialCharacters.EN,
      
      password.passwordsDoNotMatch.EN,
    ],
  });
});

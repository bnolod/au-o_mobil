import { MOCK_validRegisterData } from "@/constants/mocks.test";
import { validateRegister } from "../functions";
import { UIErrorTexts } from "@/constants/texts";

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
    message: UIErrorTexts.authentication.registrationSuccess.EN,
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
    messages: [UIErrorTexts.password.passwordsDoNotMatch.EN],
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
    messages: [UIErrorTexts.email.invalidEmail.EN],
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
    messages: [UIErrorTexts.username.invalidUsername.EN],
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
      UIErrorTexts.password.minCharacters.EN,
      UIErrorTexts.password.noCapitalLetters.EN,
      UIErrorTexts.password.noNumbers.EN,
      UIErrorTexts.password.noSpecialCharacters.EN,
      
      UIErrorTexts.password.passwordsDoNotMatch.EN,
    ],
  });
});

import {
    MOCK_invalidIdentifierLoginData,
  MOCK_invalidLoginData,
  MOCK_invalidPasswordLoginData,
  MOCK_validLoginData,
} from "@/constants/mocks.test";
import { validateLogin } from "../functions";
import { UIErrorTexts } from "@/constants/texts";

test("Érvényes bejelentkezési adatok", () => {
  expect(
    validateLogin(
      MOCK_validLoginData.usernameOrEmail,
      MOCK_validLoginData.password,
      "EN"
    )
  ).toStrictEqual({
    valid: true,
    message: UIErrorTexts.authentication.loginSuccess.EN,
  });
});
test("Érvénytelen jelszó", () => {
  const validation = validateLogin(
    MOCK_invalidPasswordLoginData.usernameOrEmail,
    MOCK_invalidPasswordLoginData.password,
    "EN"
  );
  expect(validation.message).toBeUndefined();
  expect(validation.valid).toBeFalsy();
  expect(validation.messages?.length).toBe(4);
});
test("Érvénytelen azonosító", () => {
  const validation = validateLogin(
    MOCK_invalidIdentifierLoginData.usernameOrEmail,
    MOCK_invalidIdentifierLoginData.password,
    "EN"
  );
  expect(validation.message).toBeUndefined();
  expect(validation.valid).toBeFalsy();
  expect(validation.messages?.length).toBeGreaterThanOrEqual(1);
});
test("Érvénytelen bejelentkezési adatok", () => {
  const validation = validateLogin(
    MOCK_invalidLoginData.usernameOrEmail,
    MOCK_invalidLoginData.password,
    "EN"
  );
  expect(validation.message).toBeUndefined();
  expect(validation.valid).toBeFalsy();
  expect(validation.messages?.length).toBeGreaterThanOrEqual(5);
});

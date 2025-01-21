import { View } from "react-native";
import Button from "../ui/Button";
import ThemedText from "../ui/ThemedText";
import { AuthTexts } from "@/constants/texts";
import { useFormContext } from "@/contexts/FormContext";
import { router } from "expo-router";
import { validateLogin, validateRegister } from "@/lib/functions";
import { useAuthentication } from "@/contexts/AuthenticationContext";

export default function AuthTouchables({
  language,
  mode,
}: {
  language: "HU" | "EN";
  mode: "LOGIN" | "SIGNUP";
}) {
  const { getFormData, resetFormData } = useFormContext();
  const { login, register } = useAuthentication();
  async function performLogin() {
    const { identifier, password } = await getFormData("login");
    /*          if (validateLogin(identifier, password, language).valid) {
            resetFormData("login");
            console.log("VALID ", identifier, password);
          }*/
    await login!({usernameOrEmail: identifier, password})
  }
  async function performRegistration() {
    const {email, username, password, nickname, confirmPassword, dateOfBirth} = await getFormData("register");
/*     if (
      validateRegister(
        email,
        username,
        password,
        confirmPassword,
        dateOfBirth,
        language
      ).valid
    ) {
      resetFormData("register");
      console.log(
        "VALID ",
        email,
        username,
        password,
        confirmPassword,
        dateOfBirth
      );
    } */
   console.log("Registering", email, username, password, nickname, dateOfBirth.split("T")[0]);
    await register!({email, username, password, nickname, date_of_birth: dateOfBirth.split("T")[0]}).then((res) => {
      console.log("Registration successful", res);
    })

  }
  return (
    <View className="w-full basis-2/12 sticky flex flex-col my-6 bg-transparent justify-evenly items-center">
      <Button
        variant="highlight"
        type="fill"
        hapticFeedback="heavy"
        onPress={
          mode === "LOGIN"
            ? () => {
                performLogin();
              }
            : () => {
                performRegistration();
              }
        }
      >
        <ThemedText className="text-white font-semibold text-lg">
          {mode === "LOGIN"
            ? AuthTexts.login.confirm[language]
            : AuthTexts.signup.confirm[language]}
        </ThemedText>
      </Button>
      <View className="flex items-center flex-row">
        <ThemedText>
          {mode === "LOGIN"
            ? AuthTexts.login.notRegistered[language]
            : AuthTexts.signup.haveAccount[language]}
        </ThemedText>
        <Button
          hapticFeedback="light"
          type="fit"
          variant="transparent"
          onPress={() => {
            router.push(
              mode === "LOGIN" ? "/(auth)/register" : "/(auth)/login"
            );
          }}
        >
          <ThemedText className="underline font-bold">
            {mode === "LOGIN"
              ? AuthTexts.login.confirmTabSwitch[language]
              : AuthTexts.signup.confirmTabSwitch[language]}
          </ThemedText>
        </Button>
      </View>
    </View>
  );
}

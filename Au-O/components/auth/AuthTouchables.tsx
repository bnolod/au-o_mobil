import { View } from "react-native";
import Button from "../ui/Button";
import ThemedText from "../ui/ThemedText";
import { AuthTexts } from "@/constants/texts";
import { useFormContext } from "@/contexts/FormContext";
import { router } from "expo-router";
import { validateLogin, validateRegister } from "@/lib/functions";


export default function AuthTouchables({
  language,
  mode,
  
}: {
  language: "HU" | "EN";
  mode: "LOGIN" | "SIGNUP";
}) 
{
  const { getFormData, resetFormData } = useFormContext();
  
  return (
    <View className="w-full basis-2/12 flex flex-col my-6 bg-transparent justify-evenly items-center">
      <Button
        variant="highlight"
        type="fill"
        hapticFeedback="heavy"
        onPress={mode === "LOGIN" ? () => {
          const { identifier, password } = getFormData("login");
          if (validateLogin(identifier, password, language).valid) {
            resetFormData("login");
            console.log("VALID ", identifier, password);
          }
        
        } : () => {
          const { email, username, password, confirmPassword } = getFormData("register");
          if (validateRegister(email, username, password, confirmPassword, language).valid) {
            resetFormData("register");
            console.log("VALID ", email, username, password, confirmPassword);
          }
        }}
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
        <Button hapticFeedback="light" type="fit" variant="transparent" onPress={() => {router.push(mode === "LOGIN" ? "/(auth)/register" : "/(auth)/login")}}>
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

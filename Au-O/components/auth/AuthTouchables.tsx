import { View } from "react-native";
import Button from "../ui/Button";
import ThemedText from "../ThemedText";
import { AuthTexts } from "@/constants/texts";

export default function AuthTouchables({
  language,
  mode,
}: {
  language: "HU" | "EN";
  mode: "LOGIN" | "SIGNUP";
}) {
  return (
    <View className="w-full basis-2/12 flex flex-col justify-evenly items-center">
      <Button
        variant="highlight"
        type="fill"
        hapticFeedback="heavy"
        onPress={() => {}}
      >
        <ThemedText className="text-white font-semibold text-lg">
          {mode === "LOGIN"
            ? AuthTexts.login.confirm[language]
            : AuthTexts.signup.confirm[language]}
        </ThemedText>
      </Button>
      <View className="flex items-center gap-4">
        <ThemedText>
          {mode === "LOGIN"
            ? AuthTexts.login.notRegistered[language]
            : AuthTexts.signup.haveAccount[language]}
        </ThemedText>
        <Button type="fit" variant="transparent">
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

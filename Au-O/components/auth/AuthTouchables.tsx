import { View } from "react-native";
import Button from "../ui/Button";
import ThemedText from "../ui/ThemedText";
import { AuthTexts } from "@/constants/texts";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";


export default function AuthTouchables({
  language,
  mode,
  onPress
}: {
  language: "HU" | "EN";
  mode: "LOGIN" | "SIGNUP";
  onPress: () => any;
}) {
  const {toggleColorScheme} = useColorScheme();
  return (
    <View className="w-full basis-2/12 flex flex-col my-6 bg-transparent justify-evenly items-center">
      <Button
        variant="highlight"
        type="fill"
        hapticFeedback="heavy"
        onPress={onPress}
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
        <Button hapticFeedback="light" type="fit" variant="transparent" onPress={() => {router.push(mode === "LOGIN" ? "/_sitemap" : "/(auth)/login")}}>
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

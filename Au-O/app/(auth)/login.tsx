import Input from "@/components/ui/Input";
import { View } from "react-native";
import { useLanguage } from "@/contexts/LanguageContext";
import { AuthTexts } from "@/constants/texts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colorScheme } from "nativewind";
export default function Login() {
  const { language } = useLanguage();
  return (
    <View className="flex-1">
      <Input
        label={AuthTexts.login.labels.email[language]}
        TextInputProps={{
          keyboardType: "email-address",
          autoComplete: "email",
          textContentType: "emailAddress",
          placeholder: AuthTexts.login.placeholders.email[language],
        }}
        icon={
          <MaterialCommunityIcons
            name="email"
            size={24}
            color={colorScheme.get() === "dark" ? "white" : "black"}
          />
        }
      />
      <Input
        label={AuthTexts.login.labels.password[language]}
        icon={
          <MaterialCommunityIcons
            name="lock"
            size={24}
            color={colorScheme.get() === "dark" ? "white" : "black"}
          />
        }
        secureTextEntry
        TextInputProps={{
          placeholder: AuthTexts.login.placeholders.password[language],
        }}
      />
    </View>
  );
}

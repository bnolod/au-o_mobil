import Input from "@/components/ui/Input";
import { AuthTexts } from "@/constants/texts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colorScheme } from "nativewind";
import { ScrollView, View } from "react-native";
import { useLanguage } from "@/contexts/LanguageContext";
export default function Register() {
  const { language } = useLanguage();
  return (
    <ScrollView  >
      <Input
        label={AuthTexts.signup.labels.email[language]}
        TextInputProps={{
          keyboardType: "email-address",
          autoComplete: "email",
          textContentType: "emailAddress",
          placeholder: AuthTexts.signup.placeholders.email[language],
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
        label={AuthTexts.signup.labels.username[language]}
        TextInputProps={{
          keyboardType: "default",
          autoComplete: "username",
          textContentType: "username",
          placeholder: AuthTexts.signup.placeholders.username[language],
        }}
        icon={
          <MaterialCommunityIcons
            name="account"
            size={24}
            color={colorScheme.get() === "dark" ? "white" : "black"}
          />
        }
      />

      <Input
        label={AuthTexts.signup.labels.password[language]}
        icon={
            <MaterialCommunityIcons
            name="lock"
            size={24}
            color={colorScheme.get() === "dark" ? "white" : "black"}
            />
        }
        secureTextEntry
        TextInputProps={{
            placeholder: AuthTexts.signup.placeholders.password[language],
            autoComplete: "off",
            textContentType: "password",
        }}
        />
      <Input
        label={AuthTexts.signup.labels.confirmPassword[language]}
        secureTextEntry
        TextInputProps={{
          autoComplete: "off",
          textContentType: "password",
          placeholder: AuthTexts.signup.placeholders.confirmPassword[language],
        }}
        icon={
            <MaterialCommunityIcons
            name="lock-check"
            size={24}
            color={colorScheme.get() === "dark" ? "white" : "black"}
            />
        }
        />

    </ScrollView>
  );
}

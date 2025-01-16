import Input from "@/components/ui/Input";
import { ScrollView, View } from "react-native";
import { useLanguage } from "@/contexts/LanguageContext";
import { AuthTexts } from "@/constants/texts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colorScheme } from "nativewind";
import ThemedText from "@/components/ui/ThemedText";
import { useEffect } from "react";
import { useFormContext } from "@/contexts/FormContext";
import { handleFormInputChange, validateLogin } from "@/lib/functions";


export default function Login() {
  const { language } = useLanguage();
  const {setFormData, getFormData} = useFormContext();

  useEffect(() => {
    setFormData("login", {
      identifier: getFormData("login")?.identifier || "",
      password: getFormData("login")?.password || "",
    });
  }, [])
const loginForm = getFormData("login");

  return (
    <ScrollView>
      <ThemedText className="text-center text-4xl font-bold mb-5 pt-[50%]">
        {AuthTexts.login.heroText[language]}
      </ThemedText>
      <Input
        label={AuthTexts.login.labels.email[language]}
        TextInputProps={{
          keyboardType: "email-address",
          autoComplete: "email",
          textContentType: "emailAddress",
          placeholder: AuthTexts.login.placeholders.email[language],
          value: loginForm.identifier,
          onChangeText: (text) => handleFormInputChange("login", "identifier", text, getFormData, setFormData),
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
          value: loginForm.password,
          onChangeText: (text) => handleFormInputChange("login", "password", text, getFormData, setFormData),
        }}
      />
    </ScrollView>
  );
}

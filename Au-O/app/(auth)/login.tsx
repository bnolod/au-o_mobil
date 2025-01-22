import Input from "@/components/ui/Input";
import { ScrollView, View } from "react-native";
import { AuthTexts } from "@/constants/texts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ThemedText from "@/components/ui/ThemedText";
import { useEffect } from "react";
import { useFormContext } from "@/contexts/FormContext";
import { handleFormInputChange } from "@/lib/functions";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Login({route}: any) {
  const {setFormData, getFormData} = useFormContext();
  const { language } = useLanguage();
  const {colorScheme} = useColorScheme()
  
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
        colorScheme={colorScheme!}
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
            color={colorScheme === "dark" ? "white" : "black"}
          />
        }
      />
      <Input
        label={AuthTexts.login.labels.password[language]}
        colorScheme={colorScheme!}
        
        icon={
          <MaterialCommunityIcons
          name="lock"
          size={24}
          
          color={colorScheme === "dark" ? "white" : "black"}
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

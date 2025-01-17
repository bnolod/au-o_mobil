import Input from "@/components/ui/Input";
import { AuthTexts } from "@/constants/texts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colorScheme } from "nativewind";
import { Platform, ScrollView, View } from "react-native";
import { useLanguage } from "@/contexts/LanguageContext";
import ThemedText from "@/components/ui/ThemedText";
import { useFormContext } from "@/contexts/FormContext";
import { useEffect } from "react";
import { handleFormInputChange } from "@/lib/functions";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import React from "react";

import { Colors } from "@/constants/Colors";
export default function Register() {
  const { language } = useLanguage();

  const { setFormData, getFormData } = useFormContext();

  useEffect(() => {
    setFormData("register", {
      email: getFormData("register")?.email || "",
      username: getFormData("register")?.username || "",
      nickname: getFormData("register")?.nickname || "",
      password: getFormData("register")?.password || "",
      confirmPassword: getFormData("register")?.confirmPassword || "",
      dateOfBirth: getFormData("register")?.dateOfBirth || "",
    });
  }, []);

  return (
    <ScrollView className="max-w-screen">
      <ThemedText className="text-center text-4xl font-bold mb-5 pt-[50%]">
        {AuthTexts.signup.heroText[language]}
      </ThemedText>
      <Input
        label={AuthTexts.signup.labels.email[language]}
        TextInputProps={{
          keyboardType: "email-address",
          autoComplete: "email",
          textContentType: "emailAddress",
          onChangeText: (text) =>
            handleFormInputChange(
              "register",
              "email",
              text,
              getFormData,
              setFormData
            ),
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
      <View className="flex  mx-auto w-full flex-row justify-between">

      <Input
      containerClassName="w-1/2 pl-[4%] pr-[1%]"
        label={AuthTexts.signup.labels.username[language]}
        TextInputProps={{
          keyboardType: "default",
          autoComplete: "username",
          onChangeText: (text) =>
            handleFormInputChange(
              "register",
              "username",
              text,
              getFormData,
              setFormData
            ),
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
      containerClassName="w-1/2 pr-[4%] pl-[1%]"
        label={AuthTexts.signup.labels.nickname[language]}
        TextInputProps={{
          keyboardType: "default",
          autoComplete: "username",
          onChangeText: (text) =>
            handleFormInputChange(
              "register",
              "nickname",
              text,
              getFormData,
              setFormData
            ),
            textContentType: "username",
            placeholder: AuthTexts.signup.placeholders.nickname[language],
          }}
          icon={
            <MaterialCommunityIcons
            name="account"
            size={24}
            color={colorScheme.get() === "dark" ? "white" : "black"}
            />
          }
          />
          </View>
      <View className="flex  mx-auto w-full flex-row justify-between">
        <Input
        containerClassName="w-1/2 pl-[4%] pr-[1%]" //kiszámoltam, nem random szám!!
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
            onChangeText: (text) =>
              handleFormInputChange(
                "register",
                "password",
                text,
                getFormData,
                setFormData
              ),
            placeholder: AuthTexts.signup.placeholders.password[language],
            autoComplete: "off",
            textContentType: "password",
          }}
        />
        <Input
                containerClassName="w-1/2 pr-[4%] pl-[1%]" //kiszámoltam, nem random szám!!
          label={AuthTexts.signup.labels.confirmPassword[language]}
          secureTextEntry
          TextInputProps={{
            onChangeText: (text) =>
              handleFormInputChange(
                "register",
                "confirmPassword",
                text,
                getFormData,
                setFormData
              ),
            autoComplete: "off",
            textContentType: "password",
            placeholder:
              AuthTexts.signup.placeholders.confirmPassword[language],
          }}
          icon={
            <MaterialCommunityIcons
              name="lock-check"
              size={24}
              color={colorScheme.get() === "dark" ? "white" : "black"}
            />
          }
        />
      </View>
      <View className="w-full mx-auto flex items-center flex-1">
        <RNDateTimePicker accentColor={Colors.dark.secondary} mode="date" display="spinner" maximumDate={new Date(2007, 12, 31)} value={new Date(2007, 0, 1)} onChange={(e, date) => {
          handleFormInputChange("register", "dateOfBirth", date!.toISOString(), getFormData, setFormData);
        }}/>
      </View>
    </ScrollView>
  );
}

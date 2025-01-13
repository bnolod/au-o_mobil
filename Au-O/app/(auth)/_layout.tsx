import AuthTouchables from "@/components/auth/AuthTouchables";
import OnboardingHeader from "@/components/onboarding/Header";
import { Stack, usePathname } from "expo-router";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function AuthLayout() {
  const { language } = useLanguage();
  const path = usePathname();

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
        className="max-h-screen flex justify-between flex-col"
      >
        <View className="h-full">
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            className=""
          >
            <OnboardingHeader isStatic />

            <Stack>
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
            </Stack>
            <AuthTouchables
              mode={path === "/login" ? "LOGIN" : "SIGNUP"}
              language={language}
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

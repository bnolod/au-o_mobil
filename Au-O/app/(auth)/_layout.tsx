import AuthTouchables from '@/components/auth/AuthTouchables';
import OnboardingHeader from '@/components/onboarding/base/Header';
import { Stack, usePathname } from 'expo-router';
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  const { language } = useLanguage();
  const path = usePathname();
  const { colorScheme } = useColorScheme();

  return (
    <>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
        className="max-h-screen flex justify-between flex-col"
      >
        <View className="h-full">
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" className="bg-transparent">
            <OnboardingHeader colorScheme={colorScheme!} language={language} isStatic />

            <Stack>
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
            </Stack>
            {path === '/login' && <AuthTouchables mode={'LOGIN'} language={language} />}
          </KeyboardAvoidingView>
          {path === '/register' && <AuthTouchables mode={'SIGNUP'} language={language} />}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

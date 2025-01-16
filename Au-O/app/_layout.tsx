import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "./globals.css";

import { useColorScheme } from "nativewind";
import { configureReanimatedLogger } from "react-native-reanimated";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { AuthenticationProvider } from "@/contexts/AuthenticationContext";
import { FormProvider } from "@/contexts/FormContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  configureReanimatedLogger({
    strict: false,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <LanguageProvider>
      <OnboardingProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AuthenticationProvider>
            <FormProvider>
              <Stack>
                <Stack.Screen
                  name="onboarding"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              </Stack>
            </FormProvider>
          </AuthenticationProvider>
        </ThemeProvider>
      </OnboardingProvider>
    </LanguageProvider>
  );
}

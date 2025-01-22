import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "./globals.css";

import { useColorScheme } from "nativewind";
import { configureReanimatedLogger } from "react-native-reanimated";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { AuthenticationProvider, useAuthentication } from "@/contexts/AuthenticationContext";
import { FormProvider } from "@/contexts/FormContext";
import * as SecureStore from 'expo-secure-store';
import { getUser, validateToken } from "@/lib/apiClient";
import { saveUser } from "@/lib/functions";
import { usePathname } from "expo-router";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const path = usePathname()
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  configureReanimatedLogger({
    strict: false,
  });
async function initialValidation() {

  const token = await SecureStore.getItemAsync("jwtToken").then((res) => {
    if (!res) {
      console.log(path)
      //router.replace("/onboarding")
      return null
    }
    return res
  })
  const user = await validateToken(token! , path)
  if (user) {
    const fetchedUser = await getUser(token!)
    await saveUser(fetchedUser!)
  }
}
  useEffect(() => {
    if (loaded) {
      initialValidation()
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
              <Stack initialRouteName="onboarding">
                <Stack.Screen
                  name="onboarding"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(root)" options={{ headerShown: false }} />
              </Stack>
            </FormProvider>
          </AuthenticationProvider>
        </ThemeProvider>
      </OnboardingProvider>
    </LanguageProvider>
  );
}

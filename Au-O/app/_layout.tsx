import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import './globals.css';
import { useColorScheme } from 'nativewind';
import { configureReanimatedLogger } from 'react-native-reanimated';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { AuthenticationProvider } from '@/contexts/AuthenticationContext';
import { FormProvider } from '@/contexts/FormContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';
import { eventEmitter } from '@/lib/events';
import { Colors } from '@/constants/Colors';
import { WebSocketProvider } from '@/contexts/WebSocketContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  configureReanimatedLogger({
    strict: false,
  });

  useEffect(() => {
    if (loaded) {
      eventEmitter.on('triggerLogout', () => {
        router.replace('/(auth)/login');
      });
      SplashScreen.hideAsync();
    }
    return () => {
      eventEmitter.removeAllListeners('triggerLogout'); //tesztre
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <LanguageProvider>
      <OnboardingProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthenticationProvider>
            <WebSocketProvider>
              <FormProvider>
                <GestureHandlerRootView>
                  <BottomSheetModalProvider>
                    <Stack initialRouteName="onboarding">
                      <Stack.Screen
                        name="onboarding"
                        options={{
                          headerShown: false,
                          navigationBarHidden: true,
                        }}
                      />
                      <Stack.Screen name="(auth)" options={{ headerShown: false, freezeOnBlur: true }} />
                      <Stack.Screen
                        name="(root)"
                        options={{
                          headerShown: false,
                          navigationBarColor: Colors[colorScheme!].secondary,
                        }}
                      />
                      <Stack.Screen name="(post)" options={{ headerShown: false, freezeOnBlur: true }} />

                      <Stack.Screen name="(profile)" options={{ headerShown: false, freezeOnBlur: true }} />
                      <Stack.Screen name="(garage)" options={{ headerShown: false, freezeOnBlur: true }} />
                    </Stack>
                  </BottomSheetModalProvider>
                </GestureHandlerRootView>
                <Toast topOffset={Platform.OS === 'ios' ? 60 : 30} />
              </FormProvider>
            </WebSocketProvider>
          </AuthenticationProvider>
        </ThemeProvider>
      </OnboardingProvider>
    </LanguageProvider>
  );
}

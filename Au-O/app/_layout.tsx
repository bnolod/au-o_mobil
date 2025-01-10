import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import './globals.css'

import { useColorScheme } from 'nativewind';
import { ThemedText } from '@/components/ThemedText';
import { TouchableOpacity, View } from 'react-native';
import { LanguageProvider } from './contexts/LanguageContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen name="onboarding" options={{headerShown: false}} />
    </Stack>
    </ThemeProvider>
    </LanguageProvider>
  );
}

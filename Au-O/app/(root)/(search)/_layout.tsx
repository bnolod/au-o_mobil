import { SettingsTexts } from '@/constants/texts';
import { Stack } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
export default function SearchLayout() {
  const { language } = useLanguage();
  return (
    <Stack>
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
          title: SettingsTexts.header[language],
          headerBackButtonDisplayMode: 'generic',
          freezeOnBlur: true,
        }}
      />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}

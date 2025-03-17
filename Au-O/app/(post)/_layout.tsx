import { PostStatusTexts } from '@/constants/texts';
import { useLanguage } from '@/contexts/LanguageContext';
import { Stack } from 'expo-router';

export default function PostPageLayout() {
  const { language } = useLanguage();
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="page/[id]"
        options={{
          headerShown: true,
          headerTitle: PostStatusTexts.header[language],
        }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          presentation: 'card',
          animation: 'fade',
          headerShown: true,
          headerTitle: PostStatusTexts.header[language],
        }}
      />
    </Stack>
  );
}

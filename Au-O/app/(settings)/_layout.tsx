import { Stack } from "expo-router";

import { useLanguage } from "@/contexts/LanguageContext";
import { SettingsTexts } from "@/constants/texts";
export default function SettingsLayout() {
    const { language } = useLanguage();
    return (
        <Stack>
            <Stack.Screen name="personal" options={{ title: SettingsTexts.pages.personal[language] }} />
            <Stack.Screen name="about" options={{ title: SettingsTexts.pages.about[language] }} />
            <Stack.Screen name="saved" options={{ title: SettingsTexts.pages.saved[language] }} />
        </Stack>
    )
}
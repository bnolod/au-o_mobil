import { SettingsTexts } from "@/constants/texts";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
export default function UserControllerLayout() {
    const { language } = useLanguage()
    return (
        <Stack>
            <Stack.Screen name="settings" options={{ headerShown: true, title: SettingsTexts.header[language], headerBackButtonDisplayMode: "generic", freezeOnBlur: true}}/>
            <Stack.Screen name="[id]" options={{ headerShown: false}}/>
        </Stack>
    )
}
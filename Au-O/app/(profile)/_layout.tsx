import { Stack } from "expo-router";

export default function UserControllerLayout() {
    return (
        <Stack>
            <Stack.Screen name="settings" options={{ headerShown: true, title: "Settings", headerBackButtonDisplayMode: "generic", freezeOnBlur: true}}/>
            <Stack.Screen name="[id]" options={{ headerShown: false}}/>
        </Stack>
    )
}
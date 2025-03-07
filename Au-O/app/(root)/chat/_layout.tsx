import { Stack } from "expo-router";

export default function ChatLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false, freezeOnBlur: true}}/>
            <Stack.Screen name="[id]" options={{headerShown: false}}/>
        </Stack>
    )
}
import { Stack } from "expo-router";

export default function UserControllerLayout() {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{ headerShown: false}}/>
        </Stack>
    )
}
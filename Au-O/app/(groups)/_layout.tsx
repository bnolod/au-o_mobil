import { Stack } from "expo-router";

export default function GroupLayout() {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{headerShown: false}}/>
        </Stack>
    )
}
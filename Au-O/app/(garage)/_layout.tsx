import { Stack } from "expo-router";

export default function GarageLayout() {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{headerShown: false}} />
            <Stack.Screen name="edit/[id]" options={{headerShown: false}} />
            <Stack.Screen name="new" options={{headerShown: false}} />
        </Stack>
    )
}
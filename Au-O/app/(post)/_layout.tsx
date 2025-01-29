import { Stack } from "expo-router";

export default function PostPageLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="/[id]" options={{headerShown: false}} />
        </Stack>
    )
}
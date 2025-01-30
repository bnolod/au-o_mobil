import { Stack } from "expo-router";

export default function PostPageLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="page/[id]" options={{headerShown: false}} />
            <Stack.Screen name="edit/[id]" options={{headerShown: false}} />
        </Stack>
    )
}
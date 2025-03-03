import { Stack } from "expo-router";

export default function GroupPageLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="new" options={{headerShown: false}}/>
            <Stack.Screen name="post/[postId]" options={{headerShown: false, headerTitle: "Post"}}/>
        </Stack>
    )
}
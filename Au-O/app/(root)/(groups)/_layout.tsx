import { Stack } from "expo-router";

export default function GroupLayout() {
    return (
        
        <Stack initialRouteName="feed">
            <Stack.Screen name="feed" options={{headerShown: false}}/>
            <Stack.Screen name="new" options={{headerShown: false}}/>
            <Stack.Screen name="[id]" options={{headerShown: false}}/>
        </Stack>
    )
}
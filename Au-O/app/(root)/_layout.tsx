import ThemedText from "@/components/ui/ThemedText";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { Redirect, Stack } from "expo-router";
export default function RootLayout() {
    const {user} = useAuthentication()
  
    if (!user) {
      return <Redirect href={"/(auth)/login"} />;
    }
    return (
        <Stack>
            <Stack.Screen name="home" options={{ headerShown: false }} />
        </Stack>
    )
}
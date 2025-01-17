import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/ThemedText";
import { View } from "react-native";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useEffect } from "react";
export default function Home() {
    const { logout, user } = useAuthentication();

    
    return (
        <View className="mt-16">
            <Button variant="highlight" type="fill" onPress={() => {logout!()}}>
                <ThemedText>Logout</ThemedText>
            </Button>
                <ThemedText>Helló, {user?.username} vagyok, tehát {user?.nickname}. </ThemedText>
        </View>
    );
}
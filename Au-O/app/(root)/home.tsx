import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/ThemedText";
import { View } from "react-native";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useEffect } from "react";
export default function Home() {
    const { logout, user } = useAuthentication();

    useEffect(() => {
        console.log(user)
    }, [])
    return (
        <View>
            <Button variant="highlight" type="fill" onPress={() => {logout!()}}>
                <ThemedText>Logout</ThemedText>
            </Button>
        </View>
    );
}
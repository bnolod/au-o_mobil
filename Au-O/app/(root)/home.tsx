import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/ThemedText";
import { View } from "react-native";
import { useAuthentication } from "@/contexts/AuthenticationContext";
export default function Home() {
    const { logout } = useAuthentication();
    return (
        <View>
            <Button variant="highlight" type="fill" onPress={() => {logout!()}}>
                <ThemedText>Logout</ThemedText>
            </Button>
        </View>
    );
}
import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/ThemedText";
import { View } from "react-native";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useEffect } from "react";
import SearchBar from "@/components/ui/SearchBar";
import RootHeader from "@/components/root/RootHeader";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
export default function Home() {
    const { logout, user } = useAuthentication();

    
    return (
        
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
            <RootHeader/>
            <Button variant="highlight" type="fill" onPress={() => {logout!()}}>
                <ThemedText>Logout</ThemedText>
            </Button>
                <ThemedText>Helló, {user?.username} vagyok, tehát {user?.nickname}. </ThemedText>
                
         </View>
        </TouchableWithoutFeedback>
    );
}
import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/ThemedText";
import { View } from "react-native";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useEffect } from "react";
import SearchBar from "@/components/ui/SearchBar";
import RootHeader from "@/components/home/RootHeader";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import PostCard from "@/components/home/UserPost";
import { colorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
export default function Home() {
    const { logout, user } = useAuthentication();
    const {language} = useLanguage();
    
    return (
        
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
            <RootHeader/>
            <Button variant="highlight" type="fill" onPress={() => {logout!()}}>
                <ThemedText>Logout</ThemedText>
            </Button>
                <ThemedText>Helló, {user?.username} vagyok, tehát {user?.nickname}. </ThemedText>
                <PostCard author_nickname={"teszt"} author_username={"teszti"} colorScheme={colorScheme.get()!} language={language} comments={[]} date={"2021-01-01"} description={"teszt"} image={{}} location={{lat: 30, lng: 30}} reactions={{fire: 4, heart: 0, sunglasses: 4}}/>
         </View>
        </TouchableWithoutFeedback>
    );
}
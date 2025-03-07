import DirectMessagePage from "@/components/chat/direct/DirectMessagePage";
import LoadingModal from "@/components/ui/LoadingModal";
import { generalTexts, PostCreationTexts } from "@/constants/texts";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getUserById } from "@/lib/ApiCalls/UserApiCalls";
import { User } from "@/lib/entity/User";
import { useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
export default function DirectMessageScreen() {
    const { colorScheme } = useColorScheme();
    const {language} = useLanguage();
    const {id} = useLocalSearchParams();
    const { user } = useAuthentication();
    const [recipient, setRecipient] = useState<User | null>(null);
    async function fetchRecipient() {
        const res = await getUserById(Number(id));
        if (res) {
            setRecipient(res);
        }
        else return
    }
    useEffect(() => {
        fetchRecipient();
        return () => {

        }
    }, [])
    if (!user || !recipient) return <LoadingModal loading colorScheme={colorScheme!} text="Loading your chats..." />;
    return (
        
       <DirectMessagePage language={language} user={user} recipient={recipient} />
    )
}
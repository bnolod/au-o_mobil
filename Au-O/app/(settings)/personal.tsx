import { ScrollView, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { UserEditTexts } from "@/constants/texts";
export default function PersonalInformationPage() {
    const { language } = useLanguage(); const { colorScheme } = useColorScheme()
    const { user } = useAuthentication();
    const [editUser, setEditUser] = useState({
        nickname: user?.nickname || "",
        email: user?.email || "",
    })
    return (
        <ScrollView className="background flex gap-2 items-center">
            <View className="m-2 primary flex flex-col rounded-xl">
                <Input colorScheme={colorScheme!} TextInputProps={{}} containerClassName="" icon="id-card" label={UserEditTexts.labels.nickname[language]} />
            </View>
        </ScrollView>
    );
}
import { ScrollView, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { generalTexts, UserEditTexts } from "@/constants/texts";
import LoadingModal from "@/components/ui/LoadingModal";
import UserListCard, { UserListCardDisplay } from "@/components/ui/UserListCard";
import { launchImageLibraryAsync } from "expo-image-picker";
import { createImageForm, createTimestamp, showErrorToast, showSuccessToast } from "@/lib/functions";
import { updateProfilePicture } from "@/lib/apiClient";
import Button from "@/components/ui/Button";

export default function PersonalInformationPage() {
    const { language } = useLanguage(); const { colorScheme } = useColorScheme()
    const { user } = useAuthentication();
    const [editUser, setEditUser] = useState({
        nickname: user?.nickname || "",
        bio: user?.bio || "",
    })
    
    async function launchLibrary() {
        if (!user) return;
        const res = await launchImageLibraryAsync({
                          allowsEditing: true,
                          aspect: [1, 1],
                          allowsMultipleSelection: false,
                          quality: 0.6,
                          mediaTypes: 'images',
                        });
                        if (!res.canceled) {
                          const img = await createImageForm(
                            res.assets[0],
                            `${user.username}_PROFILEPIC_${createTimestamp()}`,
                            user
                          );
        
                          if (img) {
                            const profileUpdateResponse = await updateProfilePicture(img);
        
                            if (profileUpdateResponse) {
                                showSuccessToast(UserEditTexts.success.profilePicture[language]);
                            } else {
                                showErrorToast(UserEditTexts.error.profilePicture[language]);
                            }
                          }
                        }
    }
    if (!user) return <LoadingModal colorScheme={colorScheme!} loading={!user} />;
    return (
        <ScrollView className="background flex gap-6">
            <View className="m-2 primary flex gap-2 flex-col rounded-xl">
                <View className="secondary mx-3 my-1 rounded-xl flex flex-row items-center">
                <UserListCardDisplay user={user}>
                <View className={`flex ${language === "EN" ? "flex-col" : "flex-col-reverse"} items-end`}>
                    <ThemedText>
                    {generalTexts.profileAttributes.dateOfSignup[language]}
                    </ThemedText>
                    <ThemedText className="txl">
                    {user.dateOfSignup}
                    </ThemedText>
                </View>
                </UserListCardDisplay>
                </View>
                <Input colorScheme={colorScheme!} TextInputProps={{
                    value: editUser.nickname,
                    onChangeText: (text) => setEditUser({ ...editUser, nickname: text }),
                    placeholder: generalTexts.profileAttributes.nickname[language]
                }} containerClassName="" icon="id-card" label={UserEditTexts.labels.nickname[language]} />
              
                <Input colorScheme={colorScheme!} TextInputProps={{
                    value: user.bio,
                    onChangeText: (text) => setEditUser({ ...editUser, bio: text }),
                    placeholder: generalTexts.profileAttributes.bio[language]
                }} containerClassName="" icon="script-outline" label={UserEditTexts.labels.bio[language]} />
                <Button className="flex flex-col"></Button>
            </View>
        </ScrollView>
    );
}
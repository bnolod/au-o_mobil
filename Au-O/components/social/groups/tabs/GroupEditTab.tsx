/**
 * Csoprot szerkesztés tab
 * @module social/groups/tabs/GroupEditTab
 * @category Component
 */
import { ScrollView, TouchableOpacity, View } from "react-native";
import { GroupTabProps } from "./props";
import Input from "@/components/ui/Input";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ThemedText from "@/components/ui/ThemedText";
import SocialBanner from "../../base/SocialBanner";
import { GroupEditRequest } from "@/lib/request/GroupEditRequest";
import { modifyGroup } from "@/lib/ApiCalls/GroupApiCalls";
import Toast from "react-native-toast-message";
import { GroupTexts } from "@/constants/texts";
import { router } from "expo-router";
import { showErrorToast, showSuccessToast } from "@/lib/functions";
/**
 * @param {GroupTabProps} props
 */
export default function GroupEditTab({colorScheme, group, language}: GroupTabProps) {
    const [editGroup, setEditGroup] = useState<GroupEditRequest>({
        name: group.name,
        description: group.description,
        alias: group.alias,
        public: group.public
    });
    async function handleGroupEdit() {
        const res = await modifyGroup(group.id, editGroup)
        if (res) {
            showSuccessToast(
                GroupTexts.creation.edit.success[language]
            )
            router.reload()
            return
        } 
        else showErrorToast(
             GroupTexts.creation.edit.failed[language]
        )
    }
    return (
        <>
        <ScrollView className="p-3">
            <Input colorScheme={colorScheme} icon="id-card" label="Name" TextInputProps={{
                placeholder: "Name",
                value: editGroup.name,
                onChangeText: (text) => setEditGroup({ ...editGroup, name: text }),

            }} />
            <Input colorScheme={colorScheme} icon="pencil-outline" label="Description" TextInputProps={{
                numberOfLines: 3,
                placeholder: "Description",
                value: editGroup.description,
                onChangeText: (text) => setEditGroup({ ...editGroup, description: text }),

            }} />
            <View className="flex flex-row items-center gap-4">
                
            <Input containerClassName="w-7/12" colorScheme={colorScheme} icon="script-outline" label="Alias" TextInputProps={{
                placeholder: "Alias",
                value: editGroup.alias,
                onChangeText: (text) =>
                    setEditGroup({ ...editGroup, alias: text.toUpperCase().replace(/[^A-Z]/g, '') }),
            }} />
                <TouchableOpacity
              className="secondary button flex items-center justify-center w-2/6"
              onPress={() => setEditGroup({ ...editGroup, public: !editGroup.public })}
              >
              <MaterialCommunityIcons
                name={editGroup.public ? 'door-open' : 'door-closed-lock'}
                size={24}
                color={Colors[colorScheme!].text}
                
                />
              <ThemedText>{editGroup.public ? 'Public' : 'Private'}</ThemedText>
            </TouchableOpacity>
                </View>
            <Button  className="button highlight-themed w-11/12 mt-4" innerTextClassName="p-3 txl text-center" onPress={() => handleGroupEdit()}>Save</Button>
        
        </ScrollView>
              </>
    )
}
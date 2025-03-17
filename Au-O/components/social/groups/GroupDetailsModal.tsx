/**
 * Csoport részlet modal
 * @module social/groups/GroupDetailsModal
 * @category Component */
import { Modal, TouchableOpacity, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { Group } from "@/lib/entity/Group";
/**
 * @param {boolean} visible Látható
 */
export default function GroupDetailsModal({visible, group}: {visible: boolean, group: Group}) {
    return (
        <Modal visible={visible}>
            <TouchableOpacity className="w-screen h-screen flex justify-center items-center bg-black/50">
                <View className="primary w-3/4 rounded-xl">
                <View className="flex flex-col justify-center items-center">
                    <ThemedText className="txl">{group.name}</ThemedText>
                    <ThemedText className="tlg muted">{group.alias}</ThemedText>

                </View>

                </View>
            </TouchableOpacity>
        </Modal>
    );
}
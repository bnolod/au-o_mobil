import { Pressable } from "react-native";
import ThemedText from "../ui/ThemedText";

export default function PostCreationSheetSelectElements({group, event, onPress, title} : {group?: any, event?: any, onPress: (selected: any) => void, title: string}) {
    return (
        <Pressable onPress={onPress} className="w-full secondary p-4 flex flex-row justify-between items-center">
           <ThemedText>{group ? group.title : event.title}</ThemedText> 
           <ThemedText>{group ? group.memberCount : event.date}</ThemedText> 
        </Pressable>
    )
}
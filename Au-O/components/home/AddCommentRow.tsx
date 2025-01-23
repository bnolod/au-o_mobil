import { HomeTexts } from "@/constants/texts";
import { TextInput, View } from "react-native";
import Button from "../ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { CommonStaticElementProps } from "@/constants/types";

export default function AddCommentRow({author_nickname, language, colorScheme, focus}: {author_nickname: string, focus: boolean } & CommonStaticElementProps) {
    return (
        <View className="flex flex-row mb-2 rounded-xl mx-auto justify-between gap-4 items-center">
            <View className="basis-10/12 rounded-xl">
            <TextInput
              
              autoFocus={focus}
              className="primary h-12 rounded-xl px-2"
              placeholderClassName="text-gray-500"
              style={{backgroundColor: Colors[colorScheme].primary, color: Colors[colorScheme].text}}
              placeholder={
                HomeTexts.post.comment_1[language] +
                " " +
                author_nickname +
                " " +
                HomeTexts.post.comment_2[language]
              }
            />
            </View>
            <View className="basis-1/12">
            <Button className="primary h-12 w-12 rounded-xl justify-center items-center">
                <MaterialCommunityIcons name="send" size={24} color={Colors[colorScheme].text} />
            </Button>
            </View>
        </View>
    )
}
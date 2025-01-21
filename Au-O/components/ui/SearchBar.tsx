import { SearchBarProps } from "@/constants/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, View } from "react-native";
import Button from "./Button";

export default function SearchBar({placeholder, onChangeText, onSearch, colorScheme} : SearchBarProps & { colorScheme?: "dark" | "light" }) {
    const [query, setQuery] = useState<string>("");
    return (
        <View className="basis-8/12 rounded-xl mx-auto h-12 bg-backdrop-secondary dark:bg-backdrop-secondary-dark flex flex-row items-center justify-between">
           <TextInput placeholder={placeholder} className=" h-full px-3 basis-5/6 text-black dark:text-white" onChangeText={onChangeText ? (e) => onChangeText(e) : (e) => {setQuery(e)}}/>
           <Button className="flex items-center mr-2" onPress={() => onSearch(query)} hapticFeedback="medium">

           <MaterialCommunityIcons name="magnify" size={32} color={colorScheme === "light" ? "black" : "white"} />
           </Button>
        </View>
    )
} 
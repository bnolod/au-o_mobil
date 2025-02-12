import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../ui/Button";
import SheetSelection from "../ui/SheetSelection";
import { CommonStaticElementProps } from "@/constants/types";
import { useState } from "react";
import SocialSortItem from "./SocialSortItem";

export default function SocialSort({colorScheme, language}: CommonStaticElementProps) {
    const [selected, setSelected] = useState<any>("My Groups");


    return (
        <View className="flex h-20 flex-row items-center gap-4 pr-4 mx-auto ml-2 justify-between">
            <Button className=" button secondary items-center p-0 h-16 justify-center">
            <MaterialCommunityIcons name="account-group-outline" size={32} />
            </Button>
            <SheetSelection
                
                FlashListProps={{ 
                    data: [{
                        bannerImage: null,
                        name: "My Groups",
                    }] ,
                    renderItem: ({ item }) => <SocialSortItem bannerImage={item.bannerImage} memberCount={null} name={item.name} onSelect={() => {setSelected(item.name); }} />,
                    keyExtractor: (item) => item,
                    
                }} 
                placeholder={selected}
                colorScheme={colorScheme} 
                language={language} 
                
            />

        </View>
    );
}
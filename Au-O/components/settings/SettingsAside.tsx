import { CommonStaticElementProps, SettingsAsideProps } from "@/constants/types";
import SettingsOptionDisplay from "./SettingsOption";
import { Modal, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
export default function SettingsAside({
    userId,
    username,
    colorScheme,
    language,
    availableSettings
}: SettingsAsideProps & CommonStaticElementProps) {
    const [visible, setVisible] = useState(false);
    return (
        <View>
        <FlashList data={availableSettings} renderItem={({item}) => {
            return <SettingsOptionDisplay title={item.title} icon={item.icon} className={item.className} onPress={item.onPress} language={language} colorScheme={colorScheme} />
        }}/>
        </View>
    )
}
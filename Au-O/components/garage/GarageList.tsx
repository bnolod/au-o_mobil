import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { FlashList } from "@shopify/flash-list";
import NoPostsFound from "../home/NoPostsFound";
import { Car } from "@/constants/types";
import GarageItem from "./GarageItem";

export default function GarageList({cars, language, colorScheme}: {cars: Car[], language: "EN" | "HU", colorScheme: "light" | "dark"}) {
    return (
        <FlashList
        ListEmptyComponent={<NoPostsFound language={language} />}
        data={cars}
        estimatedItemSize={99}
        renderItem={({ item }) => (
          <GarageItem colorScheme={colorScheme} language={language} car={item}  />
        )}
      />
    );
}
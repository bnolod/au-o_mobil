import { View } from "react-native";
import GarageHeader from "./GarageHeader";
import ThemedText from "../ui/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import PostGrid from "../social/PostGrid";
import CollapsibleText from "../ui/CollapsibleText";
import { getCarImage } from "../graphics/cars";
import { Car, CommonStaticElementProps } from "@/constants/types";

export default function GarageItemPage({colorScheme, isOwner, car, language, profileImg} : {car: Car, isOwner: boolean, profileImg: string} & CommonStaticElementProps) {
    return (    
    <View className="flex-col h-screen flex background">
    <View className="secondary">
      <GarageHeader
        colorScheme={colorScheme!}
        car={car}
        userProfilePic={profileImg}
      />
      <View className="flex flex-row items-center mx-3 py-2">
        <View className="">{getCarImage(car.type, colorScheme, 90)}</View>
        <View className="flex justify-evenly w-11/12 flex-row items-center gap-1">
          <ThemedText className="text-3xl font-bold">
            {car.manufacturer}
          </ThemedText>
          <ThemedText className="text-xl font-semibold">
            {car.model}
          </ThemedText>
        </View>
      </View>
      <View className=" flex flex-row justify-evenly py-3">
        <View className="flex flex-col items-center justify-center p-2 highlight-themed aspect-square rounded-xl">
          <MaterialCommunityIcons
            name="speedometer"
            size={42}
            color={Colors[colorScheme!].text}
          />
          <ThemedText className="text-2xl font-semibold">
            {car.horsepower} HP
          </ThemedText>
        </View>
        <View className="flex flex-col items-center justify-center highlight-themed aspect-square rounded-xl">
          <MaterialCommunityIcons
            name="engine-outline"
            size={42}
            color={Colors[colorScheme!].text}
          />
          <ThemedText className="text-2xl font-semibold">
            {car.displacement} l
          </ThemedText>
        </View>
      </View>
      <View className="flex flex-col mx-3 gap-2">
        <CollapsibleText className="text-lg text-center my-2">
          {car.description}
        </CollapsibleText>
        </View>
      <View className="w-11/12 mx-auto border border-black dark:border-white my-2 opacity-50"/>
      <ThemedText className="mx-auto text-2xl mb-2 font-bold">Starring in</ThemedText>
      <PostGrid colorScheme={colorScheme!} language={language} posts={[]} />
    </View>
  </View>
)}
import { Image, ImageBackground, Pressable, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { Images } from "@/lib/staticAssetExports";
import { Colors } from "@/constants/Colors";
import { colorScheme } from "nativewind";
import { Car } from "@/constants/types";
import { getCarImage } from "../graphics/cars";
export default function GarageItem({
  car,
  language,
  colorScheme,
  onSelect,
}: {
  car: Car;
  language: "EN" | "HU";
  colorScheme: "light" | "dark";
  onSelect?: () => void;
}) {
  return (
    <>
      <Pressable
        onPress={() => {}}
        className="flex m-2 flex-row overflow-hidden items-center rounded-xl secondary h-24"
      >
        <View className="basis-5/12 h-full  rounded-l-xl">
          <ImageBackground
            resizeMode="cover"
            className="flex-1 flex justify-center items-center"
            source={Images.banner_placeholder}
            >
              <View className="absolute">{getCarImage(car.type, colorScheme, 140)}</View>
            </ImageBackground>
        </View>

        <View
          className="flex secondary  h-full items-start justify-center flex-col gap-1"
          style={{
            shadowColor: Colors[colorScheme].secondary,
            shadowOffset: {
              width: -20,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 10,
          }}
        >
          <ThemedText className="text-2xl font-bold">{car.manufacturer}</ThemedText>
          <View className="flex flex-row items-center gap-2">
            <ThemedText className="text-lg font-semibold">
            {car.model}
            </ThemedText>
            <ThemedText className="opacity-65 font-semibold">
            {car.horsepower} HP
            </ThemedText>
            <ThemedText className="opacity-65">
            {car.displacement}l
            </ThemedText>
          </View>
        </View>
      </Pressable>
    </>
  );
}

import { ImageBackground, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { Car } from "@/constants/types";
import { Images } from "@/lib/staticAssetExports";
import { Colors } from "@/constants/Colors";

export default function GarageHeader({
  userProfilePic,
    car,
  colorScheme,
}: {
  userProfilePic?: string;
  car: Car
  colorScheme: "light" | "dark";
}) {
  return (
    <View className="flex flex-row w-full h-64 rounded-b-xl overflow-hidden">
      {userProfilePic && <ImageBackground
        className=" h-full basis-7/12 opacity-70 "
        source={{ uri: userProfilePic }}
      />}
      <View
        className={`flex primary z-20 ${userProfilePic && "basis-5/12"} w-full flex-col h-full`}
        style={{
          shadowColor: Colors[colorScheme].primary,
          shadowOffset: {
            width: -50,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 20,
        }}
      >
        <ImageBackground
          className="flex-1 flex justify-center items-center h-full"
          resizeMode="cover"
          source={Images.banner_placeholder}
        >
            <ThemedText className="text-3xl font-bold">{car.manufacturer}</ThemedText>
            <ThemedText className="text-xl font-semibold">{car.model}</ThemedText>
            <View>
                <ThemedText className="text-xl">{car.horsepower} HP</ThemedText>
            </View>
        </ImageBackground>
      </View>
    </View>
  );
}

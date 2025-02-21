import { ImageBackground, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { Car, CommonStaticElementProps } from "@/constants/types";
import { Images } from "@/lib/staticAssetExports";
import { Colors } from "@/constants/Colors";
import { generalTexts } from "@/constants/texts";

export default function GarageHeader({
  userProfilePic,
    car,
  colorScheme,
  language,
}: {
  userProfilePic?: string;
  car: Car
} & CommonStaticElementProps) {
  return (
    <View className="flex flex-row w-full h-64 rounded-b-xl overflow-hidden">
      {userProfilePic && <ImageBackground
        className=" h-full basis-7/12 opacity-70 "
        source={{ uri: userProfilePic }}
      />}
      <View
        className={`flex primary z-20 ${userProfilePic && "basis-5/12"} w-full flex-col h-full`}
        style={{
          boxShadow: `0px 10px 50px 50px ${Colors[colorScheme].primary}`,
          
        }}
      >
        <ImageBackground
          className="flex-1 flex justify-center items-center "
          resizeMode="cover"
          source={Images.banner_placeholder}
        >
            <ThemedText className="text-3xl font-bold">{car.manufacturer}</ThemedText>
            <ThemedText className="txl">{car.model}</ThemedText>
            <View>
                <ThemedText className="text-xl">{car.horsepower} {generalTexts.profileAttributes.cars.horsepower[language]}</ThemedText>
            </View>
        </ImageBackground>
      </View>
    </View>
  );
}

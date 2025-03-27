import { getCarImage } from "@/components/graphics/cars";
import ThemedText from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { generalTexts } from "@/constants/texts";
import { CommonStaticElementProps } from "@/constants/types";
import { getCarByCarId } from "@/lib/ApiCalls/CarApiCalls";
import { Car } from "@/lib/entity/Car";
import { Images } from "@/lib/staticAssetExports";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { VehicleMediaProps } from "./props";
import Avatar from "@/components/ui/Avatar";

export default function VehicleCard({ sender, avatar, vehicleId, colorScheme, language }: CommonStaticElementProps & VehicleMediaProps) {
  const [vehicle, setVehicle] = useState<Car | null>(null);

  async function init() {
    const res = await getCarByCarId(vehicleId.toString());
    if (res) {
      setVehicle(res);
    }
  }
  useEffect(() => {
    init()
  }, [])
  if (vehicle)
  return (
<View className="relative">
    <TouchableOpacity  className={`flex my-2 flex-col overflow-hidden primary w-2/3 ${sender ? 'self-end  mr-2' : 'self-start  ml-16'} rounded-xl`} onPress={() => router.push({ pathname: '/(garage)/[id]', params: { id: vehicle.id } })}>
      <ImageBackground source={Images.banner_placeholder} style={{ width: '100%', justifyContent: "center", display: "flex", alignItems: "center"}}>
          <View className="scale-150 flex items-center justify-center">
            
            {getCarImage(vehicle.type, colorScheme, 100, 70, 1.8)}
          </View>
      </ImageBackground>
        <View className="p-2 flex items-center flex-row justify-evenly flex-wrap" style={{
          boxShadow: `0px 0px 15px 15px ${Colors[colorScheme].primary}`
        }}>
          <View className={`basis-full p-1 flex gap-2 items-center justify-center rounded-xl ${sender ? "secondary" : "highlight-themed"}`}>

          <ThemedText className="txl">
            {vehicle.manufacturer}
          </ThemedText>
          <ThemedText className="text-lg">
            {vehicle.model}
          </ThemedText>
        </View>
      <View className="flex w-full flex-row justify-between my-2">
        <View className={`flex flex-col basis-[32%] ${ sender ? "secondary" : "highlight-themed"} p-1 rounded-xl items-center`}>
          <MaterialCommunityIcons name="horse" size={32} color={Colors[colorScheme].text} />
          <ThemedText className="txl">{vehicle.horsepower} {generalTexts.profileAttributes.cars.horsepower[language]}</ThemedText>
        </View>
        <View className={`flex flex-col basis-[32%] ${ sender ? "secondary" : "highlight-themed"} p-1 rounded-xl items-center`}>
        
          <MaterialCommunityIcons name="engine" size={32} color={Colors[colorScheme].text} />
          <ThemedText className="txl" >{vehicle.displacement/10} l</ThemedText>
        </View>
        <View className={`flex flex-col basis-[32%] ${ sender ? "secondary" : "highlight-themed"} p-1 rounded-xl items-center`}>
      
          <MaterialCommunityIcons name="calendar" size={32} color={Colors[colorScheme].text} />
          <ThemedText className="txl" >{vehicle.productionYear}</ThemedText>
        </View>
      </View>
          </View>
    </TouchableOpacity>
            {avatar && !sender && <Avatar className='w-12 h-12 secondary absolute bottom-2' image={avatar.profileImg} nickname={avatar.nickname} />}
    
          </View>
  );
}
import { getCarImage } from "@/components/graphics/cars";
import ThemedText from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { CommonStaticElementProps } from "@/constants/types";
import { getCarByCarId } from "@/lib/ApiCalls/CarApiCalls";
import { Car } from "@/lib/entity/Car";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function VehicleCard({ sender, vehicleId, colorScheme, language }: CommonStaticElementProps & { vehicleId: number, sender: boolean }) {
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
    <TouchableOpacity className={`flex my-2 flex-col overflow-hidden w-2/3 ${sender ? 'self-end secondary mr-2' : 'self-start highlight-themed ml-16'} rounded-xl px-6 py-2`} onPress={() => router.push({ pathname: '/(garage)/[id]', params: { id: vehicle.id } })}>
      <View >
        {
            getCarImage(vehicle.type, colorScheme, 230, 70, 1.8)
        }
        <View>
          <ThemedText className="text-xl font-bold">
            {vehicle.manufacturer}
          </ThemedText>
          <ThemedText>
            {vehicle.model}
          </ThemedText>
        </View>
      </View>
      <View className="flex w-full flex-row p-4 justify-between gap-6">
        <View >
          <MaterialCommunityIcons name="horse" size={32} color={Colors[colorScheme].text} />
          <ThemedText className="text-lg">{vehicle.horsepower}</ThemedText>
        </View>
        <View >
          <MaterialCommunityIcons name="engine" size={32} color={Colors[colorScheme].text} />
          <ThemedText className="text-lg" >{vehicle.displacement}</ThemedText>
        </View>
        <View >
          <MaterialCommunityIcons name="calendar" size={32} color={Colors[colorScheme].text} />
          <ThemedText className="text-lg" >{vehicle.productionYear}</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
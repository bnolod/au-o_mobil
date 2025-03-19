import { getCarImage } from "@/components/graphics/cars";
import ThemedText from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { CommonStaticElementProps } from "@/constants/types";
import { getCarByCarId } from "@/lib/ApiCalls/CarApiCalls";
import { Car } from "@/lib/entity/Car";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View } from "react-native";

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
    <View className={`${sender ? "items-end" : "items-start highlight-themed"}`} >
      <View >
        {
            getCarImage(vehicle.type, colorScheme, 230, 70, 1.8)
        }
        <View>
          <ThemedText>
            {vehicle.manufacturer}
          </ThemedText>
          <ThemedText>
            {vehicle.model}
          </ThemedText>
        </View>
      </View>
      <View >
        <View >
          <MaterialCommunityIcons name="horse" size={24} color={Colors[colorScheme].text} />
          <ThemedText >{vehicle.horsepower}</ThemedText>
        </View>
        <View >
          <MaterialCommunityIcons name="engine" size={24} color={Colors[colorScheme].text} />
          <ThemedText >{vehicle.displacement}</ThemedText>
        </View>
        <View >
          <MaterialCommunityIcons name="calendar" size={24} color={Colors[colorScheme].text} />
          <ThemedText >{vehicle.productionYear}</ThemedText>
        </View>
      </View>
    </View>
  );
}
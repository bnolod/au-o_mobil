import { getCarImage } from '@/components/graphics/cars';
import ThemedText from '@/components/ui/ThemedText';
import { generalTexts } from '@/constants/texts';
import { CommonStaticElementProps } from '@/constants/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { PostVehicleBannerProps } from './props';

export default function PostVehicleBanner({
  preview,
  vehicle,
  colorScheme,
  language,
}: PostVehicleBannerProps & CommonStaticElementProps) {
  return (
    <Pressable
      onPress={
        preview
          ? () => {}
          : () =>
              router.push({
                pathname: '/(garage)/[id]',
                params: { id: vehicle.id },
              })
      }
      className=" primary py-3 bg-background-dark/75  w-screen absolute  bottom-0"
    >
      <View className="flex flex-row items-center justify-between px-6">
        <View className="scale-125">{getCarImage(vehicle.type, colorScheme, 52, 36, 3)}</View>
        <View className="flex flex-col w-8/12 truncate pl-2">
          <ThemedText className="text-md font-black truncate text-highlight-light">{vehicle.manufacturer}</ThemedText>
          <ThemedText className="text-md truncate text-highlight-light">{vehicle.model}</ThemedText>
        </View>
        <View className="">
          {/* <ThemedText>{vehicle.productionYear}</ThemedText> */}
          {/* <ThemedText>
            {vehicle.horsepower} {generalTexts.profileAttributes.cars.horsepower[language]}
          </ThemedText>
          <ThemedText>{vehicle.displacement / 10} l</ThemedText> */}
        </View>
        <MaterialCommunityIcons name="chevron-right" size={32} color={colorScheme === 'dark' ? 'white' : 'black'} />
      </View>
    </Pressable>
  );
}

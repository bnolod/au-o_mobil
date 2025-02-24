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
      className="w-full h-12 primary rounded-t-xl "
    >
      <View className="post-vehicle-container">
        <View className="scale-125">{getCarImage(vehicle.type, colorScheme, 52, 36, 3)}</View>
        <View className="post-vehicle-data">
          <ThemedText className="tlg text-highlight-light">{vehicle.manufacturer}</ThemedText>
          <ThemedText className="text-lg text-highlight-light">{vehicle.model}</ThemedText>
        </View>
        <View className="post-vehicle-misc-data">
          <ThemedText>{vehicle.productionYear}</ThemedText>
          <ThemedText>
            {vehicle.horsepower} {generalTexts.profileAttributes.cars.horsepower[language]}
          </ThemedText>
          <ThemedText>{vehicle.displacement / 10} l</ThemedText>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={32} color={colorScheme === 'dark' ? 'white' : 'black'} />
      </View>
    </Pressable>
  );
}

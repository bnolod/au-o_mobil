import { Pressable, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { Images } from '@/lib/staticAssetExports';
import { Colors } from '@/constants/Colors';
import { CommonStaticElementProps } from '@/constants/types';
import { getCarImage } from '@/components/graphics/cars';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { generalTexts } from '@/constants/texts';
import { GarageItemProps } from './props';
import { ImageBackground } from 'expo-image';
export default function GarageItem({
  car,
  language,
  colorScheme = 'dark',
  onPress,
  onSelect,
  isOwner,
}: GarageItemProps & CommonStaticElementProps) {
  return (
    <>
      <Pressable
        onPress={onPress}
        className=" h-24 flex flex-row dark:bg-backdrop-secondary-dark justify-between rounded-xl mt-3 shadow-md shadow-[#00000022] "
      >
        <View className="">
          <ImageBackground contentFit="cover" style={{ flex: 1 }} source={Images.banner_placeholder}>
            <View className="garage-item-car-type-display">{getCarImage(car.type, colorScheme, 135, 100, 4.5)}</View>
          </ImageBackground>
        </View>

        <View
          className="flex flex-col flex-1 p-4 justify-center overflow-hidden"
          style={{
            shadowColor: Colors[colorScheme].secondary,
            shadowOffset: {
              width: -20,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 20,
          }}
        >
          <ThemedText className="text-lg font-bold truncate">{car.manufacturer}</ThemedText>
          <View className="garage-item-misc-data">
            <ThemedText className="text-md truncate">{car.model}</ThemedText>
          </View>
          <View className="flex flex-row gap-4 overflow-hidden pt-2">
            <ThemedText className="font-bold muted "> {car.productionYear}</ThemedText>
            <ThemedText className="muted  font-light">
              {car.horsepower} {generalTexts.profileAttributes.cars.horsepower[language]}
            </ThemedText>
            <ThemedText className="muted font-light">{car.displacement / 10}l</ThemedText>
          </View>
        </View>
        {isOwner && ( 
          <Pressable
            className=" p-2 absolute right-2 top-2 bg-highlight/25 rounded-xl"
            hitSlop={14}
            onPress={() => {
              router.push({
                pathname: '/(garage)/edit/[id]',
                params: {
                  id: car.id,
                },
              });
            }}
          >
            <MaterialCommunityIcons name="pencil-outline" size={24} color={Colors[colorScheme].text} />
          </Pressable>
        )}
      </Pressable>
    </>
  );
}

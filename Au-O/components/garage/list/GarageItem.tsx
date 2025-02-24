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
      <Pressable onPress={onPress} className="garage-item">
        <View className="garage-item-display ">
          <ImageBackground contentFit="cover" style={{flex: 1}} source={Images.banner_placeholder}>
            <View className="garage-item-car-type-display">{getCarImage(car.type, colorScheme, 180, 200, 4.5)}</View>
          </ImageBackground>
        </View>

        <View
          className="garage-item-data-container"
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
          <ThemedText className="t2x">
            {car.manufacturer}
            <ThemedText className="text-lg font-light muted "> {car.productionYear}</ThemedText>
          </ThemedText>
          <View className="garage-item-misc-data">
            <ThemedText className="tlg">{car.model}</ThemedText>
            <ThemedText className="muted  font-semibold">
              {car.horsepower} {generalTexts.profileAttributes.cars.horsepower[language]}
            </ThemedText>
            <ThemedText className="muted ">{car.displacement / 10}l</ThemedText>
          </View>
        </View>
        {isOwner && (
          <Pressable
            className=" p-4 right-2 absolute"
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
            <MaterialCommunityIcons name="pencil-outline" size={36} color={Colors[colorScheme].text} />
          </Pressable>
        )}
      </Pressable>
    </>
  );
}

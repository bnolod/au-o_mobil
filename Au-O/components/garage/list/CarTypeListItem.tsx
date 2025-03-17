/**
 * Autó típus kilistázási elem
 * @module garage/list/CarTypeListItem
 * @category Components
 */

import { Pressable, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { Images } from '@/lib/staticAssetExports';
import { getCarImage } from '@/components/graphics/cars';
import { Colors } from '@/constants/Colors';
import { CarTypeListItemProps } from './props';
import { ImageBackground } from 'expo-image';
/**
 * Az érvényes autó típusok renderelésért felelős komponens
 * @property {CarType} type Autó típus
 * @property {string} colorScheme Szín séma
 * @property {Function} onPress Kattintás esemény
 * @returns 
 */
export default function CarTypeListItem({ onPress, type, colorScheme }: CarTypeListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        shadowColor: Colors[colorScheme].background,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
      }}
    >
      <View className="car-type-list-item">
        <View className="car-type-list-item-image-container">
          <ImageBackground
          style={{flex: 1, display: "flex", justifyContent: "center", borderRadius: 300, alignItems: "center", width: "100%", height: "100%"}}
            contentFit="cover"
            className="car-type-list-item-placeholder-banner"
            source={Images.banner_placeholder}
          >
            <View className="absolute left-2">{getCarImage(type, colorScheme, 170, 140, 3.5)}</View>
          </ImageBackground>
        </View>

        <View
          className=""
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
          <ThemedText className="t2x">{type.toString()}</ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

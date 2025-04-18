/**
 * GarageHeader.tsx
 * A garázs fejléce
 * @module garage/base/GarageHeader
 * @category Components
 */

import { View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { CommonStaticElementProps } from '@/constants/types';
import { Images } from '@/lib/staticAssetExports';
import { Colors } from '@/constants/Colors';
import { generalTexts } from '@/constants/texts';
import { Car } from '@/lib/entity/Car';
import { getCarImage } from '@/components/graphics/cars';
import { ImageBackground } from 'expo-image';
/**
 * 
 * @property {string} userProfilePic Felhasználói profilkép
 * @property {Car} car Autó
 * @returns {React.JSX.Element}
 */
export default function GarageHeader({
  userProfilePic,
  car,
  colorScheme,
  language,
}: {
  userProfilePic?: string;
  car: Car;
} & CommonStaticElementProps) {
  return (
    <View className="garage-header">
      {userProfilePic && <ImageBackground className="garage-profile-display" source={{ uri: userProfilePic }} />}
      <View
        className={`garage-profile-display-image ${userProfilePic && 'basis-5/12'} `}
        style={{
          boxShadow: `0px 10px 50px 50px ${Colors[colorScheme].primary}`,
        }}
      >
        <ImageBackground
          className="garage-profile-car-type-display"
          contentFit="cover"
          source={Images.banner_placeholder}
        >
          <ThemedText className="text-5xl font-bold">{car.manufacturer}</ThemedText>
          <ThemedText className="text-4xl font-semibold">{car.model}</ThemedText>
          <View>
            <ThemedText className="text-xl">
              {car.horsepower} {generalTexts.profileAttributes.cars.horsepower[language]}
            </ThemedText>
          </View>
          <View className="">{getCarImage(car.type, colorScheme, 140*1.2, 85*1.2, 4)}</View>
        </ImageBackground>
      </View>
    </View>
  );
}

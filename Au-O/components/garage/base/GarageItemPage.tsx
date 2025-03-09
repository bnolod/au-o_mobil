import { View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import PostGrid from '@/components/social/base/PostGrid';
import CollapsibleText from '@/components/ui/CollapsibleText';
import { getCarImage } from '@/components/graphics/cars';
import { CommonStaticElementProps } from '@/constants/types';
import { generalTexts, SocialTexts } from '@/constants/texts';
import { router } from 'expo-router';
import { GarageItemPageProps } from './props';
import { Images } from '@/lib/staticAssetExports';
import { ImageBackground } from 'expo-image';
import GradientBackground from '@/components/ui/GradientBackground';

export default function GarageItemPage({
  colorScheme,
  isOwner,
  car,
  language,
  profileImg,
}: GarageItemPageProps & CommonStaticElementProps) {
  return (
    <View className="garage-page">
      
      <GradientBackground colors={['#EF1A2D', 'transparent']}>
      <View className="rounded-b-3xl">
      <View className="h-64">

          <View className="flex items-center p-5">{getCarImage(car.type, colorScheme, 140 * 2, 85 * 2, 4)}</View>
      </View>
        <View className="flex flex-col items-center w-full rounded-xl">
          <ThemedText className="text-3xl font-bold py-2">{car.manufacturer}</ThemedText>
          <ThemedText className="text-2xl py-2">{car.model}</ThemedText>
          {isOwner && (
            <MaterialCommunityIcons
              name="pencil"
              size={24}
              color={Colors[colorScheme!].tabIconDefault}
              onPress={() =>
                router.push({
                  pathname: '/(garage)/edit/[id]',
                  params: { id: car.id },
                })
              }
            />
          )}
        </View>
        <View className="garage-description-container">
          <CollapsibleText className="text-lg text-center my-2">{car.description}</CollapsibleText>
        </View>
      </View>
      </GradientBackground>
      <View className="flex flex-col px-5 ">
        <View className="flex flex-row px-5 py-2">
          <MaterialCommunityIcons name="horse" size={42} color={Colors[colorScheme!].text} />
          <ThemedText className="text-2xl self-center mx-2"> Ló: 
            {car.horsepower} {generalTexts.profileAttributes.cars.horsepower[language]}
          </ThemedText>
        </View>
        <View className="flex flex-row px-5 py-2">
          <MaterialCommunityIcons name="engine-outline" size={42} color={Colors[colorScheme!].text} />
          <ThemedText className="text-2xl self-center mx-2">{car.displacement / 10} l</ThemedText>
        </View>
        <View className="flex flex-row px-5 py-2">
          <MaterialCommunityIcons name="calendar" size={42} color={Colors[colorScheme!].text} />
          <ThemedText className="text-2xl self-center mx-2">{car.productionYear}</ThemedText>
        </View>
      </View>

      <View className="divider" />
      <ThemedText className="mx-auto text-2xl mb-2 font-bold">
        {SocialTexts.creation.car.featuredPosts[language]}
      </ThemedText>
      <PostGrid colorScheme={colorScheme!} language={language} posts={[]} />
    </View>
  );
}

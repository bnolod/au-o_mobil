/**
 * A garázs oldala
 * @module garage/base/GaragePage
 * @category Components
 */

import { ScrollView, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import PostGrid from '@/components/social/base/PostGrid';
import CollapsibleText from '@/components/ui/CollapsibleText';
import { getCarImage } from '@/components/graphics/cars';
import { CommonStaticElementProps } from '@/constants/types';
import { generalTexts, PostCreationTexts, SocialTexts } from '@/constants/texts';
import { router } from 'expo-router';
import { GarageItemPageProps } from './props';
import GradientBackground from '@/components/ui/GradientBackground';
/**
 * 
 * @property {string} colorScheme Szín séma
 * @property {boolean} isOwner Tulajdonos-e
 * @property {Car} car Autó
 * @property {Post[]} posts Posztok
 * @property {"HU" | "EN"} language Nyelv
 */
export default function GarageItemPage({
  colorScheme,
  isOwner,
  car,
  posts,
  language,
}: GarageItemPageProps & CommonStaticElementProps) {
  return (
    <ScrollView  className="garage-page">
      
      <GradientBackground colors={['#EF1A2D', 'transparent']}>
      <View className="rounded-b-3xl">
      <View className="h-64">

          <View className="flex w-full ml-5 items-center">{getCarImage(car.type, colorScheme, 140 *2.1 , 85 * 3, 3)}</View>
      </View>
        <View className="flex flex-col pl-6 pr-2 w-full rounded-xl">
          <View className='flex flex-row justify-between pr-6'>
          <ThemedText className="text-6xl font-bold truncate">{car.manufacturer}</ThemedText>
          {isOwner && (
            <MaterialCommunityIcons
              name="pencil"
              className='self-center'
              size={28}
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
          <ThemedText className="text-4xl pl-2">{car.model}</ThemedText>

        </View>
        <View className="garage-description-container pl-6 pt-2">
        <ThemedText className=" opacity-50 text-md -mb-3">{PostCreationTexts.form.description.label[language]}</ThemedText>
          <CollapsibleText className="text-lg ">{car.description}</CollapsibleText>
        </View>
      </View>
      </GradientBackground>
      <View className="flex flex-col px-5 ">
        <View className="flex flex-row px-5 py-2">
          <MaterialCommunityIcons name="horse" size={42} color={Colors[colorScheme!].text} />
          <ThemedText className="text-2xl self-center mx-2"> 
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

      {posts.length > 0 && <PostGrid colorScheme={colorScheme!} language={language} posts={posts} />}
    </ScrollView>
  );
}

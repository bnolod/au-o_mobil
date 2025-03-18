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
    <ScrollView className="garage-page">
      {/* <GradientBackground colors={['#EF1A2D', 'transparent']}> */}
      <View className="py-4 flex flex-row secondary mx-5 mt-safe-offset-1 rounded-xl shadow-md shadow-[#00000066] ">
            {isOwner && (
              <MaterialCommunityIcons
                name="pencil"
                className="self-center absolute z-50 aspect-square highlight-themed p-1 rounded-xl muted top-2 right-2"
                size={28}
                color={Colors[colorScheme!].text}
                onPress={() =>
                  router.push({
                    pathname: '/(garage)/edit/[id]',
                    params: { id: car.id },
                  })
                }
              />
            )}
        <View className="self-center pl-4">
          <ThemedText className="text-3xl font-bold truncate">{car.manufacturer}</ThemedText>
          <ThemedText className="text-2xl">{car.model}</ThemedText>
          <View className="flex flex-row justify-between pr-6">
          </View>
        </View>
        <View className="flex items-center self-center ml-auto">{getCarImage(car.type, colorScheme, 180, 85, 3)}</View>
      </View>

      {/* </GradientBackground> */}
      <View className="flex flex-col px-5 gap-4 my-4 ">
        <View className="flex flex-row px-5 justify-between py-2 primary rounded-xl shadow-md shadow-[#00000066] ">
          <MaterialCommunityIcons name="horse" size={42} color={Colors[colorScheme!].text} />
          <ThemedText className="text-2xl self-center mx-2">
            {car.horsepower} {generalTexts.profileAttributes.cars.horsepower[language]}
          </ThemedText>
        </View>
        <View className="flex flex-row px-5 justify-between py-2 primary rounded-xl shadow-md shadow-[#00000066]">
          <MaterialCommunityIcons name="engine-outline" size={42} color={Colors[colorScheme!].text} />
          <ThemedText className="text-2xl self-center mx-2">{car.displacement / 10} l</ThemedText>
        </View>
        <View className="flex flex-row px-5 justify-between py-2 primary rounded-xl shadow-md shadow-[#00000066]">
          <MaterialCommunityIcons name="calendar" size={42} color={Colors[colorScheme!].text} />
          <ThemedText className="text-2xl self-center mx-2">{car.productionYear}</ThemedText>
        </View>

        <View className="pt-8 pb-5 px-5 primary rounded-xl shadow-md shadow-[#00000066] ">
          <ThemedText className=" opacity-50 text-md absolute top-0 ml-4 mt-2">
            {PostCreationTexts.form.description.label[language]}
          </ThemedText>
          <CollapsibleText className="text-lg ">{car.description}</CollapsibleText>
        </View>
      </View>

      <View className="divider" />
      <ThemedText className="mx-auto text-2xl mb-2 font-bold">
        {SocialTexts.creation.car.featuredPosts[language]}
      </ThemedText>

      {posts.length > 0 && <PostGrid colorScheme={colorScheme!} language={language} posts={posts} />}
      {!posts ||
        (posts.length === 0 && (
          <View className="flex flex-col gap-2 items-center my-6">
            <MaterialCommunityIcons name="car-brake-alert" size={128} color={Colors.highlight[colorScheme]} />
            <ThemedText>{SocialTexts.creation.car.carHasNoPosts[language]}{' '}</ThemedText>
          </View>
        ))}
    </ScrollView>
  );
}

import { View } from 'react-native';
import GarageHeader from './GarageHeader';
import ThemedText from '@/components/ui/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import PostGrid from '@/components/social/PostGrid';
import CollapsibleText from '@/components/ui/CollapsibleText';
import { getCarImage } from '@/components/graphics/cars';
import { CommonStaticElementProps } from '@/constants/types';
import { generalTexts, SocialTexts  } from '@/constants/texts';
import { router } from 'expo-router';
import { GarageItemPageProps } from './props';

export default function GarageItemPage({
  colorScheme,
  isOwner,
  car,
  language,
  profileImg,
}: GarageItemPageProps & CommonStaticElementProps) {
  return (
    <View className="garage-page">
      <View className="secondary">
        <GarageHeader colorScheme={colorScheme!} car={car} language={language} userProfilePic={profileImg} />
        <View className="garage-page-container">
          <View className="mb-5">{getCarImage(car.type, colorScheme, 140, 85, 4)}</View>
          <View className="garage-page-data-container">
            <ThemedText className="text-3xl font-bold">{car.manufacturer}</ThemedText>
            <ThemedText className="txl">{car.model}</ThemedText>
            {isOwner && (
              <MaterialCommunityIcons
                name="pencil"
                size={24}
                color={Colors[colorScheme!].text}
                onPress={() =>
                  router.push({
                    pathname: '/(garage)/edit/[id]',
                    params: { id: car.id },
                  })
                }
              />
            )}
          </View>
        </View>
        <View className="garage-page-attribute-container">
          <View className="garage-page-attribute">
            <MaterialCommunityIcons name="speedometer" size={42} color={Colors[colorScheme!].text} />
            <ThemedText className="t2x">
              {car.horsepower} {generalTexts.profileAttributes.cars.horsepower[language]}
            </ThemedText>
          </View>
          <View className="garage-page-attribute">
            <MaterialCommunityIcons name="engine-outline" size={42} color={Colors[colorScheme!].text} />
            <ThemedText className="t2x">{car.displacement / 10} l</ThemedText>
          </View>
        </View>
        <View className="garage-description-container">
          <CollapsibleText className="text-lg text-center my-2">{car.description}</CollapsibleText>
        </View>
        <View className="divider" />
        <ThemedText className="mx-auto text-2xl mb-2 font-bold">
          {SocialTexts.creation.car.featuredPosts[language]}
        </ThemedText>
        <PostGrid colorScheme={colorScheme!} language={language} posts={[]} />
      </View>
    </View>
  );
}

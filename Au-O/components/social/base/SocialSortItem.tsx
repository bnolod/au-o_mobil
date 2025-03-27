/**
 * Közösségi rendezés elem tulajdonságok
 * @module social/base/SocialSortItem
 * @category Components
*/
import { Pressable, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { Images } from '@/lib/staticAssetExports';
import { Colors } from '@/constants/Colors';
import { SocialSortItemProps } from './props';
import { ImageBackground } from 'expo-image';
/**
 * @param {SocialSortItemProps} props - Tulajdonságok
 */
export default function SocialSortItem({ bannerImage, name, memberCount, onSelect, colorScheme, alias }: SocialSortItemProps) {
  return (
    <Pressable onPress={onSelect} className="social-sort-item-container my-2">
      <View className="social-sort-image">
        <ImageBackground
          contentFit="cover"
          style={{ flex: 1, display: "flex", justifyContent: "center" }}
          source={bannerImage ? bannerImage :  Images.banner_placeholder}
        >
          {
            !bannerImage &&
            <ThemedText className="txl font-black ml-2">{alias?.toUpperCase()}</ThemedText>
          }
        </ImageBackground>
      </View>
      <View
        className=" h-full flex  justify-center gap-2 "
        style={{
          boxShadow: `0px 0px 15px 30px ${Colors[colorScheme].secondary}`,
          /* shadowColor: Colors[colorScheme].secondary,
          shadowOffset: {
            width: -10,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 0, */
        }}
      >
        <ThemedText className="text-2xl">{name}</ThemedText>
        <ThemedText className="tlg">
          {name === 'My Groups' ? 'All your groups' : memberCount} {name !== 'My Groups' && 'members'}
        </ThemedText>
      </View>
    </Pressable>
  );
}

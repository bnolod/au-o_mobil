import { Pressable } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { Images } from '@/lib/staticAssetExports';
import { formatNumber } from '@/lib/functions';
import { CommonStaticElementProps } from '@/constants/types';
import { router } from 'expo-router';
import { SocialBannerProps } from './props';
import { Image, ImageBackground } from 'expo-image';
import { Colors } from '@/constants/Colors';
import { EventTexts, GroupTexts } from '@/constants/texts';

export default function SocialBanner({
  name,
  image,
  id,
  type = 'GROUP',
  count = 0,
  language,
  header = false,
  colorScheme,
  onPress,
}: SocialBannerProps & CommonStaticElementProps) {
  return (
    <Pressable
      onPress={
        onPress
          ? onPress
          : () => {
              if (type === 'EVENT')
                router.push({
                  pathname: `/(events)/[id]`,
                  params: {
                    id,
                  },
                });
              else
                router.push({
                  pathname: `/(groups)/[id]`,
                  params: {
                    id,
                  },
                });
            }
      }
      style={{
        aspectRatio: header ? 1.7 : 3 / 1,
      }}
      className="social-banner-container"
    >
      <ImageBackground
        className="social-banner-image-placeholder"
        source={Images.banner_placeholder}
        contentFit="cover"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopEndRadius: 12,
          borderTopStartRadius: 12,
          backgroundColor: Colors[colorScheme].secondary,
          
          gap: 8,
          marginHorizontal: 'auto',
        }}
      >
        {count !== null && (
          <ThemedText className="social-banner-image-text">
            {formatNumber(count, language)} {type === 'EVENT' ? EventTexts.buttons.attend.attendeeCount[language] : GroupTexts.page.memberCount[language]}
          </ThemedText>
        )}
        {!image && !name && <ThemedText className="text-3xl">???</ThemedText>}
        {!image && name && (
          <ThemedText className={`${type === "GROUP" ? "text-5xl" : "text-3xl"} font-bold`}>
            {' '}
            {name.length > 20 && name.split(' ').length > 4 ? name.split(' ') : name}
          </ThemedText>
        )}
        {image && name && (
          <Image
            style={{
              height: '100%',
              width: '100%',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
            contentFit="cover"
            source={{ uri: image }}
          />
        )}
      </ImageBackground>
    </Pressable>
  );
}

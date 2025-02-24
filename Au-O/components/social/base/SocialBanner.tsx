import { Image, ImageBackground, Pressable, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { Images } from '@/lib/staticAssetExports';
import { formatNumber } from '@/lib/functions';
import { CommonStaticElementProps } from '@/constants/types';
import { router } from 'expo-router';
import { SocialBannerProps } from './props';

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
                  pathname: `/(root)/(events)/[id]`,
                  params: {
                    id,
                  },
                });
              else
                router.push({
                  pathname: `/(root)/(groups)/[id]`,
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
        resizeMode="cover"
      >
        {count !== null && (
          <ThemedText className="social-banner-image-text">
            {formatNumber(count, language)} {type === 'EVENT' ? 'attendees' : 'members'}
          </ThemedText>
        )}
        {!image && !name && <ThemedText className="text-3xl">???</ThemedText>}
        {!image && name && (
          <ThemedText className="text-5xl font-bold">
            {' '}
            {name.length > 20 && name.split(' ').length > 4 ? name.split(' ') : name}
          </ThemedText>
        )}
        {image && name && <Image className="social-banner-image" resizeMode="cover" source={{ uri: image }} />}
      </ImageBackground>
    </Pressable>
  );
}

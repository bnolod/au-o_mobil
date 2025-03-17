/**
 * Avatar komponens tulajdonságai
 * @module ui/avatar
 * @category Component
 */
import { AvatarProps } from './props';
import { View } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import ThemedText from './ThemedText';
import { Images } from '@/lib/staticAssetExports';

export default function Avatar({ image, className, nickname, height = 14, width = 14 }: AvatarProps) {
  if (image) {
    return <View className={`w-${width} h-${height} ${className} rounded-full`}>
      <Image source={{ uri: image }} style={{borderRadius: 400, width: "100%", height: "100%" }}   />
      </View>
  } else if (!image && nickname) {
    return (
      <View
        className={`${className} ${
          className ? className : 'bg-backdrop-secondary dark:bg-backdrop-secondary-dark overflow-hidden'
        } w-${width} h-${height} flex items-center justify-center text-center rounded-full`}
      >
        <ImageBackground
          source={Images.avatar_placeholder}
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 300,
            overflow: 'hidden',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
          contentFit="cover"
          className="flex-1 justify-center items-center rounded-full  w-full h-full"
        >
          <ThemedText className="text-lg font-black">
            {nickname[0].toUpperCase()}
            {nickname[1].toUpperCase()}
            {nickname[2].toUpperCase()}
          </ThemedText>
        </ImageBackground>
      </View>
    );
  } else if (!image && !nickname) {
    return (
      <View
        className={
          className
            ? className
            : ' bg-backdrop-secondary dark:bg-backdrop-secondary-dark w-14 h-14 flex items-center justify-center text-center rounded-full'
        }
      >
        <ThemedText className="text-lg font-black">???</ThemedText>
      </View>
    );
  }
}

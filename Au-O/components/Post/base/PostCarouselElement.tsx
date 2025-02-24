import { Image } from 'expo-image';
import ThemedText from '../../ui/ThemedText';
import React from 'react';
import { PostCarouselElementProps } from '@/constants/types';
import PostImageFallback from '@/components/ui/PostImageFallback';
import { Images } from '@/lib/staticAssetExports';
export default function PostCarouselElement({ images, index }: PostCarouselElementProps) {
  return (
    <>
      <ThemedText className="post-image-index">
        {index + 1}/{images.length}
      </ThemedText>

      <Image
        source={{ uri: images[index] }}
        transition={{ duration: 0.4, effect: 'cross-dissolve', timing: 'ease-out' }}
        allowDownscaling
        placeholder={Images.avatar_placeholder}
        cachePolicy={'none'}
        contentFit="contain"
        style={{ flex: 1 }}
      />
    </>
  );
}

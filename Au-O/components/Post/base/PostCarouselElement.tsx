import { Image } from 'react-native';
import ThemedText from '../../ui/ThemedText';
import React from 'react';
import { PostCarouselElementProps } from '@/constants/types';
export default function PostCarouselElement({ images, index }: PostCarouselElementProps) {
  return (
    <>
      <ThemedText className="post-image-index">
        {index + 1}/{images.length}
      </ThemedText>

      <Image source={{ uri: images[index] }} className="flex-1" resizeMode="contain" />
    </>
  );
}


/**
 * Poszt rács
 * @module social/base/PostGrid
 * @category Component
 */
        
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { MasonryFlashList } from '@shopify/flash-list';
import NoPostsFound from '@/components/Post/base/NoPostsFound';
import { CommonStaticElementProps } from '@/constants/types';
import { Colors } from '@/constants/Colors';
import { Post } from '@/lib/entity/Post';
import { Image } from 'expo-image';
import { Image as RNImage } from 'react-native';

export default function PostGrid({ colorScheme, language, posts }: { posts: Post[] } & CommonStaticElementProps) {
  return (
    <View className="mt-4">
      <MasonryFlashList
        estimatedItemSize={250} // Estimates item sizes for smoother rendering
        keyExtractor={(item) => item.postId + '_'}
        ListEmptyComponent={() => <NoPostsFound language={language} />}
        data={posts && posts.length > 0 ? [...posts].sort((a, b) => new Date(b.dateOfCreation).getTime() - new Date(a.dateOfCreation).getTime()) : []}
        renderItem={({ item }) => <PostItem item={item} colorScheme={colorScheme} />}
        numColumns={2} // Masonry effect with 2 columns
      />
    </View>
  );
}

function PostItem({ item, colorScheme }: { item: Post; colorScheme: string }) {
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const imageUrl = item.images[0]?.url;

  if (imageUrl && !imageSize) {
    RNImage.getSize(
      imageUrl,
      (width, height) => setImageSize({ width, height }),
      () => setImageSize({ width: 200, height: 300 }) // Default if unable to get image size
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 6, paddingBottom: 8 }}>
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/(post)/page/[id]',
            params: { id: item.postId },
          })
        }
        style={{
          shadowColor: Colors[colorScheme!].background,
          shadowOffset: { width: 1, height: 5 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        }}
      >
        {imageSize && (
          <Image
            contentFit="cover"
            style={{
              width: "100%", // Full width inside the column
              height: undefined, // Adjust height dynamically
              aspectRatio: imageSize.width > imageSize.height ? 1 : 5/6, // Only 2 size options
              borderRadius: 12,
              backgroundColor: Colors[colorScheme!].primary,
            }}
            source={{ uri: imageUrl }}
          />
        )}
      </Pressable>
    </View>
  );
}

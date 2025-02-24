import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import PostCarouselElement from './PostCarouselElement';
import { Image } from 'expo-image';
import PostImageFallback from '@/components/ui/PostImageFallback';
import { Images } from '@/lib/staticAssetExports';
export default function PostImage({ images }: { images: string[] }) {
  if (images.length === 0 || images.length > 10) return <PostImageFallback />;
  if (images.length === 1)
    return (
      <Image
        transition={{ duration: 0.4, effect: 'cross-dissolve', timing: 'ease-out' }}
        allowDownscaling
        cachePolicy={'none'}
        placeholder={Images.avatar_placeholder}
        placeholderContentFit='cover'
        source={{ uri: images[0] }}
        style={{ flex: 1 }}
        contentFit="contain"
      />
    );
  else
    return (
      <Carousel
        width={Dimensions.get('screen').width}
        panGestureHandlerProps={{
          minDist: 15,
        }}
        data={images}
        loop={false}
        snapEnabled
        renderItem={({ index }) => <PostCarouselElement images={images} index={index} />}
      />
    );
}

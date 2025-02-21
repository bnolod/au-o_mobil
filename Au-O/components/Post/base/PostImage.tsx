import { Dimensions, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import PostCarouselElement from "./PostCarouselElement";

export default function PostImage({images}: {images: string[]}) {
  if (images.length === 0 || images.length > 10) return null;
  if (images.length === 1)
    return (
      <Image
        source={{ uri: images[0] }}
        className="flex-1"
        resizeMode="contain"
      />
    );
  else
    return (
      <Carousel
        width={Dimensions.get("screen").width}
        panGestureHandlerProps={{
          minDist: 30,
        }}
        data={images}
        loop={false}
        snapEnabled
        renderItem={({ index }) => (
          <PostCarouselElement images={images} index={index} />
        )}
      />
    );
}

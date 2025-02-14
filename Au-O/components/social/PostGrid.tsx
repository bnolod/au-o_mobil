import { Image, Pressable, View } from "react-native";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import NoPostsFound from "../home/NoPostsFound";
import { CommonStaticElementProps, PostResponse } from "@/constants/types";
import { Colors } from "@/constants/Colors";

export default function PostGrid({colorScheme, language, posts} : {posts: PostResponse[]} & CommonStaticElementProps) {

    return (
        <View className=" ml-2  mt-4">
          <FlashList
            estimatedItemSize={200}
            
            ListEmptyComponent={() => <NoPostsFound language={language} />}
            data={
              posts && posts.length > 0
                ? posts.sort(
                    (a, b) =>
                      new Date(b.dateOfCreation).getTime() -
                      new Date(a.dateOfCreation).getTime()
                  )
                : []
            }
            renderItem={({ item }) => (
              <Pressable
                className="flex-1"
                
                onPress={() =>
                  router.push({
                    pathname: "/(post)/page/[id]",
                    params: { id: item.postId },
                  })
                }
                style={{
                  shadowColor: Colors[colorScheme!].background,
                  shadowOffset: { width: 1, height: 10 },
                  shadowOpacity: 1,
                  shadowRadius: 10,
                }}
              >
                <Image
                  resizeMethod="auto"
                  className="flex-1 h-72 rounded-xl my-2 w-11/12 primary"
                  resizeMode="cover"
                  source={{ uri: item.images[0].url }}
                />
              </Pressable>
            )}
            numColumns={2}
          />
        </View>
    );
}
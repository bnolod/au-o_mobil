import { RefreshControl, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { Keyboard, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import PostCard from "@/components/home/Post";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import RootHeader from "@/components/home/RootHeader";
import { PostCreationTexts, UIErrorTexts } from "@/constants/texts";
import { apiFetch } from "@/lib/apiClient";
import { PostResponse } from "@/constants/types";
import { FlashList } from "@shopify/flash-list";
import NoPostsFound from "@/components/home/NoPostsFound";
import LoadingModal from "@/components/ui/LoadingModal";
import { Redirect } from "expo-router";

export default function Home() {
  const { user } = useAuthentication();
  const { language } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const { colorScheme } = useColorScheme();
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setTimeout(() => {}, 1000);
    setRefreshing(false);
  }, []);
  const [post, setPost] = useState<PostResponse[]>([]);
  async function fetchPosts(): Promise<PostResponse[]> {
    const post = await apiFetch<PostResponse[]>("posts/all", "GET", true);
    return post?.data!;
  }
  useEffect(() => {
    async function load() {
      setPost(await fetchPosts());
    }
    load();
  }, [refreshing]);

  if (user)
    return (
      <>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView  showsVerticalScrollIndicator={false} className="background"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}>
                <LoadingModal
                  colorScheme={colorScheme!}
                  loading={refreshing}
                  text={UIErrorTexts.loading[language]}
                />
              </RefreshControl>
            }
            stickyHeaderIndices={[0]}
            stickyHeaderHiddenOnScroll
          >
            
            <RootHeader language={language} colorScheme={colorScheme!} />
            
            
            {post && post.length > 0 ? (
              <FlashList
                key={refreshing ? "refresh" : "list"}
                contentContainerClassName="mt-4 flex-1"
                data={post.sort(
                  (a, b) =>
                    new Date(b.dateOfCreation).getTime() -
                    new Date(a.dateOfCreation).getTime()
                )}
                renderItem={({ item }) => (
                  <PostCard
                  reaction={item.reactedWith}
                    user={user}
                    authorProfileImg={item.user.profileImg}
                    authorId={item.user.id}
                    vehicle={item.vehicle}
                    postId={item.postId}
                    key={item.postId}
                    authorNickname={item.user.nickname}
                    authorUsername={item.user.username}
                    colorScheme={colorScheme!}
                    comments={item.comments || []}
                    date={item.dateOfCreation.split("T")[0]}
                    description={item.text}
                    images={item.images}
                    language={language}
                    location={item.location}
                    reactions={item.reactionTypeMap}
                  />
                )}
                estimatedItemSize={300}
              />
            ) : (
              <View className={"flex-1  items-center justify-center m-auto"}>
                <NoPostsFound language={language} />
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </>
    );
  else return <Redirect href={"/(auth)/login"} />;
}

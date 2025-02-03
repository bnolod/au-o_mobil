import { RefreshControl, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { Keyboard, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import PostCard from "@/components/home/Post";
import { colorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import RootHeader from "@/components/home/RootHeader";
import { UIErrorTexts } from "@/constants/texts";
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

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setTimeout(() => {}, 1000);
    setRefreshing(false);
  }, []);
  const [post, setPost] = useState<PostResponse[]>([]);
  async function fetchPosts(): Promise<PostResponse[]> {
    const post = await apiFetch<PostResponse[]>("posts/all", "GET", true);
    return post!;
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
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}>
                <LoadingModal
                  colorScheme={colorScheme.get()!}
                  loading={refreshing}
                  text={UIErrorTexts.loading[language]}
                />
              </RefreshControl>
            }
            stickyHeaderIndices={[0]}
            stickyHeaderHiddenOnScroll
          >
            <RootHeader language={language} colorScheme={colorScheme.get()!} />
            {post && post.length > 0 ? (
              <FlashList
                key={refreshing ? "refresh" : "list"}
                contentContainerClassName="mt-4 flex-1"
                data={post.sort(
                  (a, b) =>
                    new Date(b.date_of_creation).getTime() -
                    new Date(a.date_of_creation).getTime()
                )}
                renderItem={({ item }) => (
                  <PostCard
                    user_id={user!.id}
                    user_nickname={user.nickname}
                    user_profile_img={user.profile_img}
                    author_id={item.user.id}
                    post_id={item.post_id}
                    key={item.post_id}
                    author_nickname={item.user.nickname}
                    author_username={item.user.username}
                    colorScheme={colorScheme.get()!}
                    comments={item.comments || []}
                    date={item.date_of_creation.split("T")[0]}
                    description={item.text}
                    images={item.images.map((image) => image.url)}
                    language={language}
                    location={item.location}
                    reactions={{ fire: 0, heart: 0, sunglasses: 0 }}
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

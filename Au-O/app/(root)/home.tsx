import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/ThemedText";
import { RefreshControl, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import PostCard from "@/components/home/Post";
import { colorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import RootHeader from "@/components/home/RootHeader";
import { Colors } from "@/constants/Colors";
import { boros_manifesto, PostStatusTexts, UIErrorTexts } from "@/constants/texts";
import { apiFetch } from "@/lib/apiClient";
import { PostResponse } from "@/constants/types";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import NoPostsFound from "@/components/home/NoPostsFound";
import LoadingModal from "@/components/ui/LoadingModal";

export default function Home() {
  const { user } = useAuthentication();
  const { language } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setTimeout(() => {
      
    }, 1000);
    setRefreshing(false);
    
  }, []);
  const [post, setPost] = useState<PostResponse[]>([]);
  async function fetchPosts() {
    
    const post = await apiFetch<PostResponse[]>("posts/all", "GET", true);
    
    setPost(post!);
    console.log("confirmed")
  }
  useEffect(() => {
    fetchPosts();
    
  }, []);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          refreshControl={
            
            <RefreshControl  refreshing={refreshing} onRefresh={handleRefresh}>

           <LoadingModal colorScheme={colorScheme.get()!} loading={refreshing} text={UIErrorTexts.loading[language] } />
            </RefreshControl>
            
          }
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll
        >
          <RootHeader language={language} colorScheme={colorScheme.get()!} />
          <FlashList
          contentContainerClassName="mt-4 flex-1"
            data={post}
            renderItem={({ item, index }) => (
              <PostCard
                user_id={user!.id}
                author_id={item.user.id}
                post_id={item.post_id}
                key={item.post_id}
                author_nickname={item.user.nickname}
                author_username={item.user.username}
                colorScheme={colorScheme.get()!}
                comments={[]}
                date={item.date_of_creation.split("T")[0]}
                description={item.text}
                images={item.images.map((image) => image.url)}
                language={language}
                location={item.location}
                reactions={{ fire: 0, heart: 0, sunglasses: 0 }}
              />
            )}
            estimatedItemSize={300}
            ListEmptyComponent={<NoPostsFound language={language} />}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
}

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
import { boros_manifesto } from "@/constants/texts";
import { apiFetch } from "@/lib/apiClient";
import { PostResponse } from "@/constants/types";
import { router } from "expo-router";

export default function Home() {
  const { logout, user } = useAuthentication();
  const { language } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    router.reload()
    setRefreshing(false);
  }, []);
  const [post, setPost] = useState<PostResponse[]>([]);
  useEffect(() => {
    async function fetchPost() {
      const post = await apiFetch<PostResponse[]>("posts/all", "GET", true);
      setPost(post!);
    }
    fetchPost();
  }, []);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              
              tintColor={Colors.highlight.main}
              colors={[Colors.highlight.main]}
              progressBackgroundColor="#FFFFFF"
            />
          }
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll
        >
          <RootHeader language={language} colorScheme={colorScheme.get()!} />
         
          {
            post.map((post) => (

              <PostCard
              user_id={user!.id.toString()} //uuid mikor?
              author_id={post.user.id.toString()}
              post_id={post.post_id}
              key={post.post_id}
              author_nickname={post.user.nickname}
              author_username={post.user.username}
              colorScheme={colorScheme.get()!}
              comments={[]}
          date={post.date_of_creation.split("T")[0]}
          description={post.text}
          images={post.images.map((image) => image.url)}
          language={language}
          location={post.location}
          reactions={{fire: 0, heart: 0, sunglasses: 0}}
          
          />
        ))
      }
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
}

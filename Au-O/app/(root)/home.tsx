import { RefreshControl, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { Keyboard, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import PostCard from "@/components/home/Post";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import { UIErrorTexts } from "@/constants/texts";
import { loadFeed } from "@/lib/apiClient";
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
  const [timestamp, setTimestamp] = useState<string>(
    new Date(new Date(new Date().toISOString()).getTime() + 60 * 60 * 1000)
      .toISOString()
      .slice(0, -1) + "1234"
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [post, setPost] = useState<PostResponse[]>([]);

  async function handleFetching(i: number) {
    setIsFetching(true);
    const res = await loadFeed(i, timestamp);

    if (res) {
      if (res.pageSize === 10) {
        //console.log("able to fetch next page");
        setCurrentPage(currentPage + 1);
      } else {
        //console.log("unable to fetch next page");
      }
      setPost((posts) => [
        ...posts,
        ...res.content.filter(
          (newPost) => !posts.some((post) => post.postId === newPost.postId)
        ),
      ]);
    }
    setIsFetching(false);
  }

  async function fetchNextPage() {
    if (!isFetching) {
      //console.log("fetching page", currentPage + 1);
      await handleFetching(currentPage);
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimestamp(
      new Date(new Date(new Date().toISOString()).getTime() + 60 * 60 * 1000)
        .toISOString()
        .slice(0, -1) + "1234"
    );
    setTimeout(() => {

      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    async function load() {
      handleFetching(0);
      setCurrentPage(0);
    }
    load();
  }, [timestamp]);

  if (user)
    return (
      <>
        {post && post.length > 0 ? (
          <FlashList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}>
                <LoadingModal
                  colorScheme={colorScheme!}
                  loading={refreshing}
                  text={UIErrorTexts.loading[language]}
                />
              </RefreshControl>
            }
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.4}
            onEndReached={async () => {
              //console.log("page end reached");
              await fetchNextPage();
            }}
            keyExtractor={(item) => item.postId + ""}
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
      </>
    );
  else return <Redirect href={"/(auth)/login"} />;
}

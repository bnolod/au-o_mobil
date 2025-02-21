import PostCard from "@/components/Post/Post";
import Button from "@/components/ui/Button";
import LoadingModal from "@/components/ui/LoadingModal";
import ThemedText from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { PostResponse } from "@/constants/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiFetch } from "@/lib/apiClient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import * as Clipboard from 'expo-clipboard'
import { PostStatusTexts } from "@/constants/texts";
import { useAuthentication } from "@/contexts/AuthenticationContext";

export default function PostPage() {
  const [post, setPost] = useState<PostResponse>();
  const { id, isNew } = useLocalSearchParams<{id: string; isNew?: string}>();
  const { colorScheme } = useColorScheme();
  const { language } = useLanguage();
  const {user} = useAuthentication()

  const [loading, setLoading] = useState<boolean | null>(true);
  function showShareModal() {
    if (Boolean(isNew)) {
      Alert.alert(PostStatusTexts.newShare.title[language], PostStatusTexts.newShare.message[language], [
        {
          text: PostStatusTexts.newShare.responses.no[language],
          style: "cancel",
      
        },
        {
          isPreferred: true,
          text: PostStatusTexts.newShare.responses.yes[language],
          onPress: async () => {
            await Clipboard.setStringAsync(post!.postId.toString())
          },
        }
      ])
    }
  }
  useEffect(() => {
    async function getPost() {
      
      const res = await apiFetch<PostResponse>(`posts/post/${id}`, "GET", true);
      if (res) {
        setPost(res?.data!);
        setLoading(false);
      } else {
        setLoading(null);
      }
    }
    getPost();
    showShareModal()
  }, []);
  if (loading === null) {
    return (
      <View className="flex gap-2 m-auto p-4 justify-center items-center rounded-xl secondary">
        <MaterialCommunityIcons
          name="cloud-question"
          size={64}
          color={Colors.highlight.main}
        />
        <ThemedText className="text-center text-xl">Post not found</ThemedText>
        <Button variant="highlight" onPress={() => router.back()}>
          Back
        </Button>
      </View>
    );
  }
  if (loading) {
    return (
      <LoadingModal
        colorScheme={colorScheme!}
        loading={loading}
        text={PostStatusTexts.loading[language]}
      />
    );
  }
  if (post) {
    return (
      <View className="flex justify-start items-center h-full">
        <PostCard
        user={user}
        reaction={post.reactedWith}
          authorId={post.user.id}
          authorProfileImg={post.user.profileImg}
          authorNickname={post.user.nickname}
          authorUsername={post.user.username}
          colorScheme={colorScheme!}
          comments={post.comments}
          date={post.dateOfCreation.split("T")[0]}
          description={post.text}
          images={post.images}
          language={language}
          location={post.location}
          postId={post.postId}
          vehicle={post.vehicle}
          reactions={post.reactionTypeMap}
        />
      </View>
    );
  }
}

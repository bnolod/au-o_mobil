import PostCard from "@/components/home/Post";
import Button from "@/components/ui/Button";
import LoadingModal from "@/components/ui/LoadingModal";
import ThemedText from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { PostResponse } from "@/constants/types";
import { useLanguage } from "@/contexts/LanguageContext";
import apiClient, { apiFetch } from "@/lib/apiClient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function PostPage() {
  const [post, setPost] = useState<PostResponse>();
  const { id } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  const { language } = useLanguage();
  const [loading, setLoading] = useState<boolean | null>(true);
  useEffect(() => {
    async function getPost() {
      const res = await apiFetch<PostResponse>(`posts/post/${id}`, "GET", true);
      if (res) {
        setPost(res);
        setLoading(false);
      } else {
        setLoading(null);
      }
    }
    getPost();
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
        text={"Loading post..."}
      />
    );
  }
  if (post) {
    return (
      <View className="flex justify-center items-center h-full primary">
        <PostCard
          author_id={post.user.id}
          author_nickname={post.user.nickname}
          author_username={post.user.username}
          colorScheme={colorScheme!}
          comments={[]}
          date={post.date_of_creation.split("T")[0]}
          description={post.text}
          images={post.images.map((img) => img.url)}
          language={language}
          location={post.location}
          post_id={post.post_id}
          reactions={{ fire: 0, heart: 0, sunglasses: 0 }}
          user_id={post.user.id}
        />
      </View>
    );
  }
}

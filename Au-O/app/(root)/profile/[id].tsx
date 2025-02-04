import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/ThemedText";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { apiFetch } from "@/lib/apiClient";
import { PostResponse, User } from "@/constants/types";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import UserLoading from "@/components/auth/UserLoading";
import RootHeader from "@/components/home/RootHeader";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import Avatar from "@/components/ui/Avatar";
import { boros_manifesto } from "@/constants/texts";
import { handleShowMore } from "@/lib/events";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { FlashList } from "@shopify/flash-list";
import PostCard from "@/components/home/Post";
export default function Profile() {
  const [user, setUser] = useState<User>();
  const { logout } = useAuthentication();
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();
  const [lines, setLines] = useState<number | undefined>(3);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [profile_image, setProfileImage] = useState<string | undefined>(
    user?.profile_img
  );
  const [showModal, setShowModal] = useState<PostResponse | null>(null);
  async function getUser() {
    const res = await apiFetch<any>(`users/user/${id}`, "GET", true);
    if (res) {
      setUser(res);
    } else return;
  }
  async function getUserPosts() {
    const res = await apiFetch<PostResponse[]>(
      `users/user/${id}/posts`,
      "GET",
      true
    );
    if (res) {
      setPosts(res);
    } else return;
  }
  useEffect(() => {
    getUser();
    getUserPosts();
  }, []);
  const isOwner = user && user.id.toString() === (id as string);
  if (isOwner === undefined) return <UserLoading />;
  if (user)
    return (
      <ScrollView className="primary">
        <RootHeader colorScheme={colorScheme!} language={language} />

        <View className="w-full secondary rounded-b-xl">
          <View className="flex flex-row justify-between items-center px-4">
            <TouchableOpacity
              onLongPress={async () => {
                const res = await ImagePicker.launchImageLibraryAsync({
                  allowsEditing: true,
                  aspect: [1, 1],
                  allowsMultipleSelection: false,
                  quality: 0.6,
                  mediaTypes: "images",
                });
                if (!res.canceled) {
                  setProfileImage(res.assets[0].uri);
                }
              }}
            >
              <Avatar
                image={user.profile_img}
                nickname={user.nickname}
                className="h-20 w-20 primary my-4"
              />
            </TouchableOpacity>
            <View>
              <ThemedText className="text-xl text-right">
                400 followers
              </ThemedText>
              <ThemedText className="text-lg text-right">
                1352 following
              </ThemedText>
            </View>
          </View>
          <View className="flex flex-row gap-4 items-center px-4">
            <ThemedText className="text-xl font-bold">
              {user.nickname}
            </ThemedText>
            <ThemedText className="text-gray-500">@{user.username}</ThemedText>
          </View>
          <ThemedText
            numberOfLines={lines}
            className="text-lg px-4"
            onPress={() => setLines(handleShowMore(lines))}
          >
            {boros_manifesto.EN}
          </ThemedText>
          {!isOwner ? (
            <View className="flex flex-row justify-between px-4 items-center w-full">
              <Button
                className="w-1/3 button highlight ml-0 items-center py-3"
                hapticFeedback="medium"
              >
                Follow
              </Button>
              <View className="flex items-center justify-around gap-2 flex-row  my-3">
                <Button className="button primary w-fit py-3">Message</Button>
                <Button className="button primary w-fit">
                  <MaterialCommunityIcons name="dots-horizontal" size={24} />
                </Button>
              </View>
            </View>
          ) : (
            <ThemedText className="mx-auto my-3 font-semibold">
              Long-press to edit your profile attributes
            </ThemedText>
          )}
          <View className="p-4 secondary h-24 rounded-b-2xl">
            <View className="primary flex flex-row justify-between items-center m-auto w-full h-full  rounded-xl">
              <MaterialCommunityIcons
                name="cards-outline"
                size={42}
                className="text-center flex-1 border-r border-r-[#767676]"
                color={Colors[colorScheme!].text}
              />
              <MaterialCommunityIcons
                name="account-group-outline"
                size={42}
                className="text-center flex-1 border-x border-x-[#767676]"
                color={Colors[colorScheme!].text}
              />
              <MaterialCommunityIcons
                name="bookmark-outline"
                size={42}
                className="text-center flex-1 border-l border-l-[#767676]"
                color={Colors[colorScheme!].text}
              />
            </View>
          </View>
        </View>
        <View className="w-11/12 mx-auto mt-4">
          <FlashList
            estimatedItemSize={200}
            data={posts}
            renderItem={({ item }) => (
              <Pressable
                className="flex-1"
                onPress={() => router.push({pathname: "/(post)/page/[id]", params: {id: item.post_id}})}
                onLongPress={() => setShowModal(item)}
                style={{
                  shadowColor: Colors[colorScheme!].background,
                  shadowOffset: { width: 1, height: 10 },
                  shadowOpacity: 1,
                  shadowRadius: 10,
                }}
              >
                <Image
                  resizeMethod="auto"
                  className="flex-1 h-72 rounded-xl mt-0 w-11/12 primary"
                  resizeMode="cover"
                  source={{ uri: item.images[0].url }}
                />
              </Pressable>
            )}
            numColumns={2}
          />
          {showModal && user && (
            <Modal
              visible={showModal !== null}
              transparent
              animationType="fade"
            >
              <Pressable
                onPress={() => setShowModal(null)}
                className="h-screen w-screen  absolute flex justify-center items-center bg-black/25"
              >
                  <View className=" w-screen pointer-events-none">
                    <PostCard
                      preview
                      author_id={showModal!.user.id}
                      author_nickname={showModal!.user.nickname}
                      author_username={showModal!.user.username}
                      colorScheme={colorScheme!}
                      comments={showModal!.comments}
                      date={showModal!.date_of_creation.split("T")[0]}
                      description={showModal!.text}
                      language={language}
                      location={showModal!.location}
                      post_id={showModal!.post_id}
                      reactions={{ fire: 0, heart: 0, sunglasses: 0 }}
                      user_id={user.id}
                      user_nickname={user.nickname}
                      user_profile_img={user.profile_img}
                      images={showModal!.images.map((img) => img.url)}
                    />
                  </View>
                </Pressable>
            </Modal>
          )}
        </View>
      </ScrollView>
    );
}

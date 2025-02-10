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
import {
  apiFetch,
  followUser,
  getFollows,
  logout,
  unfollowUser,
  updateProfilePicture,
} from "@/lib/apiClient";
import {
  CommonStaticElementProps,
  PostResponse,
  PostResponseType,
  User,
  UserResponse,
} from "@/constants/types";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import UserLoading from "@/components/auth/UserLoading";
import RootHeader from "@/components/home/RootHeader";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import Avatar from "@/components/ui/Avatar";
import { boros_manifesto, generalTexts } from "@/constants/texts";
import { handleShowMore, handleTabSelection } from "@/lib/events";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { FlashList } from "@shopify/flash-list";

import { createImageForm, createTimestamp } from "@/lib/functions";
import Toast from "react-native-toast-message";
export default function Profile({
  user,
  language,
  colorScheme,
  profile,
  posts,
  id,
  followers,
  setFollowers,
  following,
  setFollowing,
}: {
  user: User;
  profile: User;
  id: string;
  followers: User[];
  following: User[];
  posts: PostResponse[];
  setFollowers: (users: User[]) => void;
  setFollowing: (users: User[]) => void;
} & CommonStaticElementProps) {
  const [lines, setLines] = useState<number | undefined>(3);
  const [selectedTab, setSelectedTab] = useState<"POST" | "GROUPS" | "SAVED">(
    "POST"
  );
  async function handleFollow() {
    console.log(id);

    if (user && !followers.some((follower) => follower.id !== user.id)) {
      console.log("FOLLOWING");
      const followRes = await followUser(id as string);
      if (followRes) {
        setFollowers([...followers, user]);
      }
    } else if (user && followers.some((follower) => follower.id === user.id)) {
      console.log("UNFOLLOWING");
      const unfollowRes = await unfollowUser(id as string);
      if (unfollowRes) {
        setFollowers(followers.filter((follower) => follower.id !== user.id));
      }
    }
  }

  useEffect(() => {
    
    
  }, [id]);
  const isOwner =
    profile &&
    user &&
    profile.id.toString() === (id as string) &&
    user.id === profile.id;
  if (isOwner === undefined) return <UserLoading />;
  if (user && profile !== undefined && profile !== null)
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
                  const img = await createImageForm(
                    res.assets[0],
                    `${profile.username}_PROFILEPIC_${createTimestamp()}`,
                    profile!
                  );

                  if (img) {
                    const profileUpdateResponse = await updateProfilePicture(
                      img
                    );

                    if (profileUpdateResponse) {
                      Toast.show({
                        type: "success",
                        text1: "Profile picture updated!",
                      });
                    }
                  }
                }
              }}
            >
              <Avatar
                image={profile.profileImg}
                nickname={profile.nickname}
                className="h-20 w-20 primary my-4"
              />
            </TouchableOpacity>
            <View>
              <ThemedText className="text-xl text-right">
                {followers.length}{" "}
                {generalTexts.followers.followerCount[language]}
                {followers.length !== 1 &&
                  generalTexts.followers.followerCountMoreThanOne[language]}
              </ThemedText>
              <ThemedText className="text-lg text-right">
                {following.length}{" "}
                {generalTexts.following.followingCount[language]}
              </ThemedText>
            </View>
          </View>
          <View className="flex flex-row gap-4 items-center px-4">
            <ThemedText className="text-xl font-bold">
              {profile.nickname}
            </ThemedText>
            <ThemedText className="text-gray-500">
              @{profile.username}
            </ThemedText>
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
                onPress={() => handleFollow()}
              >
                {followers.some((follower) => follower.id === user.id)
                  ? "Unfollow"
                  : "Follow"}
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
          <Button onPress={() => logout()}>Logout</Button>
          <View className="p-4 secondary h-24 rounded-b-2xl">
            <View className="primary flex flex-row justify-between items-center m-auto w-full h-full  rounded-xl">
              <MaterialCommunityIcons
                name="cards-outline"
                size={42}
                className="text-center flex-1 border-r border-r-[#767676]"
                color={
                  selectedTab === "POST"
                    ? Colors.highlight.main
                    : Colors[colorScheme!].text
                }
                onPress={() => setSelectedTab(handleTabSelection("POST"))}
              />
              <MaterialCommunityIcons
                name="account-group-outline"
                size={42}
                className="text-center flex-1 border-x border-x-[#767676]"
                color={
                  selectedTab === "GROUPS"
                    ? Colors.highlight.main
                    : Colors[colorScheme!].text
                }
                onPress={() => setSelectedTab(handleTabSelection("GROUPS"))}
              />
              <MaterialCommunityIcons
                name="bookmark-outline"
                size={42}
                className="text-center flex-1 border-l border-l-[#767676]"
                color={
                  selectedTab === "SAVED"
                    ? Colors.highlight.main
                    : Colors[colorScheme!].text
                }
                onPress={() => setSelectedTab(handleTabSelection("SAVED"))}
              />
            </View>
          </View>
        </View>
        <View className="w-11/12 mx-auto mt-4">
          <FlashList
            estimatedItemSize={200}
            data={
              posts.length > 0
                ? posts.sort(
                    (a, b) =>
                      new Date(b.dateOfCreation).getTime() -
                      new Date(a.dateOfCreation).getTime()
                  )
                : null
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
      </ScrollView>
    );
}

import PostCard from "@/components/home/Post";
import PostImage from "@/components/home/PostImage";
import ImageNotFound from "@/components/new/ImageNotFound";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LoadingModal from "@/components/ui/LoadingModal";
import ThemedText from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { PostCreationTexts, PostEditTexts } from "@/constants/texts";
import { PostResponse } from "@/constants/types";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiFetch } from "@/lib/apiClient";
import { handleGallery } from "@/lib/functions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { ImagePickerAsset } from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Keyboard, Pressable, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function EditPost() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const { user } = useAuthentication();
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<PostResponse>();
  const [editPostForm, setEditPostForm] = useState({
    description: "",
    groupData: "",
    eventData: "",
    location: "",
  });
  async function handleSubmit() {}
  async function getPost() {
    const postResponse = await apiFetch<PostResponse>(
      `posts/post/${id}`,
      "GET",
      true
    );
    if (postResponse) {
      setPost(postResponse);
      setEditPostForm({
        ...editPostForm,
        description: postResponse.text,
        location: postResponse.location,
      });
      setLoading(false);
    } else setLoading(null);
  }
  useEffect(() => {
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
    return <LoadingModal colorScheme={colorScheme!} loading={loading} text={"Loading post..."} />;
  }
  if (post)
  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      className="primary flex-1 h-full justify-center items-center"
    >
      <View className="secondary p-4 w-11/12 rounded-xl flex gap-4">
        <ThemedText className="mx-auto text-center text-xl font-bold">
          {PostEditTexts.header[language]}
        </ThemedText>
        <Input
          colorScheme={colorScheme!}
          label={
            <ThemedText>
              <MaterialCommunityIcons name="pencil" size={19} />{" "}
              {PostCreationTexts.form.description.label[language]}
            </ThemedText>
          }
          TextInputProps={{
            value: editPostForm.description,
            placeholder:
              PostCreationTexts.form.description.placeholder[language],
            onChangeText: (text) =>
              setEditPostForm({ ...editPostForm, description: text }),
          }}
        />
        <Input
          colorScheme={colorScheme!}
          label={
            <ThemedText>
              <MaterialCommunityIcons name="map-marker-outline" size={19} />{" "}
              {PostCreationTexts.form.location.label[language]}
            </ThemedText>
          }
          TextInputProps={{
            value: editPostForm.location,
            placeholder: PostCreationTexts.form.location.placeholder[language],
            onChangeText: (text) =>
              setEditPostForm({ ...editPostForm, location: text }),
          }}
        />
        {/*Platform.OS === "android" ? (
                  <Picker
                    selectedValue={selectedGroup}
                    onValueChange={(itemValue) => setSelectedGroup(itemValue)}
                  >
                    {groups.map((group, index) => {
                      return (
                        <Picker.Item key={index} label={group} value={index} />
                      );
                    })}
                  </Picker>
                ) : (
                  <TouchableOpacity
                    className="w-full h-14 flex justify-center secondary border-2 border-highlight rounded-xl my-2"
                    onPress={() => {
                      //openGroupSheetIOS();
                    }}
                  >
                    <ThemedText className=" text-left ml-4">
                      {selectedGroup}
                    </ThemedText>
                  </TouchableOpacity>
                )*/}
        <Button
          variant="highlight"
          type="fill"
          onPress={() => {
            bottomSheetRef.current?.present();
          }}
        >
          {PostCreationTexts.confirmPost[language]}
        </Button>
        <BottomSheetModal
          ref={bottomSheetRef}
          enablePanDownToClose={true}
          backgroundStyle={{
            backgroundColor: Colors[colorScheme!].secondary,
          }}
          snapPoints={["80%", "90%"]}
          handleIndicatorStyle={{
            backgroundColor: Colors[colorScheme!].text,
            width: "33%",
            height: 5,
          }}
          handleStyle={{
            backgroundColor: Colors[colorScheme!].secondary,

            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
          index={1}
        >
          <BottomSheetView>
            <PostCard
              post_id={null}
              user_id={null}
              author_id={null}
              author_nickname={user!.nickname}
              author_username={user!.username}
              colorScheme={colorScheme!}
              date={new Date().toDateString()}
              description={editPostForm.description}
              images={post?.images.map((image) => image.url) || []}
              language={language}
              location={editPostForm.location}
              comments={[]}
              preview
              reactions={{ fire: 12, heart: 34, sunglasses: 567 }}
              eventData={
                /*
                  selectedEvent
                    ? ({
                        event_name: selectedEvent,
                        attendees: 24,
                        end_date: new Date().toDateString(),
                        start_date: new Date().toDateString(),
                        location: "teszt",
                        group_id: selectedGroup!,
                      } as EventPostData)
                    : undefined
                */ undefined
              }
              groupData={
                /*
                  selectedGroup
                    ? {
                        group_icon: null,
                        group_name: selectedGroup!,
                        group_nickname: selectedGroup!,
                      }
                    : undefined
                */ undefined
              }
            />
            <Button
              onPress={() => bottomSheetRef.current?.dismiss()}
              className=" my-2 btn-highlight button btn-fill btn-outline"
            >
              Dismiss
            </Button>
            <Button
              onPress={handleSubmit}
              className=" mt-2 btn-highlight button btn-fill"
            >
              Post
            </Button>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </Pressable>
  );
}

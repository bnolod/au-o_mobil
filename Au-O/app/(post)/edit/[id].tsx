import PostCard from "@/components/home/Post";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LoadingModal from "@/components/ui/LoadingModal";
import ThemedText from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { PostCreationTexts, PostEditTexts } from "@/constants/texts";
import { PostResponse } from "@/constants/types";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiFetch, editPost } from "@/lib/apiClient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useRef, useState } from "react";
import {  Keyboard, Pressable, View } from "react-native";
import Toast from "react-native-toast-message";

export default function EditPost() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const { user } = useAuthentication();
  const { language } = useLanguage();
  const {id}  = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  const [post, setPost] = useState<PostResponse>();
  const [editPostForm, setEditPostForm] = useState({
    description: "",
    groupData: "",
    eventData: "",
    location: "",
  });
  async function handleSubmit() {
    
    const res = await editPost(editPostForm.description, editPostForm.location, id as string);
    if (res) {
      bottomSheetRef.current?.dismiss();
      Toast.show({
        type: "success",
        text1: PostEditTexts.success.title[language],
        text2: PostEditTexts.success.message[language],
      })
      router.replace("/(root)/home")
      router.push({
        pathname: "/(post)/page/[id]",
        params: { id: id as string, isNew: "true" },
      })
    }
    else {
      bottomSheetRef.current?.dismiss();
      Toast.show({
        type: "error",
        text1: PostEditTexts.error.title[language],
        text2: PostEditTexts.error.message[language],
      })
    }
  }
  async function getPost() {
    const postResponse = await apiFetch<PostResponse>(
      `posts/post/${id}`,
      "GET",
      true
    );
    if (postResponse) {
      setPost(postResponse?.data!);
      setEditPostForm({
        ...editPostForm,
        description: postResponse.data!.text,
        location: postResponse.data!.location,
      });
      setLoading(false);
    } else setLoading(null);
  }
  useEffect(() => {
    getPost();
  }, []);
  if (loading === null) {
    return (
      <View className="flex gap-2 m-auto p-4 justify-center items-center rounded-xl bg-black/25">
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
      onPress={() => {Keyboard.dismiss()}}
      className="flex-1 h-full justify-center items-center bg-black/25"
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
            Keyboard.dismiss();
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
            user={user}
              postId={null}
authorProfileImg={user!.profileImg}
              authorId={user!.id}
              authorNickname={user!.nickname}
              authorUsername={user!.username}
              colorScheme={colorScheme!}
              date={new Date().toDateString()}
              description={editPostForm.description}
              images={post?.images || []}
              language={language}
              location={editPostForm.location}
              comments={[]}
              preview
              reaction={"FIRE"}
              reactions={{ FIRE: 12, HEART: 34, COOL: 567 }}
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

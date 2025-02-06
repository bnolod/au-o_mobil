import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedText from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/contexts/LanguageContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useEffect, useRef } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Images } from "@/lib/staticAssetExports";
import * as ImagePicker from "expo-image-picker";
import Carousel from "react-native-reanimated-carousel";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { PostCreationTexts } from "@/constants/texts";
import ImageNotFound from "@/components/new/ImageNotFound";
import PostCard from "@/components/home/Post";
import { ImageStoreRequest, ImageUploadResponse } from "@/constants/types";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import {
  cleanupInvalidImageUploads,
  convertToBlob,
  createImageForm,
  createTimestamp,
  handleGallery,
} from "@/lib/functions";
import { imageUpload, storeImages } from "@/lib/apiClient";
import Toast from "react-native-toast-message";
import LoadingModal from "@/components/ui/LoadingModal";
import { router } from "expo-router";
import SheetSelection from "@/components/ui/SheetSelection";
import PostCreationSheetSelectElements from "@/components/new/PostCreationSheetSelectElement";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
export default function NewPost() {
  const { language } = useLanguage();
  const { user } = useAuthentication();
  const { colorScheme } = useColorScheme();

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [newPostForm, setNewPostForm] = useState({
    description: "",
    location: "",
    group: selectedGroup,
    event: selectedEvent,
    images: images,
  });

  useEffect(() => {
    setNewPostForm({
      ...newPostForm,
      group: selectedGroup,
      event: selectedEvent,
      images: images,
    });
  }, [images, selectedEvent, selectedGroup]);
  function handlePresent() {
    bottomSheetRef.current?.present();
  }

  async function handleSubmit() {
    setLoading(true);
    const uploadedImages: ImageUploadResponse[] = [];
    for (const image of images) {
      const res = await createImageForm(image, newPostForm.description, user!);
      if (res) {
        const upload = await imageUpload(res);
        if (upload) {
          uploadedImages.push(upload);
        }
      }
    }
    setLoading(false);

    if (uploadedImages.length === images.length) {
      const imageStoreRequest: ImageStoreRequest = {
        text: newPostForm.description || "",
        location: newPostForm.location || "",
        postImages: uploadedImages,
      };
      const storeRes = await storeImages(imageStoreRequest);
      bottomSheetRef.current?.dismiss();
      if (storeRes) {
        Toast.show({
          type: "success",
          text1: PostCreationTexts.imageUploadSuccessToast.header[language],
          text2: PostCreationTexts.imageUploadSuccessToast.message[language],
        });
        setImages([]);
        setNewPostForm({
          description: "",
          location: "",
          group: selectedGroup,
          event: selectedEvent,
          images: [],
        });
        setLoading(false);
        router.replace("/(root)/home");
        router.push({
          pathname: "/(post)/page/[id]",
          params: { id: storeRes.post_id as string, isNew: "true" },
        });
      } else {
        Toast.show({
          type: "error",
          text1: PostCreationTexts.imageUploadErrorAlert[language],
        });
      }
    } else {
      cleanupInvalidImageUploads(uploadedImages);
      Toast.show({
        type: "error",
        text1:
          "Some images failed to upload (" +
          uploadedImages.length +
          "/" +
          images.length +
          ")",
      });
      return;
    }
  }

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  /*const openGroupSheetIOS = () => {
    retIOS.showActionSheetWithOptions(
      {
        options: [
          PostCreationTexts.cancel[language ? language : "EN"],
          ...groups,
        ],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          return;
        }
        if (buttonIndex === 1) {
          setSelectedGroup(null);
        } else {
          setSelectedGroup(groups[buttonIndex - 1]);
        }
      }
    );
  };
  const openEventSheetIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          PostCreationTexts.cancel[language ? language : "EN"],
          ...events,
        ],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          return;
        }
        if (buttonIndex === 1) {
          setSelectedEvent(null);
        } else {
          setSelectedEvent(events[buttonIndex - 1]);
        }
      }
    );
  };*/
  return (
    <>
      <LoadingModal
        loading={loading}
        colorScheme={colorScheme!}
        text="Posting.."
      />
      <View className="w-full secondary pt-16">
        <Image
          source={
            colorScheme === "dark" ? Images.logo_white : Images.logo_black
          }
          className="h-8 mx-auto my-4"
          resizeMode="contain"
        />
      </View>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={40}
        style={{ flex: 1 }}
      >
        <ScrollView className="primary">
          <Pressable
            onPress={() => Keyboard.dismiss()}
            className="flex h-screen flex-col"
          >
            <View className=" basis-3/12 w-full secondary">
              {images.length > 0 ? (
                <Carousel
                  width={Dimensions.get("screen").width}
                  data={images}
                  loop={images.length > 1}
                  overscrollEnabled={false}
                  renderItem={({ index }) => (
                    <View>
                      <TouchableOpacity
                        className="new-post-pop-image"
                        onPress={() => {
                          setImages(images.filter((_, i) => i !== index));
                        }}
                      >
                        <MaterialCommunityIcons
                          name="close"
                          size={46}
                          color={Colors[colorScheme!].text}
                        />
                      </TouchableOpacity>
                      <Image
                        source={{ uri: images[index].uri }}
                        resizeMode="contain"
                        className="h-full"
                      />
                    </View>
                  )}
                />
              ) : (
                <ImageNotFound
                  onPress={async () => {
                    const res = await handleGallery(images, language);
                    setImages((res as ImagePicker.ImagePickerAsset[]) || []);
                  }}
                  language={language}
                  colorScheme={colorScheme!}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={async () => {
                const res = await handleGallery(images, language);
                setImages((res as ImagePicker.ImagePickerAsset[]) || []);
              }}
              className="new-post-gallery-opener mx-auto"
            >
              <View className="absolute -left-4">
                <MaterialCommunityIcons
                  name="image-outline"
                  color={Colors[colorScheme!].text}
                  size={36}
                />
              </View>
              <ThemedText className="text-xl font-semibold">
                {PostCreationTexts.upload[language]}
              </ThemedText>
              <ThemedText className="text-sm flex items-center">
                {images.length || 0}{" "}
                {PostCreationTexts.selectedImages[language]}
              </ThemedText>
            </TouchableOpacity>
            {images.length > 0 && (
              <TouchableOpacity
                className="mx-auto my-2"
                onPress={() => setImages([])}
              >
                <ThemedText className="font-semibold underline">
                  {PostCreationTexts.clearImages[language]}
                </ThemedText>
              </TouchableOpacity>
            )}
            <View className=" w-full">
              <View className="w-full flex flex-col justify-center items-center">
                <Input
                  label={PostCreationTexts.form.description.label[language]}
                  icon={
                    <MaterialCommunityIcons
                      name="pencil"
                      size={28}
                      color={Colors[colorScheme!].text}
                    />
                  }
                  TextInputProps={{
                    placeholder:
                      PostCreationTexts.form.description.placeholder[language],
                    multiline: true,
                    numberOfLines: 4,
                    style: { maxHeight: 100 },
                    onChangeText: (text) => {
                      setNewPostForm({ ...newPostForm, description: text });
                    },
                  }}
                  colorScheme={colorScheme!}
                  containerClassName="rounded-xl"
                />
                <View className="w-11/12 justify-between gap-2 flex flex-row  ">
                  <View className=" flex-1 w-6/12 self-start">
                    <ThemedText className="w-full text-lg">
                      <MaterialCommunityIcons name="account-group" size={19} />{" "}
                      {PostCreationTexts.form.group[language]}
                    </ThemedText>
                    <SheetSelection
                      colorScheme={colorScheme!}
                      language={language}
                      FlashListProps={{
                        data: [
                          { title: "Group 1", memberCount: 12},
                        ],
                        renderItem: ({item, index}) => <PostCreationSheetSelectElements onPress={() => console.log(item.title)} group={{title: item.title}} title={item.title}/>,
                        estimatedItemSize: 50,
                        
                        ListHeaderComponent: () => <FilterBar placeholder="Search groups" onChange={(text: string) => {}} />,
                      }}
                    />
                  </View>
                  <View className=" flex-1 w-6/12 self-end">
                    <ThemedText className="w-11/12 text-lg">
                      <MaterialCommunityIcons
                        name="calendar-account-outline"
                        size={19}
                      />{" "}
                      {PostCreationTexts.form.event[language]}
                    </ThemedText>

                    <SheetSelection
                      colorScheme={colorScheme!}
                      language={language}
                      FlashListProps={{
                        data: [
                          { title: "Event 1", date: "2022.12.12"},
                        ],
                        renderItem: ({item, index}) => <PostCreationSheetSelectElements onPress={() => console.log(item.title)} event={{title: item.title}} title={item.title}/>,
                        estimatedItemSize: 50,
                        ListHeaderComponent: () => <FilterBar placeholder="Search events" onChange={(text: string) => {}} />,
                      }}
                      />
                  </View>
                </View>
                <Input
                  label={PostCreationTexts.form.location.label[language]}
                  icon={
                    <MaterialCommunityIcons
                      name="map-marker-outline"
                      size={28}
                      color={Colors[colorScheme!].text}
                    />
                  }
                  TextInputProps={{
                    placeholder:
                      PostCreationTexts.form.location.placeholder[language],
                    onChangeText: (text) => {
                      setNewPostForm({ ...newPostForm, location: text });
                    },
                  }}
                  colorScheme={colorScheme!}
                  containerClassName="rounded-xl"
                />
                <Button
                  variant="highlight"
                  type="fill"
                  style={{ marginTop: 20 }}
                  hapticFeedback="light"
                  onPress={() => {
                    images.length > 0
                      ? handlePresent()
                      : Alert.alert(
                          PostCreationTexts.noImageFoundAlert[language],
                          PostCreationTexts.noImageFoundAlertMessage[language],
                          [],
                          {
                            userInterfaceStyle: colorScheme,
                          }
                        );
                  }}
                >
                  {PostCreationTexts.form.next[language]}
                </Button>
              </View>
            </View>
            <View className="w-full mb-4">
              <BottomSheetModal
                ref={bottomSheetRef}
                enablePanDownToClose={true}
                backgroundStyle={{
                  backgroundColor: Colors[colorScheme!].secondary,
                }}
                snapPoints={["90%", "95%"]}
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
                    post_id={null}

                    author_id={null}
                    author_nickname={user!.nickname}
                    author_username={user!.username}
                    colorScheme={colorScheme!}
                    date={new Date().toDateString()}
                    description={newPostForm.description}
                    images={images.map((image) => {
                      return {url: image.uri, deleteHash: ""}
                    })}
                    language={language}
                    location={newPostForm.location}
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
                    className=" my-2 p-1 btn-highlight button btn-fill btn-outline"
                  >
                    {PostCreationTexts.buttons.dismiss[language]}
                  </Button>
                  <Button
                    onPress={handleSubmit}
                    className=" mt-2 p-2 btn-highlight button btn-fill"
                  >
                    {PostCreationTexts.buttons.post[language]}
                  </Button>
                </BottomSheetView>
              </BottomSheetModal>
            </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

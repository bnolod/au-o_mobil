import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ThemedText from '@/components/ui/ThemedText';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import { Images } from '@/lib/staticAssetExports';
import * as ImagePicker from 'expo-image-picker';
import Carousel from 'react-native-reanimated-carousel';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { PostCreationTexts } from '@/constants/texts';
import ImageNotFound from '@/components/new/ImageNotFound';
import PostCard from '@/components/Post/Post';
import { CreatePostRequest, ImageStoreRequest, ImageUploadResponse } from '@/constants/types';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { cleanupInvalidImageUploads, createImageForm, handleGallery } from '@/lib/functions';
import Toast from 'react-native-toast-message';
import LoadingModal from '@/components/ui/LoadingModal';
import { router } from 'expo-router';
import SheetSelection, { SheetSelectionRef } from '@/components/ui/SheetSelection';
import PostCreationSheetSelectElements from '@/components/new/PostCreationSheetSelectElement';
import FilterBar from '@/components/ui/FilterBar';
import GarageItem from '@/components/garage/GarageItem';
import { getCarImage } from '@/components/graphics/cars';
import GroupListItem from '@/components/social/groups/GroupListItem';
import { Car } from '@/lib/entity/Car';
import { getOwnGarage } from '@/lib/ApiCalls/CarApiCalls';
import { Group } from '@/lib/entity/Group';
import { SocialEvent } from '@/lib/entity/SocialEvent';
import { imageUpload } from '@/lib/ApiCalls/ImageApiCalls';
import { publishPost } from '@/lib/ApiCalls/PostApiCalls';
import { getOwnGroups } from '@/lib/ApiCalls/GroupApiCalls';

export default function NewPost() {
  const { language } = useLanguage();
  const { user } = useAuthentication();
  const { colorScheme } = useColorScheme();

  const sheet = useRef<SheetSelectionRef>(null);
  const groupSheet = useRef<SheetSelectionRef>(null);
  const eventSheet = useRef<SheetSelectionRef>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [userGroups, setUserGroups] = useState<Group[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<SocialEvent | null>(null);
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState<Car | null>();
  const [newPostForm, setNewPostForm] = useState<CreatePostRequest>({
    description: '',
    location: '',
    userId: user!.id,
    groupId: null,
    eventId: null,
    images: images,
    vehicleId: null,
  });
  const [cars, setCars] = useState<Car[]>([]);
  useEffect(() => {
    getCars();
    getGroups();
  }, []);
  useEffect(() => {
    setNewPostForm({
      ...newPostForm,
      groupId: selectedGroup ? selectedGroup.id : null,
      eventId: selectedEvent ? selectedEvent.id : null,
      images: images,
    });
  }, [images, selectedEvent, selectedGroup]);
  function handlePresent() {
    bottomSheetRef.current?.present();
  }
  async function getCars() {
    const res = await getOwnGarage();
    if (res) {
      setCars(res);
    }
  }
  async function getGroups() {
    const res = await getOwnGroups();
    if (res) setUserGroups(res);
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
        text: newPostForm.description || '',
        location: newPostForm.location || '',
        postImages: uploadedImages,
        vehicleId: newPostForm.vehicleId,
      };
      const storeRes = await publishPost(imageStoreRequest);
      bottomSheetRef.current?.dismiss();
      if (storeRes) {
        Toast.show({
          type: 'success',
          text1: PostCreationTexts.imageUploadSuccessToast.header[language],
          text2: PostCreationTexts.imageUploadSuccessToast.message[language],
        });
        setImages([]);
        setNewPostForm({
          description: '',
          location: '',
          userId: user!.id,
          groupId: selectedGroup ? selectedGroup.id : null,
          eventId: selectedEvent ? selectedEvent.id : null,
          images: [],
          vehicleId: null,
        });
        setLoading(false);
        router.replace('/(root)/home');
        router.push({
          pathname: '/(post)/page/[id]',
          params: { id: storeRes.postId as string, isNew: 'true' },
        });
      } else {
        Toast.show({
          type: 'error',
          text1: PostCreationTexts.imageUploadErrorAlert[language],
        });
      }
    } else {
      cleanupInvalidImageUploads(uploadedImages);
      Toast.show({
        type: 'error',
        text1: 'Some images failed to upload (' + uploadedImages.length + '/' + images.length + ')',
      });
      return;
    }
  }

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  if (user === undefined) return <LoadingModal loading={true} colorScheme={colorScheme!} />;
  if (user === null) return;
  return (
    <>
      <LoadingModal loading={loading} colorScheme={colorScheme!} text="Posting.." />
      <View className="w-full secondary pt-16">
        <Image
          source={colorScheme === 'dark' ? Images.logo_white : Images.logo_black}
          className="h-8 mx-auto my-4"
          resizeMode="contain"
        />
      </View>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={40} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never" bounces={false}>
          <Pressable onPress={() => Keyboard.dismiss()} className="flex h-screen flex-col">
            <View className=" basis-3/12 w-full secondary rounded-b-xl">
              {images.length > 0 ? (
                <Carousel
                  width={Dimensions.get('screen').width}
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
                        <MaterialCommunityIcons name="close" size={46} color={Colors[colorScheme!].text} />
                      </TouchableOpacity>
                      <Image
                        source={{
                          uri: images[index].uri,
                        }}
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
                <MaterialCommunityIcons name="image-outline" color={Colors[colorScheme!].text} size={36} />
              </View>
              <ThemedText className="txl">{PostCreationTexts.upload[language]}</ThemedText>
              <ThemedText className="tsm flex items-center">
                {images.length || 0} {PostCreationTexts.selectedImages[language]}
              </ThemedText>
            </TouchableOpacity>
            {images.length > 0 && (
              <TouchableOpacity className="mx-auto my-2" onPress={() => setImages([])}>
                <ThemedText className="font-semibold underline">{PostCreationTexts.clearImages[language]}</ThemedText>
              </TouchableOpacity>
            )}
            <View className=" w-full">
              <View className="w-full flex flex-col justify-center items-center">
                <Input
                  label={PostCreationTexts.form.description.label[language]}
                  icon="pencil"
                  size={28}
                  TextInputProps={{
                    placeholder: PostCreationTexts.form.description.placeholder[language],
                    multiline: true,
                    numberOfLines: 4,
                    style: { maxHeight: 100 },
                    onChangeText: (text) => {
                      setNewPostForm({
                        ...newPostForm,
                        description: text,
                      });
                    },
                  }}
                  colorScheme={colorScheme!}
                  containerClassName="rounded-xl"
                />
                <View className="justify-between mb-4 flex flex-row  ">
                  <View className=" flex-1 w-6/12 self-start">
                    <ThemedText className="w-full text-lg">
                      <MaterialCommunityIcons name="account-group" size={19} /> {PostCreationTexts.form.group[language]}
                    </ThemedText>
                    <SheetSelection
                      ref={groupSheet}
                      colorScheme={colorScheme!}
                      placeholder={selectedGroup ? selectedGroup.name : 'Select a group'}
                      language={language}
                      FlashListProps={{
                        data: userGroups,
                        renderItem: ({ item, index }) => (
                          <GroupListItem
                            group={item}
                            colorScheme={colorScheme!}
                            language={language}
                            onPress={() => {
                              groupSheet.current?.dismissSheet();
                              setSelectedGroup(item);
                              setNewPostForm({
                                ...newPostForm,
                                groupId: item.id,
                              });
                            }}
                          />
                        ),
                        estimatedItemSize: 50,

                        ListHeaderComponent: () => (
                          <FilterBar placeholder="Search groups" onChange={(text: string) => {}} />
                        ),
                      }}
                    />
                  </View>
                  <View className=" flex-1 w-6/12 self-end">
                    <ThemedText className="w-11/12 text-lg">
                      <MaterialCommunityIcons name="calendar-account-outline" size={19} />{' '}
                      {PostCreationTexts.form.event[language]}
                    </ThemedText>

                    <SheetSelection
                      colorScheme={colorScheme!}
                      placeholder="Select an event"
                      language={language}
                      FlashListProps={{
                        data: [
                          {
                            title: 'Event 1',
                            date: '2022.12.12',
                          },
                        ],
                        renderItem: ({ item, index }) => (
                          <PostCreationSheetSelectElements
                            onPress={() => console.log(item.title)}
                            event={{
                              title: item.title,
                            }}
                            title={item.title}
                          />
                        ),
                        estimatedItemSize: 50,
                        ListHeaderComponent: () => (
                          <FilterBar placeholder="Search events" onChange={(text: string) => {}} />
                        ),
                      }}
                    />
                  </View>
                </View>
                <SheetSelection
                  ref={sheet}
                  placeholder={
                    <View className="flex flex-row items-center">
                      {car && getCarImage(car.type, colorScheme!, 90, 52, 3.3)}
                      <ThemedText className="tlg">
                        {car ? car.manufacturer + ' ' + car.model : 'Select a vehicle'}
                      </ThemedText>
                    </View>
                  }
                  language={language}
                  colorScheme={colorScheme!}
                  FlashListProps={{
                    data: cars,
                    ListHeaderComponent: () => (
                      <View>
                        <Button
                          onPress={() => sheet.current?.dismissSheet()}
                          className="button highlight-themed outline"
                        >
                          Close
                        </Button>
                        <Pressable
                          className="w-11/12 my-2 mx-auto rounded-l overflow-hidden flex justify-center items-center"
                          onPress={() => {
                            sheet.current?.dismissSheet();
                            setCar(null);
                            setNewPostForm({
                              ...newPostForm,
                              vehicleId: null,
                            });
                          }}
                        >
                          <ImageBackground
                            className="w-full secondary rounded-xl mx-auto"
                            resizeMode="repeat"
                            source={Images.banner_placeholder}
                          >
                            <ThemedText className="font-bold w-full mx-auto text-center text-lg p-3 rounded-xl">
                              Unassign vehicle
                            </ThemedText>
                          </ImageBackground>
                        </Pressable>
                      </View>
                    ),
                    renderItem: ({ item }) => (
                      <Pressable
                        onPress={() => {
                          sheet.current?.dismissSheet();
                          setCar(item);
                          setNewPostForm({
                            ...newPostForm,
                            vehicleId: item.id,
                          });
                        }}
                      >
                        <View className="pointer-events-none">
                          <GarageItem isOwner={true} colorScheme={colorScheme!} language={language} car={item} />
                        </View>
                      </Pressable>
                    ),
                  }}
                />
                <Input
                  label={PostCreationTexts.form.location.label[language]}
                  icon={'map-marker-outline'}
                  size={28}
                  TextInputProps={{
                    placeholder: PostCreationTexts.form.location.placeholder[language],
                    onChangeText: (text) => {
                      setNewPostForm({
                        ...newPostForm,
                        location: text,
                      });
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
                            cancelable: true,
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
                snapPoints={['90%', '95%']}
                handleIndicatorStyle={{
                  backgroundColor: Colors[colorScheme!].text,
                  width: '33%',
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
                    reaction={'FIRE'}
                    postId={null}
                    authorProfileImg={user!.profileImg}
                    authorId={null}
                    authorNickname={user!.nickname}
                    vehicle={car ? car : null}
                    authorUsername={user!.username}
                    colorScheme={colorScheme!}
                    date={new Date().toDateString()}
                    description={newPostForm.description}
                    images={images.map((image) => {
                      return {
                        url: image.uri,
                        deleteHash: '',
                      };
                    })}
                    language={language}
                    location={newPostForm.location}
                    comments={[]}
                    preview
                    reactions={{
                      FIRE: 432,
                      HEART: 1,
                      COOL: 0,
                    }}
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
                  <Button onPress={handleSubmit} className=" mt-2 p-2 btn-highlight button btn-fill">
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

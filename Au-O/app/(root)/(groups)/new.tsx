import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "@/components/ui/Input";
import { useColorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import { Images } from "@/lib/staticAssetExports";
import GarageItem from "@/components/garage/GarageItem";
import { useEffect, useState } from "react";
import { CarType, GroupCreationRequest } from "@/constants/types";
import { CarCreationRequest } from "@/constants/types";
import SheetSelection, {
  SheetSelectionRef,
} from "@/components/ui/SheetSelection";
import CarTypeListItem from "@/components/garage/CarTypeListItem";
import Button from "@/components/ui/Button";
import { useRef } from "react";
import CollapsibleText from "@/components/ui/CollapsibleText";
import { addCar, createGroup, imageUpload } from "@/lib/apiClient";
import Toast from "react-native-toast-message";
import SocialCard from "@/components/social/SocialCard";
import NewSocial from "@/components/social/NewSocial";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  createImageForm,
  getOneImageFromGallery,
  getTimestamp,
  handleGallery,
} from "@/lib/functions";
import { Colors } from "@/constants/Colors";
import ThemedText from "@/components/ui/ThemedText";
import { PostCreationTexts } from "@/constants/texts";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import LoadingModal from "@/components/ui/LoadingModal";
import { ImagePickerAsset } from "expo-image-picker";
import { router } from "expo-router";
export default function NewPostPage() {
  const { language } = useLanguage();
  const { user } = useAuthentication();
  const [imagePreview, setImagePreview] = useState<ImagePickerAsset | null>(null);

  const [newGroupForm, setNewGroupForm] = useState<GroupCreationRequest>({
    name: "",
    description: "",
    alias: "",
    bannerImage: "",
  });
  async function openGallery() {
    const res = await getOneImageFromGallery();
    if (res) {
      setImagePreview(res);
      
      return;
    }

  }
  async function handleSubmit() {
    if (imagePreview) {
      const imageForm = await createImageForm(
        imagePreview,
        Date.now() + "_GROUP_BANNER",
        user!
      );
      const upload = await imageUpload(imageForm);
      if (upload) {
        setNewGroupForm({ ...newGroupForm, bannerImage: upload.url });
        prepareGroup(upload.url);
      }
    }
    else {prepareGroup()}
  }
  async function prepareGroup(image?: string) {
    const createGroupRes = await createGroup({
      alias: newGroupForm.alias,
      bannerImage: image ? image : "",
      description: newGroupForm.description,
      name: newGroupForm.name,
    });
    if (createGroupRes) {
      Toast.show({
        type: "success",
        text1: "Group successfully created",
      });
      setNewGroupForm({
        name: "",
        description: "",
        alias: "",
        bannerImage: "",
      })
      router.replace("/(root)/(groups)/feed");
      router.push({pathname: "/(root)/(groups)/[id]", params: { id: createGroupRes.id  }});
      return;
    }
    Toast.show({
      type: "error",
      text1: "Error creating group.",
    });
  }
  const { colorScheme } = useColorScheme();
  if (!user) return <LoadingModal loading={true} colorScheme={colorScheme!} />;
  return (
    <ScrollView
      className="background"
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      bounces={false}
    >
      <View className="w-full justify-evenly flex flex-col pt-safe-offset-1 secondary">
        <Image
          source={
            colorScheme === "light" ? Images.logo_black : Images.logo_white
          }
          className=" h-8 m-auto mb-2"
          resizeMode="contain"
        />
      </View>
      <View className="mx-4">
        <SocialCard
          preview="CREATE"
          colorScheme={colorScheme!}
          language={language}
          type="GROUP"
          onCreatePress={openGallery}
          group={{
            alias: newGroupForm.alias.length > 0 ? newGroupForm.alias : "NEW",
            bannerImage: imagePreview?.uri!,
            creationDate: Date.now().toString(),
            id: "123",
            description:
              newGroupForm.description.length > 0
                ? newGroupForm.description
                : "Provide a fitting description for your new group.",
            member: true,
            public: true,
            memberCount: 123,
            name:
              newGroupForm.name.length > 0 ? newGroupForm.name : "New Group",
          }}
        />
      </View>
      <Pressable
        className="flex h-screen flex-col"
        onPress={() => Keyboard.dismiss()}
      >
        <Input
          label="Name"
          icon="id-card"
          TextInputProps={{
            placeholder: "Name",
            value: newGroupForm.name,
            onChangeText: (text) =>
              setNewGroupForm({ ...newGroupForm, name: text }),
          }}
          colorScheme={colorScheme!}
        />
        <Input
          label="Description"
          icon="pencil-box-outline"
          TextInputProps={{
            placeholder: "Description",
            value: newGroupForm.description,
            multiline: true,
            numberOfLines: 4,
            
            onChangeText: (text) =>
              setNewGroupForm({ ...newGroupForm, description: text }),
          }}
          colorScheme={colorScheme!}
        />
        <Input
          label="Alias"
          icon="bookmark-check-outline"
          TextInputProps={{
            placeholder: "Alias",
            maxLength: 8,
            value: newGroupForm.alias,
            
            onChangeText: (text) =>
              setNewGroupForm({ ...newGroupForm, alias: text.toUpperCase().replace(/[^A-Z]/g, "") }),
          }}
          colorScheme={colorScheme!}
        />
        <TouchableOpacity
          onPress={openGallery}
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
            Upload Banner
          </ThemedText>
        </TouchableOpacity>
        <NewSocial
          text={`Create ${
            newGroupForm.name.length > 0 ? newGroupForm.name : "Group"
          }`}
          onPress={() => {
            handleSubmit();
          }}
        />
      </Pressable>
    </ScrollView>
  );
}

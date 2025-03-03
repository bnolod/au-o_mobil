import { Keyboard, Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import Input from '@/components/ui/Input';
import { useColorScheme } from 'nativewind';
import { useLanguage } from '@/contexts/LanguageContext';
import { Images } from '@/lib/staticAssetExports';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import SocialCard from '@/components/social/base/SocialCard';
import NewSocial from '@/components/social/base/NewSocial';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createImageForm, getOneImageFromGallery } from '@/lib/functions';
import { Colors } from '@/constants/Colors';
import ThemedText from '@/components/ui/ThemedText';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import LoadingModal from '@/components/ui/LoadingModal';
import { ImagePickerAsset } from 'expo-image-picker';
import { router } from 'expo-router';
import { createGroup } from '@/lib/ApiCalls/GroupApiCalls';
import { GroupCreationRequest } from '@/lib/request/GroupCreationRequest';
import { imageUpload } from '@/lib/ApiCalls/ImageApiCalls';
import { Image } from 'expo-image';
import { validateNewGroup } from '@/lib/Validation/Validation';
import { groupCreated, groupFailed } from '@/lib/Validation/responses';
export default function NewPostPage() {
  const { language } = useLanguage();
  const { user } = useAuthentication();
  const [imagePreview, setImagePreview] = useState<ImagePickerAsset | null>(null);
  const [newGroupForm, setNewGroupForm] = useState<GroupCreationRequest>({
    name: '',
    description: '',
    alias: '',
    bannerImage: '',
    public: true,
  });

  async function openGallery() {
    const res = await getOneImageFromGallery();
    if (res) {
      setImagePreview(res);

      return;
    }
  }
  async function handleSubmit() {
    if (!validateNewGroup(newGroupForm.name, newGroupForm.description, newGroupForm.alias, language).valid) {
      return
    }
    if (imagePreview) {
      const imageForm = await createImageForm(imagePreview, Date.now() + '_GROUP_BANNER', user!);
      const upload = await imageUpload(imageForm);
      if (upload) {
        setNewGroupForm({ ...newGroupForm, bannerImage: upload.url });
        prepareGroup(upload.url);
      }
    } else {
      prepareGroup();
    }
  }
  async function prepareGroup(image?: string) {
    const createGroupRes = await createGroup({
      alias: newGroupForm.alias,
      bannerImage: image ? image : '',
      description: newGroupForm.description,
      name: newGroupForm.name,
      public: newGroupForm.public,
    });
    if (createGroupRes) {
      Toast.show({
        type: 'success',
        text1: groupCreated[language],
      });
      setNewGroupForm({
        name: '',
        description: '',
        alias: '',
        bannerImage: '',
        public: true,
      });
      router.replace('/(root)/(groups)/feed');
      router.push({ pathname: '/(root)/(groups)/[id]', params: { id: createGroupRes.id } });
      return;
    }
    Toast.show({
      type: 'error',
      text1: groupFailed[language],
    });
  }
  const { colorScheme } = useColorScheme();
  if (!user) return <LoadingModal loading={true} colorScheme={colorScheme!} />;
  return (
    <ScrollView className="background" showsVerticalScrollIndicator={false} overScrollMode="never" bounces={false}>
      <View className="w-full justify-evenly flex flex-col pt-safe-offset-1 secondary">
        <Image
          source={colorScheme === 'light' ? Images.logo_black : Images.logo_white}
          contentFit="contain"
          style={{ margin: 'auto', height: 32, width: 96, marginBottom: 8 }}
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
            alias: newGroupForm.alias.length > 0 ? newGroupForm.alias : 'NEW',
            bannerImage: imagePreview?.uri!,
            creationDate: Date.now().toString(),
            id: 123,
            description:
              newGroupForm.description.length > 0
                ? newGroupForm.description
                : 'Provide a fitting description for your new group.',
            member: true,
            public: newGroupForm.public,
            validMember: true,
            
            memberCount: 123,
            name: newGroupForm.name.length > 0 ? newGroupForm.name : 'New Group',
          }}
        />
      </View>
      <Pressable className="flex h-screen flex-col" onPress={() => Keyboard.dismiss()}>
        <View className='flex flex-row justify-between items-center'>
          <View className='w-9/12 ml-1 self-start'>

        <Input
          label="Name"
          icon="id-card"
          TextInputProps={{
            placeholder: 'Name',
            value: newGroupForm.name,
            onChangeText: (text) => setNewGroupForm({ ...newGroupForm, name: text }),
          }}
          colorScheme={colorScheme!}
          
          />
          </View>
          <View className='w-3/12 items-center flex justify-center'>
            <TouchableOpacity className='secondary button flex items-center justify-center' onPress={() => setNewGroupForm({ ...newGroupForm, public: !newGroupForm.public })}>
            <MaterialCommunityIcons name={newGroupForm.public ? "door-open" : "door-closed-lock"} size={24} color={Colors[colorScheme!].text} />
            <ThemedText>
              {newGroupForm.public ? 'Public' : 'Private'}
            </ThemedText>
            </TouchableOpacity>
          </View>
          </View>
                <Input
          label="Alias"
          icon="bookmark-check-outline"
          TextInputProps={{
            placeholder: 'Alias',
            maxLength: 8,
            value: newGroupForm.alias,

            onChangeText: (text) =>
              setNewGroupForm({ ...newGroupForm, alias: text.toUpperCase().replace(/[^A-Z]/g, '') }),
          }}
          colorScheme={colorScheme!}
        />
        <Input
          label="Description"
          icon="pencil-box-outline"
          TextInputProps={{
            placeholder: 'Description',
            value: newGroupForm.description,
            multiline: true,
            numberOfLines: 4,

            onChangeText: (text) => setNewGroupForm({ ...newGroupForm, description: text }),
          }}
          colorScheme={colorScheme!}
        />

        <TouchableOpacity onPress={openGallery} className="new-post-gallery-opener mx-auto">
          <View className="absolute -left-4">
            <MaterialCommunityIcons name="image-outline" color={Colors[colorScheme!].text} size={36} />
          </View>
          <ThemedText className="txl">Upload Banner</ThemedText>
        </TouchableOpacity>
        <NewSocial
          text={`Create ${newGroupForm.name.length > 0 ? newGroupForm.name : 'Group'}`}
          onPress={() => {
            handleSubmit();
          }}
        />
      </Pressable>
    </ScrollView>
  );
}

import { Keyboard, Platform, Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import SocialCard from '@/components/social/base/SocialCard';
import { useColorScheme } from 'nativewind';
import { useLanguage } from '@/contexts/LanguageContext';
import CreationHeader from '@/components/social/base/CreationHeader';
import { openSocialGallery } from '@/components/social/base/functions';
import { useState } from 'react';
import { ImagePickerAsset } from 'expo-image-picker';
import SocialEventCreationRequest from '@/lib/request/SocialEventCreationRequest';
import { EventTexts } from '@/constants/texts';
import Input from '@/components/ui/Input';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import NewSocial from '@/components/social/base/NewSocial';
import RNDateTimePicker from '@react-native-community/datetimepicker';
export default function NewEventPage() {
  const p = EventTexts.creation.placeholders;
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const [imagePreview, setImagePreview] = useState<ImagePickerAsset>();
  const [newEventForm, setNewEventForm] = useState<SocialEventCreationRequest>({
    bannerImage: '',
    description: '',
    endDate: '',
    location: '',
    name: '',
    public: true,
    startDate: '',
    groupId: undefined,
  });
  return (
    <ScrollView className="background" showsVerticalScrollIndicator={false} overScrollMode="never" bounces={false}>
      <CreationHeader colorScheme={colorScheme!} />
      <View className='mx-4'>

      <SocialCard
        preview="CREATE"
        colorScheme={colorScheme!}
        language={language}
        type="EVENT"
        onCreatePress={async () => {
          const glry = await openSocialGallery();
          if (glry === null) return;
          setImagePreview(glry);
        }}
        group={undefined}
        event={{
          name: newEventForm.name ? newEventForm.name : p.name[language],
          location: newEventForm.location ? newEventForm.location : p.location[language],
          startDate: newEventForm.startDate ? newEventForm.startDate : '2024. 03. 06.',
          public: newEventForm.public,
          id: 0,
          isAttending: true,
          attendees: 1900,
          bannerImage: imagePreview ? imagePreview.uri : '',
          creationDate: new Date().toDateString(),
          description: newEventForm.description ? newEventForm.description : p.description[language],
          endDate: newEventForm.endDate ? newEventForm.endDate: '2024.03.07',
        }}
        />
        </View>
        
      <Pressable className="flex h-screen flex-col" onPress={() => Keyboard.dismiss()}>
        <View className="flex flex-row justify-between items-center">
          <View className="w-9/12 ml-1 self-start">
            <Input
              label="Name"
              icon="id-card"
              TextInputProps={{
                placeholder: 'Name',
                value: newEventForm.name,
                onChangeText: (text) => setNewEventForm({ ...newEventForm, name: text }),
              }}
              colorScheme={colorScheme!}
            />
          </View>
          <View className="w-3/12 items-center flex justify-center">
            <TouchableOpacity
              className="secondary button flex items-center justify-center"
              onPress={() => setNewEventForm({ ...newEventForm, public: !newEventForm.public })}
            >
              <MaterialCommunityIcons
                name={newEventForm.public ? 'door-open' : 'door-closed-lock'}
                size={24}
                color={Colors[colorScheme!].text}
              />
              <ThemedText>{newEventForm.public ? 'Public' : 'Private'}</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <Input
          label="Description"
          icon="pencil-box-outline"
          TextInputProps={{
            placeholder: 'Description',
            value: newEventForm.description,
            multiline: true,
            numberOfLines: 4,
            
            onChangeText: (text) => setNewEventForm({ ...newEventForm, description: text }),
          }}
          colorScheme={colorScheme!}
        />
          <Input
            label="Location"
            icon="map-marker-outline"
            TextInputProps={{
              placeholder: 'Location',
              maxLength: 8,
              value: newEventForm.location,
  
              onChangeText: (text) =>
                setNewEventForm({ ...newEventForm, location: text.toUpperCase() }),
            }}
            colorScheme={colorScheme!}
          />

            <View className='flex flex-row justify-center mx-auto gap-2'>
              {
                Platform.OS === 'ios' ?
                (
                   <>
                  <View className='flex flex-col justify-center items-center'>
                    <View className='flex self-start items-center flex-row gap-2 tlg'>
                      <MaterialCommunityIcons name='calendar-start' size={24} color={Colors[colorScheme!].text} />
                      <ThemedText>Start Date</ThemedText>
                    </View>
                  <RNDateTimePicker value={new Date()} mode='datetime' display='default' onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setNewEventForm({ ...newEventForm, startDate: selectedDate.toDateString() });
                    }
                  }} />
                  </View>
                  <View className='flex flex-col justify-center items-center'>
                    <View className='flex self-end items-center flex-row gap-2 tlg'>
                      <MaterialCommunityIcons name='calendar-end' size={24} color={Colors[colorScheme!].text} />
                      <ThemedText>End Date</ThemedText>
                    </View>
                  <RNDateTimePicker value={new Date()} mode='datetime' display='default' onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setNewEventForm({ ...newEventForm, startDate: selectedDate.toDateString() });
                    }
                  }} />
                  </View>
                  </>
                )
                :
                (
                  <>
                  </>
                )
              }
            </View>
        <TouchableOpacity onPress={async () => {
            const glry = await openSocialGallery()
            if (glry === null) return
            setImagePreview(glry)
          }} className="new-post-gallery-opener mx-auto">
          <View className="absolute -left-4">
            <MaterialCommunityIcons name="image-outline" color={Colors[colorScheme!].text} size={36} />
          </View>
          <ThemedText className="txl">Upload Banner</ThemedText>
        </TouchableOpacity>
        <NewSocial
          text={`Create ${newEventForm.name.length > 0 ? newEventForm.name : 'Group'}`}
          onPress={() => {
            //handleSubmit();
          }}
        />
      </Pressable>
    </ScrollView>
  );
}

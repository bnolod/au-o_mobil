/**
 * Profil oldal komponens
 * @module home/user/Profile
 * @category Component
 */
import Button from '@/components/ui/Button';
import ThemedText from '@/components/ui/ThemedText';
import {  Text, TouchableOpacity, View } from 'react-native';
import { updateProfilePicture } from '@/lib/apiClient';
import { CommonStaticElementProps } from '@/constants/types';
import { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import UserLoading from '@/components/auth/UserLoading';
import RootHeader from '@/components/home/base/RootHeader';
import Avatar from '@/components/ui/Avatar';
import { generalTexts, SettingsTexts, SocialTexts, UserEditTexts } from '@/constants/texts';
import { handleTabSelection } from '@/lib/events';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { createImageForm, createTimestamp } from '@/lib/functions';
import Toast from 'react-native-toast-message';
import TextEditModal from '@/components/home/base/TextEditModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import FollowerSheet from './FollowerSheet';
import CollapsibleText from '@/components/ui/CollapsibleText';
import PostGrid from '@/components/social/base/PostGrid';
import GarageList from '@/components/garage/list/GarageList';
import NewSocial from '@/components/social/base/NewSocial';
import { followUser, unfollowUser, updateBio, updateNickname } from '@/lib/ApiCalls/UserApiCalls';
import { ProfileProps } from './props';
import ProfileTabSelector from './TabSelector';
import OwnGroupList from './OwnGroupsList';
import SavedPostGrid from './SavedPostGrid';
export default function Profile({
  user,
  language,
  colorScheme,
  profile,
  posts,
  id,
  followers,
  garage,
  setFollowers,
  following,
  refreshing,
}: ProfileProps & CommonStaticElementProps) {
  const [bioEdit, setBioEdit] = useState<boolean>(false);
  const [bioValue, setBioValue] = useState<string>(profile.bio);
  const [nicknameEdit, setNicknameEdit] = useState<boolean>(false);
  const [nicknameValue, setNicknameValue] = useState<string>(profile.nickname);
  const [selectedTab, setSelectedTab] = useState<'POST' | 'GROUPS' | 'SAVED' | 'GARAGE'>('POST');
  const followerSheetRef = useRef<BottomSheetModal>(null);

  

  async function handleFollow() {
    if (user && !followers.some((follower) => follower.id === user.id)) {
      const followRes = await followUser(id as string);
      if (followRes) {
        setFollowers([...followers, user]);
      }
    } else if (user && followers.some((follower) => follower.id === user.id)) {
      const unfollowRes = await unfollowUser(id as string);
      if (unfollowRes) {
        setFollowers(followers.filter((follower) => follower.id !== user.id));
      }
    }
  }
  const isOwner = profile && user && profile.id.toString() === (id as string) && user.id === profile.id;
  if (isOwner === undefined) return <UserLoading />;
  if (user && profile !== undefined && profile !== null)
    return (
  <View >
        {/* <RootHeader colorScheme={colorScheme!} language={language} /> */}
        <TextEditModal
          language={language}
          initialValue={bioValue}
          lines={3}
          colorScheme={colorScheme!}
          onSave={async (text) => {
            const res = await updateBio(text);
            if (res) {
              Toast.show({
                type: 'success',
                text1: UserEditTexts.success.bio[language],
              });
              setBioEdit(false);
              setBioValue(text);
            } else {
              Toast.show({
                type: 'error',
                text1: UserEditTexts.error.bio[language],
              });
            }
          }}
          visible={bioEdit}
          onCancel={() => setBioEdit(false)}
          labelComponent={
            <>
              <MaterialCommunityIcons name="pencil" size={24} />
              <ThemedText>{generalTexts.profileAttributes.bio[language]}</ThemedText>
            </>
          }
        />
        <TextEditModal
          language={language}
          initialValue={nicknameValue}
          colorScheme={colorScheme!}
          onSave={async (text) => {
            const res = await updateNickname(text);
            if (res) {
              Toast.show({
                type: 'success',
                text1: UserEditTexts.success.nickname[language],
              });
              setNicknameEdit(false);
              setNicknameValue(text);
            } else {
              Toast.show({
                type: 'error',
                text1: UserEditTexts.error.nickname[language],
              });
            }
          }}
          visible={nicknameEdit}
          onCancel={() => setNicknameEdit(false)}
          labelComponent={
            <>
              <MaterialCommunityIcons name="account-outline" size={24} />
              <ThemedText>{generalTexts.profileAttributes.nickname[language]}</ThemedText>
            </>
          }
          lines={1}
        />
        <View className={`secondary rounded-b-xl flex pb-4 mb-4  ${isOwner? "" : "pt-safe-offset-0"}`}>
        {isOwner && (
              <View
                className="bg-backdrop-primary dark:bg-backdrop-primary-dark pt-safe-offset-4 p-4 flex flex-row gap-2 w-full justify-between"
                style={{}}
              >
                <View className='flex flex-row'>
                <ThemedText className='self-center text-xl opacity-75'>{SettingsTexts.loggedInAs[language]} <Text className='font-bold'>{user.username}</Text></ThemedText>
                
                </View>
                
                <TouchableOpacity onPress={() => router.push('/(profile)/settings')} className='flex flex-row gap-2' >
                <ThemedText className='self-center text-xl opacity-75'>{SettingsTexts.header[language]}</ThemedText>
                <MaterialCommunityIcons name="cog-outline" size={32} color={Colors[colorScheme!].text} className='opacity-85' />
                </TouchableOpacity>
              </View>
            )}
          <View className="profile-data">
            
            <TouchableOpacity
              onLongPress={async () => {
                if (!isOwner) return;
                const res = await ImagePicker.launchImageLibraryAsync({
                  allowsEditing: true,
                  aspect: [1, 1],
                  allowsMultipleSelection: false,
                  quality: 0.6,
                  mediaTypes: 'images',
                });
                if (!res.canceled) {
                  const img = await createImageForm(
                    res.assets[0],
                    `${profile.username}_PROFILEPIC_${createTimestamp()}`,
                    profile!
                  );

                  if (img) {
                    const profileUpdateResponse = await updateProfilePicture(img);

                    if (profileUpdateResponse) {
                      Toast.show({
                        type: 'success',
                        text1: UserEditTexts.success.profilePicture[language],
                      });
                    } else {
                      Toast.show({
                        type: 'error',
                        text1: UserEditTexts.error.profilePicture[language],
                      });
                    }
                  }
                }
              }}
            >
              <Avatar image={profile.profileImg} nickname={nicknameValue} className="h-20 w-20 primary my-4" />
            </TouchableOpacity>
            <View>
              <ThemedText
                className="text-xl text-right underline"
                onPress={() => {
                  followerSheetRef.current?.dismiss();
                  followerSheetRef.current?.present({
                    followers,
                  });
                }}
              >
                {followers ? followers.length : 0} {generalTexts.followers.followerCount[language]}
                {followers && followers.length !== 1 && generalTexts.followers.followerCountMoreThanOne[language]}
              </ThemedText>
              <ThemedText
                className="text-lg text-right underline"
                onPress={() => {
                  followerSheetRef.current?.dismiss();
                  followerSheetRef.current?.present({
                    following,
                  });
                }}
              >
                {following ? following.length : 0} {generalTexts.following.followingCount[language]}
              </ThemedText>
            </View>
          </View>
          <BottomSheetModal
            style={{
              backgroundColor: Colors[colorScheme!].background,
            }}
            handleIndicatorStyle={{
              backgroundColor: Colors[colorScheme!].text,
              width: '40%',
            }}
            backgroundStyle={{
              backgroundColor: Colors[colorScheme!].background,
            }}
            ref={followerSheetRef}
            index={1}
            snapPoints={['50%']}
          >
            <FollowerSheet
              isOwner={isOwner}
              colorScheme={colorScheme}
              language={language}
              followers={followers}
              following={following}
              dismissSheet={() => followerSheetRef.current?.dismiss()}
            />
          </BottomSheetModal>
          <View className="pl-4">
            <ThemedText className="txl" onLongPress={() => setNicknameEdit(true)}>
              {nicknameValue}
            </ThemedText>
            <ThemedText className="muted">@{profile.username}</ThemedText>
          </View>
          <View className="profile-description">
            <View className={`profile-description-text ${isOwner && 'basis-5/6'}`}>
              <CollapsibleText
                className="text-lg px-4 opacity-90"
                TextProps={{
                  onLongPress: () => {
                    if (!isOwner) return;
                    setBioEdit(true);
                  },
                }}
              >
                {bioValue && bioValue.length > 0 ? bioValue : generalTexts.profileAttributes.bioEmpty[language]}
              </CollapsibleText>
              {isOwner && <ThemedText className="tsm muted">{UserEditTexts.prompts.edit[language]}</ThemedText>}
            </View>
            
          </View>
          {!isOwner ? (
            <View className="flex flex-row items-center px-5">
              <Button
                className={`follow-button ${
                  followers.some((follower) => follower.id === user.id) && 'bg-backdrop-primary opacity-50 dark:bg-backdrop-primary-dark button'
                } `}
                hapticFeedback="medium"
                style={{
                  shadowColor: Colors[colorScheme!].background,
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 1,
                  shadowRadius: 10,
                }}
                onPress={() => handleFollow()}
              >
                {followers.some((follower) => follower.id === user.id)
                  ? generalTexts.followButton.unfollow[language]
                  : generalTexts.followButton.follow[language]}
              </Button>
              <View className="misc-button-container">
                <Button className="profile-misc-button dark:bg-highlight-dark bg-highlight-light py-3" onPress={() => router.replace({pathname: "/(root)/chat/[id]", params: {id: profile.id}})}>Message</Button>
                <Button className="profile-misc-button">
                  <MaterialCommunityIcons name="dots-horizontal" size={24} />
                </Button>
              </View>
            </View>
          ) : (
            <ThemedText className="mx-auto my-3 opacity-25">{UserEditTexts.header[language]}</ThemedText>
          )}
          <ProfileTabSelector colorScheme={colorScheme} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </View>
        {isOwner && selectedTab !== 'SAVED' && (
          <NewSocial
            text={
              selectedTab === 'POST'
                ? SocialTexts.new.post[language]
                : selectedTab === 'GROUPS'
                  ? SocialTexts.new.group[language]
                  : selectedTab === 'GARAGE'
                    ? SocialTexts.new.car[language]
                    : SocialTexts.new.event[language]
            }
            onPress={
              selectedTab === 'POST'
                ? () => router.replace({ pathname: '/(root)/new' })
                : selectedTab === 'GROUPS'
                  ? () => router.replace({ pathname: '/(root)/(groups)/new' })
                  : selectedTab === 'GARAGE'
                    ? () => router.push('/(garage)/new')
                    : () => {} //to be implemented
            }
          />
        )}
        {selectedTab === 'POST' && posts.length !== 0 && (
          <PostGrid colorScheme={colorScheme} language={language} posts={posts} />
        )}
        {selectedTab === 'GARAGE' && garage.length !== 0 && (
          <GarageList userId={user.id.toString()} colorScheme={colorScheme} cars={garage} language={language} />
        )}
        {selectedTab === 'GROUPS' && (
          <OwnGroupList refreshing={refreshing} userId={profile.id}/>
        )}
        {selectedTab === 'SAVED' && (
          <SavedPostGrid refreshing={refreshing} colorScheme={colorScheme} language={language} userId={profile.id} />
        )}
      </View>
    );
}

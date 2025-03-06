import { CommonStaticElementProps } from '@/constants/types';
import { Alert, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import SocialBanner from '@/components/social/base/SocialBanner';
import Button from '@/components/ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedText from '@/components/ui/ThemedText';
import CollapsibleText from '@/components/ui/CollapsibleText';
import { useEffect, useState } from 'react';
import { Group } from '@/lib/entity/Group';
import GroupPostTab from './tabs/GroupPostTab';
import GroupEventsTab from './tabs/GroupEventsTab';
import GroupMembersTab from './tabs/GroupMembersTab';
import GroupInfoTab from './tabs/GroupInfoTab';
import { GroupTexts } from '@/constants/texts';
import { useWebSocket } from '@/contexts/WebSocketContext';
import GroupChatTab from './tabs/GroupChatTab';
import { handleShare } from '@/lib/events/PostOptionEvents';
import { leaveGroup } from '@/lib/ApiCalls/GroupApiCalls';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function GroupPage({ group, colorScheme, language }: CommonStaticElementProps & { group: Group }) {
  const [selectedTab, setSelectedTab] = useState<'POSTS' | 'EVENTS' | 'MEMBERS' | 'INFO' | 'CHAT'>('POSTS');
  const { subscribeToTopic } = useWebSocket();
  async function confirmLeave() {
    const res = await leaveGroup(group.id);
    if (res === 409) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not leave group, because you are the only admin',
      });
      return
    }
    if (res === 200) {
      router.canGoBack() ? router.back() : router.replace({ pathname: '/(root)/(groups)/feed' });
      Toast.show({
        type: 'success',
        text1: 'Successfully left group',
      });
      return;
    }
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Could not leave group',
    });
  }
  async function handleLeave() {
    if (group.validMember) {
      Platform.OS === 'ios'
        ? Alert.alert('Leave group', 'Are you sure you want to leave this group?', [
            { text: 'Leave', onPress: () => {
                confirmLeave();
            } },
            {
              text: 'Cancel',
              onPress: () => {
                return;
              },
              style: 'cancel',
            },
          ])
        : {};
      
    }
  }
  useEffect(() => {
    subscribeToTopic(`group/${group.id}`);

    return () => {
      // Cleanup any subscriptions here if needed
    };
  }, [group.id]);

  return (
    <View className="flex flex-col">
      <View className="basis-[45%]">
        <SocialBanner
          header
          id={group.id}
          name={group.name}
          image={group.bannerImage}
          colorScheme={colorScheme}
          count={group.memberCount}
          language={language}
        />
        <View className="group-page">
          <View className="flex flex-row items-center justify-between px-4 py-2">
            <Button className=" button secondary ml-0 basis-2/12 aspect-square items-center justify-center">
              <MaterialCommunityIcons
                name="account-group-outline"
                size={40}
                color={colorScheme === 'light' ? 'black' : 'white'}
              />
            </Button>
            <ThemedText numberOfLines={2} className="text-2xl basis-7/12 font-bold">
              {group.name} <ThemedText className="tsm font-light muted ">{group.alias} </ThemedText>
            </ThemedText>
            <ThemedText></ThemedText>
            <Button className="button py-0 background mr-0 basis-2/12  items-center justify-center">
              <MaterialCommunityIcons
                onPress={
                  Platform.OS === 'ios'
                    ? () => {
                        //IOS
                        Alert.alert('Options', group.name, [
                          group.validMember
                            ? { text: 'Leave', onPress: () => handleLeave() }
                            : { text: 'Revoke join request', onPress: () => console.log('Join request revoked') },
                          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                          { text: 'Share', onPress: () => handleShare(group.id, language) },
                        ]);
                      }
                    : () => {
                        //ANDROID
                      }
                }
                name="dots-horizontal"
                size={32}
                color={colorScheme === 'light' ? 'black' : 'white'}
              />
            </Button>
          </View>
          <CollapsibleText className="w-11/12 mx-auto mt-2 text-lg leading-tight" restrictedLineCount={5}>
            {group.description}
          </CollapsibleText>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex h-16 flex-row gap-4 px-4 py-2">
            <TouchableOpacity
              onPress={() => setSelectedTab('POSTS')}
              className={`button ${
                selectedTab === 'POSTS' ? 'highlight-themed' : 'secondary'
              } flex flex-row gap-2 items-center justify-center`}
            >
              <ThemedText>
                <MaterialCommunityIcons name="cards-outline" size={24} />
              </ThemedText>
              <ThemedText className="text-xl">{GroupTexts.page.posts[language]}</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('EVENTS')}
              className={`button ${
                selectedTab === 'EVENTS' ? 'highlight-themed' : 'secondary'
              } flex flex-row gap-2 items-center justify-center`}
            >
              <ThemedText>
                <MaterialCommunityIcons name="calendar-check-outline" size={24} />
              </ThemedText>
              <ThemedText className="text-xl">{GroupTexts.page.events[language]}</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('MEMBERS')}
              className={`button ${
                selectedTab === 'MEMBERS' ? 'highlight-themed' : 'secondary'
              } flex flex-row gap-2 items-center justify-center`}
            >
              <ThemedText>
                <MaterialCommunityIcons name="account-group-outline" size={24} />
              </ThemedText>
              <ThemedText className="text-xl">{GroupTexts.page.members[language]}</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('INFO')}
              className={`button ${
                selectedTab === 'INFO' ? 'highlight-themed' : 'secondary'
              } flex flex-row gap-2 items-center justify-center`}
            >
              <ThemedText>
                <MaterialCommunityIcons name="information-outline" size={24} />
              </ThemedText>
              <ThemedText className="text-xl">{GroupTexts.page.info[language]}</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedTab('CHAT')}
              className={`button ${
                selectedTab === 'CHAT' ? 'highlight-themed' : 'secondary'
              } flex flex-row gap-2 items-center justify-center`}
            >
              <ThemedText>
                <MaterialCommunityIcons name="information-outline" size={24} />
              </ThemedText>
              <ThemedText className="text-xl">chat</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View className=" basis-5/12">
        {selectedTab === 'POSTS' && <GroupPostTab group={group} colorScheme={colorScheme} language={language} />}
        {selectedTab === 'EVENTS' && <GroupEventsTab group={group} colorScheme={colorScheme} language={language} />}
        {selectedTab === 'MEMBERS' && <GroupMembersTab group={group} colorScheme={colorScheme} language={language} />}
        {selectedTab === 'INFO' && <GroupInfoTab group={group} colorScheme={colorScheme} language={language} />}
        {selectedTab === 'CHAT' && <GroupChatTab group={group} />}
      </View>
    </View>
  );
}

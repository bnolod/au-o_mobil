/**
 * Csoport oldal
 * @module social/groups/GroupPage
 * @category Component
 */
import { CommonStaticElementProps } from '@/constants/types';
import { Alert, Platform, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import SocialBanner from '@/components/social/base/SocialBanner';
import Button from '@/components/ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedText from '@/components/ui/ThemedText';
import CollapsibleText from '@/components/ui/CollapsibleText';
import { useEffect, useState } from 'react';
import { Group, GroupMemberResponse } from '@/lib/entity/Group';
import GroupPostTab from './tabs/GroupPostTab';
import GroupMembersTab from './tabs/GroupMembersTab';
import GroupInfoTab from './tabs/GroupInfoTab';
import { GroupTexts } from '@/constants/texts';
import { useWebSocket } from '@/contexts/WebSocketContext';
import GroupChatTab from './tabs/GroupChatTab';
import { getGroupStatus, leaveGroup } from '@/lib/ApiCalls/GroupApiCalls';
import GroupOptionSheet from './GroupOptionSheet';
import LoadingModal from '@/components/ui/LoadingModal';
import GroupEditTab from './tabs/GroupEditTab';
/**
 * @param {group, colorScheme, language} props Tulajdonságok
 */
export default function GroupPage({ group, colorScheme, language }: CommonStaticElementProps & { group: Group }) {
  const [selectedTab, setSelectedTab] = useState<'POSTS' | 'EVENTS' | 'MEMBERS' | 'INFO' | 'CHAT' | 'EDIT'>('POSTS');
  const { subscribeToTopic } = useWebSocket();
  const [status, setStatus] = useState<GroupMemberResponse>();
  const [optionSheetShown, setOptionSheetShown] = useState(false);
const [refreshing,setRefresh] = useState(false);
const handleRefresh = () => {
  setRefresh(true);

  setTimeout(() => {
    setRefresh(false);
  }, 1000);
};

  async function getStatus() {
    if (group.member) {
      const res = await getGroupStatus(group.id);
      if (res) {
        setStatus(res);
        return;
      }
      return;
    }
  }

  useEffect(() => {
    subscribeToTopic(`group/${group.id}`);
    getStatus();
    return () => {
      // Cleanup any subscriptions here if needed
    };
  }, [group.id, refreshing]);
  if (!group) return <LoadingModal colorScheme={colorScheme} loading={!group} />;
  else
    return (
      <ScrollView className="pb-safe-offset-96"
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing}>
                    <LoadingModal colorScheme={colorScheme!} loading={refreshing} />
                  </RefreshControl>
      }>
        <View className="">
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

              <GroupOptionSheet
                group={group}
                colorScheme={colorScheme}
                isOwner={group.member && status ? status.role === 'ADMIN' : false}
                language={language}
                menuVisible={optionSheetShown}
                setVisible={setOptionSheetShown}
              />

              <Button className={`button py-0 background mr-0 basis-2/12  items-center justify-center ${group.member && status ? '' : 'opacity-0'}`}>
                <MaterialCommunityIcons
                  onPress={() => {
                    if (group.member && status) {
                      setOptionSheetShown(true);
                    }
                  }}
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
          {group.member && (
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
                  onPress={() => setSelectedTab('CHAT')}
                  className={`button ${
                    selectedTab === 'CHAT' ? 'highlight-themed' : 'secondary'
                  } flex flex-row gap-2 items-center justify-center`}
                >
                  <ThemedText>
                    <MaterialCommunityIcons name="chat-outline" size={24} />
                  </ThemedText>
                  <ThemedText className="text-xl">Chat</ThemedText>
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
                {group.member && status && status.role === 'ADMIN' && (
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
                )}
                {group.member && status && status.role === 'ADMIN' && (
                  <TouchableOpacity
                    onPress={() => setSelectedTab('EDIT')}
                    className={`button ${
                      selectedTab === 'EDIT' ? 'highlight-themed' : 'secondary'
                    } flex flex-row gap-2 items-center justify-center`}
                  >
                    <ThemedText>
                      <MaterialCommunityIcons name="wrench-outline" size={24} />
                    </ThemedText>
                    <ThemedText className="text-xl">{GroupTexts.page.edit[language]}</ThemedText>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          )}
        </View>
        <View className=" basis-5/12">
          {selectedTab === 'POSTS' && <GroupPostTab group={group} colorScheme={colorScheme} language={language} />}

          {group.member && status && selectedTab === 'MEMBERS' && (
            <GroupMembersTab status={status.role} group={group} colorScheme={colorScheme} language={language} />
          )}
          {group.member &&
            status &&
            selectedTab === 'INFO' &&
            (status.role === 'ADMIN' || status.role === 'MODERATOR') && (
              <GroupInfoTab status={status.role} group={group} colorScheme={colorScheme} language={language} />
            )}
          {group.member && status && selectedTab === 'CHAT' && (
            <GroupChatTab colorScheme={colorScheme} status={status.role} language={language} group={group} />
          )}
          {group.member && status && selectedTab === 'EDIT' && status.role === 'ADMIN' && (
            <GroupEditTab status={status.role} colorScheme={colorScheme} language={language} group={group} />
          )}
        </View>
      </ScrollView>
    );
}

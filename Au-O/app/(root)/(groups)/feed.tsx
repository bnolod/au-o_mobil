import RootHeader from '@/components/home/base/RootHeader';
import PostCard from '@/components/Post/Post';
import NewSocial from '@/components/social/base/NewSocial';
import SocialCard from '@/components/social/base/SocialCard';
import SocialSort from '@/components/social/base/SocialSort';
import LoadingModal from '@/components/ui/LoadingModal';
import ThemedText from '@/components/ui/ThemedText';
import { Colors } from '@/constants/Colors';
import { GroupTexts } from '@/constants/texts';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getGroupPosts, getOwnGroups } from '@/lib/ApiCalls/GroupApiCalls';
import { Group } from '@/lib/entity/Group';
import { Post } from '@/lib/entity/Post';
import { SocialEvent } from '@/lib/entity/SocialEvent';
import { loading } from '@/lib/Validation/responses';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

export default function GroupFeed() {
  const { user } = useAuthentication();
  const { language } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState<Group | SocialEvent | undefined | null>(undefined);
  const [groups, setGroups] = useState<Group[]>();
  const [posts, setPosts] = useState<Post[]>();
  const { colorScheme } = useColorScheme();
  async function fetchItems() {
    const res = await getOwnGroups();
    if (res) {
      setGroups(res);
    }
  }
  async function fetchGroupPosts() {
    if (!selected) return;
    const res = await getGroupPosts(selected!.id);
    if (res) {
      setPosts(res);
    }
  }
  useEffect(() => {
    fetchItems();
    fetchGroupPosts();
    if (selected === null || selected === undefined) {
      setPosts([]);
    }
    if (selected !== null && selected !== undefined) {
      setGroups([]);
    }
  }, [refreshing, selected]);
  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}>
          <LoadingModal colorScheme={colorScheme!} loading={refreshing} text={loading[language]} />
        </RefreshControl>
      }
      stickyHeaderHiddenOnScroll
      stickyHeaderIndices={[0]}
    >
      <View className="primary rounded-b-xl">
        <RootHeader language={language} colorScheme={colorScheme!} />
        <SocialSort
          onSelect={(s) => {
            setSelected(s);
          }}
          items={groups}
          language={language}
          colorScheme={colorScheme!}
        />
        <NewSocial text={GroupTexts.actions.create[language]} onPress={() => router.push('/(groups)/new')} />
      </View>
      {groups && groups.length > 0 && !selected && (
        <FlashList
          estimatedFirstItemOffset={250}
          data={groups}
          keyExtractor={(item) => item.id + ''}
          renderItem={({ item }) => (
            <SocialCard type="GROUP" group={item} colorScheme={colorScheme!} language={language} />
          )}
        />
      )}
      
      {posts && selected && (
        <FlashList
          estimatedFirstItemOffset={250}
          ListEmptyComponent={() => (
            <View className="flex justify-center items-center self-center pt-24">
              <MaterialCommunityIcons name="post-outline" color={Colors.highlight[colorScheme!]} size={128} />
              <ThemedText className="text-2xl">{GroupTexts.empty.posts[language]}</ThemedText>
              </View>
          )}
          data={posts}
          keyExtractor={(item) => item.postId + 'GROUP'}
          renderItem={({ item }) => (
            <PostCard
              favorite={item.favorite}
              user={user!}
              group={item.group}
              event={null}
              reaction={item.reactedWith}
              authorId={item.user.id}
              authorProfileImg={item.user.profileImg}
              authorNickname={item.user.nickname}
              authorUsername={item.user.username}
              colorScheme={colorScheme!}
              comments={item.comments}
              date={item.dateOfCreation.split('T')[0]}
              description={item.text}
              images={item.images}
              language={language}
              location={item.location}
              postId={item.postId}
              vehicle={item.vehicle}
              reactions={item.reactionTypeMap}
            />
          )}
        />
      )}
      
    </ScrollView>
  );
}

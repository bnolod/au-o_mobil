import { Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { FlashList } from '@shopify/flash-list';
import NewSocial from '../../base/NewSocial';
import { GroupTabProps } from './props';
import GroupTabEmpty from './GroupTabEmpty';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getGroupPosts, getGroupStatus } from '@/lib/ApiCalls/GroupApiCalls';
import { Post } from '@/lib/entity/Post';
import PostCard from '@/components/Post/Post';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import LoadingModal from '@/components/ui/LoadingModal';
import { GroupTexts } from '@/constants/texts';
export default function GroupPostTab({ group, language, colorScheme }: GroupTabProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [role, setRole] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const { user } = useAuthentication();
  async function init() {
    setLoading(true);
    const res = await getGroupPosts(group.id);
    if (res) {
      setPosts(res);
      const status = await getGroupStatus(group.id);
      if (status) {
        setRole(status.role);
        setLoading(false);
      } else setLoading(false);
    } else setLoading(false);
  }
  useEffect(() => {
    init();
  }, []);
  if (loading) return <LoadingModal colorScheme={colorScheme} loading={loading} text="Just a moment..." />;

  return (
    
      <FlashList
        estimatedItemSize={300}
        ListFooterComponent={<></>}
        ListFooterComponentStyle={{marginTop: 120}}
        data={posts}
        keyExtractor={(item) => item.postId + '_' + item.dateOfCreation}
        renderItem={({ item, index }) => (
            <Pressable onLongPress={() => role === 'ADMIN' && console.log('long press')}>

          <PostCard
            authorId={item.user.id}
            allowOptions={role !== 'ADMIN'}
            authorUsername={item.user.username}
            authorNickname={item.user.nickname}
            authorProfileImg={item.user.profileImg}
            colorScheme={colorScheme}
            comments={item.comments}
            date={new Date(item.dateOfCreation).toLocaleDateString()}
            description={item.text}
            images={item.images}
            language={language}
            event={null} //to be implemented
            group={group}
            location={item.location}
            postId={item.postId}
            reaction={item.reactedWith}
            reactions={item.reactionTypeMap}
            user={user!}
            vehicle={item.vehicle}
            />
            </Pressable>
        )}
        ListHeaderComponent={() => <>
        {role === 'ADMIN' && (
        <ThemedText className="mx-auto my-2 w-11/12 text-center">
          {GroupTexts.admin[language]}
        </ThemedText>
      )}
      <NewSocial
        onPress={() => router.replace({ pathname: '/(root)/(groups)/[id]/new', params: { id: group.id } })}
        text={GroupTexts.actions.postToGroup[language]}
      /></>}
        ListEmptyComponent={() => <GroupTabEmpty type="POSTS" language={language} />}
      />
    
  );
}

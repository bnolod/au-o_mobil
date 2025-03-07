import PostHeaderElement from '@/components/Post/base/PostHeaderElement';
import { getPostById } from '@/lib/ApiCalls/PostApiCalls';
import { Post } from '@/lib/entity/Post';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PostMessageProps } from './props';
import { Image } from 'expo-image';
import ThemedText from '@/components/ui/ThemedText';
import Avatar from '@/components/ui/Avatar';

export default function MessagePost({ postId, colorScheme }: PostMessageProps) {
  const [post, setPost] = useState<Post>();
  async function init() {
    const res = await getPostById(postId);
    if (res) {
      setPost(res);
      console.log(res);
    }
  }
  useEffect(() => {
    init();
  }, []);

  return (
    <View className="flex overflow-hidden w-4/6 self-end aspect-square rounded-xl">
      {post && (
        <>
          <View className='highlight'>
            <View className='secondary p-3 flex flex-row items-center gap-2'>
                <Avatar image={post.user.profileImg} nickname={post.user.nickname} />
              <ThemedText className='tlg'>{post.user.username}</ThemedText>
            </View>
          <Image style={{ backgroundColor: "red", width: 200, height: 200, flex: 1 }} source={{ uri: post.images[0] }}/>
            
          </View>
          {/* <PostHeaderElement 
            authorNickname={post.user.nickname}
            authorProfileImg={post.user.profileImg}
            authorUsername={post.user.username}
            colorScheme={colorScheme}
            event={null}
            onPress={() => router.push({pathname: "/(post)/page/[id]", params: {id: post.user.id}})}
            group={post.group}
            postType={post.postType}
            />  */}
        </>
      )}
    </View>
  );
}

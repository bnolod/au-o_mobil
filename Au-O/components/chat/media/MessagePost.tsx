import PostHeaderElement from '@/components/Post/base/PostHeaderElement';
import { getPostById } from '@/lib/ApiCalls/PostApiCalls';
import { Post } from '@/lib/entity/Post';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { PostMessageProps } from './props';
import { Image } from 'expo-image';
import ThemedText from '@/components/ui/ThemedText';
import Avatar from '@/components/ui/Avatar';
import { Images } from '@/lib/staticAssetExports';

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
    <View className="flex overflow-hidden w-2/3 self-end aspect-square rounded-xl">
      {post && (
        <>
          <View className='flex flex-col'>
            <View className='secondary p-3 flex flex-row items-center gap-2'>
                <Avatar image={post.user.profileImg} nickname={post.user.nickname} />
              <ThemedText className='tlg'>{post.user.username}</ThemedText>
            </View>
          </View>
          <Image style={{ flex: 1,width: "auto", height: "100%" }} contentFit='contain' source={{uri:post.images[0].url}}/>
          <View className='primary p-2 w-full'>
            <ThemedText>
              <Text onPress={() => router.push({pathname: "/(profile)/[id]", params: {id: post.user.id}})} className='font-bold text-highlight'>
                @{post.user.username} {" "}
              </Text>
              <ThemedText numberOfLines={2}>
                {post.text}
              </ThemedText>
            </ThemedText>
          </View>
        </>
      )}
    </View>
  );
}

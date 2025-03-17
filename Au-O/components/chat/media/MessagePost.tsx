/**
 * MessagePost.tsx
 * Üzenet poszt komponens
 * @module chat/media/MessagePost
 * @category Components
 */
import { getPostById } from '@/lib/ApiCalls/PostApiCalls';
import { Post } from '@/lib/entity/Post';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { PostMessageProps } from './props';
import { Image } from 'expo-image';
import ThemedText from '@/components/ui/ThemedText';
import Avatar from '@/components/ui/Avatar';
/**
 * Poszt megosztásánál használt komponens
 * @property {string} sender Küldő
 * @property {string} postId Poszt azonosító
 * @property {string} avatar Avatar
 * @returns 
 */
export default function MessagePost({sender, postId, avatar }: PostMessageProps) {
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
    <View className='relative'>

    <View className={`flex mt-1 ml-16 overflow-hidden bg-backdrop-primary  dark:bg-backdrop-primary-dark w-2/3 ${sender ? "self-end mr-2" : "self-start ml-16"} aspect-square rounded-xl`}>
      
      {post && (
        <TouchableOpacity className='h-full' onPress={() => router.push({pathname: "/(post)/page/[id]", params: {id: post.postId}})}>
          <View className='flex flex-col'>
            <View className={`${sender ? "secondary" : "highlight-themed"} p-1 flex flex-row items-center gap-2`}>
                <Avatar image={post.user.profileImg} height={12} width={12}  nickname={post.user.nickname} />
              <ThemedText className='tlg'>{post.user.username}</ThemedText>
            </View>
          </View>
          <Image style={{ flex: 1,width: "auto", height: "100%" }} contentFit='contain' source={{uri:post.images[0].url}}/>
          <View className={` ${!sender ? "highlight-themed" : "secondary"} p-2 w-full`}>
            <ThemedText>
              <Text onPress={() => router.push({pathname: "/(profile)/[id]", params: {id: post.user.id}})} className={`font-bold ${sender ? "text-highlight" : "text"}`}>
                @{post.user.username} {" "}
              </Text>
              <ThemedText numberOfLines={2}>
                {post.text}
              </ThemedText>
            </ThemedText>
          </View>
        </TouchableOpacity>
      )}
    </View>
        {avatar && !sender &&<Avatar className='w-12 h-12 secondary absolute bottom-2' image={avatar.profileImg} nickname={avatar.nickname} />}
    
      </View>
  );
}

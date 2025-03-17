/**
 * Poszt oldal
 * @module post/base/PostPage
 * @category Components
 */
import { CommonStaticElementProps } from "@/constants/types";
import { Post } from "@/lib/entity/Post";
import { View } from "react-native";
import { User } from "@/lib/entity/User";

import PostCard from "../Post";
/**
 * @param {CommonStaticElementProps & {id: string, isNew?: string, user: User, post: Post}} props Tulajdonságok
 */
export default function PostPage({id, isNew, colorScheme, language, user, post} : CommonStaticElementProps & {id: string, isNew?: string, user: User, post: Post}) {  

  

      return (
        <View className="flex justify-start pt-safe-offset-1 items-center h-full">
          <PostCard
            favorite={post.favorite}
            user={user!}
            group={post.group}
            event={null}
            reaction={post.reactedWith}
            authorId={post.user.id}
            authorProfileImg={post.user.profileImg}
            authorNickname={post.user.nickname}
            authorUsername={post.user.username}
            colorScheme={colorScheme!}
            comments={post.comments}
            date={post.dateOfCreation.split('T')[0]}
            description={post.text}
            images={post.images}
            language={language}
            location={post.location}
            postId={post.postId}
            vehicle={post.vehicle}
            reactions={post.reactionTypeMap}
          />
        </View>
      );
    }
  
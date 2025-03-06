import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { FlashList } from "@shopify/flash-list";
import NewSocial from "../../base/NewSocial";
import { GroupTabProps } from "./props";
import GroupTabEmpty from "./GroupTabEmpty";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getGroupPosts } from "@/lib/ApiCalls/GroupApiCalls";
import { Post } from "@/lib/entity/Post";
import PostCard from "@/components/Post/Post";
import { useAuthentication } from "@/contexts/AuthenticationContext";
export default function GroupPostTab({group, language, colorScheme}: GroupTabProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const {user} = useAuthentication();
    async function init() {
        const res = await getGroupPosts(group.id);
        if (res) {
            setPosts(res);
        }
    }
    useEffect(() => {
        init()
    }, [])
    return (
        <FlashList estimatedItemSize={58} data={posts} keyExtractor={(item) => item.postId + "_" + item.dateOfCreation} renderItem={({item, index}) => (
           <PostCard
            authorId={item.user.id}
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
        )}
        ListHeaderComponent={() => (
            <NewSocial onPress={() => router.replace({pathname: "/(root)/(groups)/[id]/new", params: {id: group.id}})} text="Post to group" />
        )}
        ListEmptyComponent={() => (
            <GroupTabEmpty type="POSTS" language={language} />
        )}
        />
    )
}
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

export default function GroupPostTab({group, language}: GroupTabProps) {
    const [posts, setPosts] = useState<Post[]>([]);
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
        <FlashList estimatedItemSize={58} data={posts} renderItem={() => (
            <View>
                <ThemedText>Post</ThemedText>
            </View>
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
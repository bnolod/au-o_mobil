import ThemedText from "@/components/ui/ThemedText";
import { PostResponse } from "@/constants/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function PostPage() {
    const [post, setPost] = useState<PostResponse>();
    useEffect(() => {
        //get post by id
    }, [])
    const {id} = useLocalSearchParams()
    return (
        <ThemedText>{id}</ThemedText>
    )
}
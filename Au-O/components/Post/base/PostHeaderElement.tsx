import Button from "../../ui/Button";
import Avatar from "../../ui/Avatar";
import {
    EventPostData,
    GroupPostData,
    PostDispayElementProps,
} from "@/constants/types";
import PostSocialIcon from "./PostSocialIcon";

export default function PostHeaderElement({
    onPress,
    authorNickname,
    authorProfileImg,
    colorScheme,
    postType,
    eventData,
    groupData,
}: PostDispayElementProps) {
    return (
        <Button
            variant="transparent"
            className="m-0 basis-2/12"
            onPress={onPress}
            hapticFeedback="light"
        >
            {postType === "USER" && (
                <Avatar image={authorProfileImg} nickname={authorNickname} />
            )}
            {postType === "GROUP" && !eventData && (
                <PostSocialIcon
                    colorScheme={colorScheme!}
                    icon="account-group-outline"
                />
            )}
            {postType === "GROUP" && eventData && (
                <PostSocialIcon
                    colorScheme={colorScheme!}
                    icon="flag-checkered"
                />
            )}
            {eventData && postType !== "GROUP" && (
                <PostSocialIcon
                    colorScheme={colorScheme!}
                    icon="flag-outline"
                />
            )}
            {postType === "INVALID" && (
                <PostSocialIcon
                    colorScheme={colorScheme!}
                    icon="message-question"
                />
            )}
        </Button>
    );
}

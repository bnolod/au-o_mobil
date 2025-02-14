import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import SocialBanner from "./SocialBanner";
import {
  CommonStaticElementProps,
  Group,
  SocialEvent,
} from "@/constants/types";
import { Colors } from "@/constants/Colors";
import { boros_manifesto } from "@/constants/texts";
import Button from "../ui/Button";
import { router } from "expo-router";
import LoadingModal from "../ui/LoadingModal";
import CollapsibleText from "../ui/CollapsibleText";

export default function SocialCard({
  language,
  colorScheme,
  group,
  event,
  type = "GROUP",
  preview,
  onCreatePress,
}: CommonStaticElementProps & {
  group?: Group;
  event?: SocialEvent;
  preview?: "CREATE" | "DISPLAY" | undefined;
  type: "GROUP" | "EVENT";
  onCreatePress?: () => void
}) {
  if (!group && !event) return null;
  const item = group && !event ? {
    id: group.id,
    name: group.name,
    bannerImage: group.bannerImage,
    alias: group.alias,
    count: group.memberCount,
    public: group.public,
    creationDate: group.creationDate,
    isUserRelated: group.member,
    description: group.description,
  } :  {
    id: event!.id,
    name: event!.name,
    bannerImage: event!.bannerImage,
    alias: "",
    count: event!.attendees,
    public: event!.public,
    creationDate: event!.creationDate,
    isUserRelated: event!.isAttending,
    description: event!.description
  };
  if (item === undefined) return <LoadingModal loading={true} colorScheme={colorScheme}/>;
  if (item)
  return (
    <View
      className="my-4"
      style={{
        shadowColor: Colors[colorScheme].background,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
      }}
    >
      <View className={`${preview !== "DISPLAY" ? " ": "pointer-events-none"}`}>

      <SocialBanner
        id={item.id}
        language={language}
        colorScheme={colorScheme}
        name={item.alias}
        image={item.bannerImage}
        count={item.count}
        type={type}
        onPress={onCreatePress}
        />
        </View>
      <View className="p-4 primary rounded-b-xl">
        <View className="flex flex-row justify-between">
          <View className="basis-4/6">
            <ThemedText className="text-lg font-bold leading-tight">
              {item.name}
              <ThemedText className="text-sm p-3 font-semibold opacity-40">
                {" "}{item.alias}
              </ThemedText>
            </ThemedText>
            <CollapsibleText
              className="opacity-85"
            >
              {item.description}
            </CollapsibleText>
          </View>
          <View className="flex  items-start gap-8">
            {
              !item.isUserRelated &&
              <Button onPress={!preview ? () => {} : () => {}} className="button highlight text-xl mr-0 justify-center">
              {type === "GROUP" ? "Join" : "Attend"}
            </Button>
            }
            <Button
              className="button secondary text-xl mr-0  justify-center"
              onPress={!preview ? () => {
                if (type === "EVENT")
                  router.push({
                    pathname: `/(root)/(events)/[id]`,
                    params: {
                      id: item.id
                    },
                  });
                else
                  router.push({
                    pathname: `/(root)/(groups)/[id]`,
                    params: {
                      id: item.id,
                    },
                  });
              } : () => {}}
            >
              {type === "GROUP" ? "Visit group" : "Details"}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

import { CommonStaticElementProps, Group } from "@/constants/types";
import { ScrollView, TouchableOpacity, View } from "react-native";
import SocialBanner from "../SocialBanner";
import Button from "@/components/ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ThemedText from "@/components/ui/ThemedText";
import CollapsibleText from "@/components/ui/CollapsibleText";
import { useState } from "react";

export default function GroupPage({
  group,
  colorScheme,
  language,
}: CommonStaticElementProps & { group: Group }) {
  const [selectedTab, setSelectedTab] = useState<"POSTS" | "EVENTS" | "MEMBERS" | "INFO">("POSTS");
  return (
    <View>
      <SocialBanner
        header
        id={group.id}
        name={group.name}
        image={group.bannerImage}
        colorScheme={colorScheme}
        language={language}
      />
      <View className="primary pb-4 rounded-b-xl">
        <View className="flex flex-row gap-2 justify-between items-center py-2 mx-auto w-11/12">
          <Button className=" button secondary ml-0 basis-2/12 aspect-square items-center justify-center">
            <MaterialCommunityIcons
              name="account-group-outline"
              size={40}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </Button>
          <ThemedText
            numberOfLines={2}
            className="text-2xl basis-7/12 font-bold"
          >
            {group.name}{" "}
            <ThemedText className="text-sm font-light opacity-60">
              {group.alias}
            </ThemedText>
          </ThemedText>
          <Button className="button py-0 background mr-0 basis-2/12  items-center justify-center">
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={32}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </Button>
        </View>
        <CollapsibleText
          className="w-11/12 mx-auto mt-2 text-lg leading-tight"
          restrictedLineCount={5}
        >
          {group.description}
        </CollapsibleText>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex flex-row gap-4 px-4 py-2">
          <TouchableOpacity onPress={() => setSelectedTab("POSTS")} className={`button ${selectedTab === "POSTS" ? "highlight-themed" : "secondary"} flex flex-row gap-2 items-center justify-center`}>
            <ThemedText>
              <MaterialCommunityIcons name="cards-outline" size={24} />
            </ThemedText>
            <ThemedText className="text-xl">Posztok</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab("EVENTS")} className={`button ${selectedTab === "EVENTS" ? "highlight-themed" : "secondary"} flex flex-row gap-2 items-center justify-center`}>
            <ThemedText>
              <MaterialCommunityIcons name="calendar-check-outline" size={24} />
            </ThemedText>
            <ThemedText className="text-xl">Események</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab("MEMBERS")} className={`button ${selectedTab === "MEMBERS" ? "highlight-themed" : "secondary"} flex flex-row gap-2 items-center justify-center`}>
            <ThemedText>
              <MaterialCommunityIcons name="account-group-outline" size={24} />
            </ThemedText>
            <ThemedText className="text-xl">Tagok</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab("INFO")} className={`button ${selectedTab === "INFO" ? "highlight-themed" : "secondary"} flex flex-row gap-2 items-center justify-center`}>
            <ThemedText>
              <MaterialCommunityIcons name="information-outline" size={24} />
            </ThemedText>
            <ThemedText className="text-xl">Információ</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

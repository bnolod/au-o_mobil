import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import SocialBanner from "./SocialBanner";
import { CommonStaticElementProps } from "@/constants/types";
import { Colors } from "@/constants/Colors";
import { boros_manifesto } from "@/constants/texts";
import Button from "../ui/Button";
import { useState } from "react";
import { handleShowMore } from "@/lib/events";

export default function SocialCard({
  language,
  colorScheme,
  image,
  name,
  type = "GROUP",
  count = null,
}: CommonStaticElementProps & {
  name: string;
  image?: string;
  count?: number | null;
  type: "GROUP" | "EVENT";
}) {
  const [lines, setLines] = useState<number | undefined>(3);
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
      <SocialBanner
        language={language}
        colorScheme={colorScheme}
        name={name}
        image={image}
        count={count}
        type={type}
      />
      <View className="p-4 primary rounded-b-xl">
        <View className="flex flex-row justify-between">
          <View className="basis-4/6">
            <ThemedText className="text-lg font-bold leading-tight">
              {name}
              <ThemedText className="text-sm font-semibold opacity-40">
                {" "}
                {name.length < 20 && name.split(" ").length < 4
                  ? name
                  : name.split(" ").map((t) => t[0].toUpperCase())
                }
              </ThemedText>
            </ThemedText>
            <ThemedText
              onPress={() => setLines(handleShowMore(lines))}
              className="opacity-85"
              numberOfLines={lines}
            >
              {boros_manifesto.EN}
            </ThemedText>
          </View>
          <View className="flex  items-start gap-8">
            <Button className="button highlight text-xl mr-0 justify-center">
              {
                type === "GROUP"
                ? "Join"
                : "Attend"
              }
            </Button>
            <Button className="button secondary text-xl mr-0  justify-center">
              {
                type === "GROUP"
                ? "Visit group"
                : "Details"
              }
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

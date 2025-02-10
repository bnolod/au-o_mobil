import { CommonStaticElementProps, User } from "@/constants/types";
import { Alert, AlertButton, Pressable, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";
import ThemedText from "./ThemedText";
import Button from "./Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { BottomSheetModalRef } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types";
import { removeFollow } from "@/lib/apiClient";
import Toast from "react-native-toast-message";

export default function UserListCard({
  user,
  colorScheme,
  language,
  isOwner,
  type,
  dismissSheet
}: { user: User, dismissSheet: () => void, isOwner: boolean, type: "follower" | "following" } & CommonStaticElementProps) {
  console.log(user.profileImg);
  const buttons: AlertButton[][] = [
     [ //VISITOR
        {
            isPreferred: true,
            onPress: () => {
              return;
            },
            text: "Cancel",
            style: "cancel",
          },
        {
            text: "Visit profile",
            onPress: () => {
                dismissSheet()
                router.push({pathname: "/(profile)/[id]", params: {id: user.id}})
            }
        }
      ],
     [ //OWNER
        {
            isPreferred: true,
            onPress: () => {
              return;
            },
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Visit profile",
            onPress: () => {
                dismissSheet()
                router.push({pathname: "/(profile)/[id]", params: {id: user.id}})
            }
        },
        type === "follower" ? {
            text: "Unfollow",
            onPress: () => {

            }
        } : {
            text: "Remove follow",
            onPress: async () => {
              const res = await removeFollow(user.id.toString())
              if (res) {
                Toast.show({
                  text1: "Successfully removed follower",
                  type: "success"
                })
                return <></>
              }
            }
        }

    ]
]
  return (
    <Pressable className="flex-row items-center w-full p-2 justify-center primary" onPress={() => {
        dismissSheet()
        router.push({
            pathname: "/(profile)/[id]",
            params: {
                id: user.id
            }
        })
    }}>
      <View className="flex-1 flex-row flex items-center ml-2">
        <Avatar
          image={user.profileImg && { uri: user.profileImg }}
          nickname={user.nickname}
        />
        <View>
          <ThemedText className="text-base font-bold">
            {user.nickname}
          </ThemedText>
          <ThemedText className="text-sm font-light">
            @{user.username}
          </ThemedText>
        </View>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity>
          <MaterialCommunityIcons
            onPress={() => {
              Alert.alert(user.username, "", buttons[+isOwner]);
            }}
            name="dots-horizontal"
            size={32}
            color={Colors[colorScheme].text}
          />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

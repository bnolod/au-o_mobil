import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ProfileTabSelectorProps } from "./props";
import { handleTabSelection } from "@/lib/events";

export default function ProfileTabSelector({colorScheme, selectedTab, setSelectedTab} : ProfileTabSelectorProps) {
    return (
        
        <View className="p-4 rounded-b-2xl">
        <View
          className="profile-selector-container"
          style={{
            shadowColor: Colors[colorScheme!].background,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 1,
            shadowRadius: 10,
          }}
        >
          <MaterialCommunityIcons
            name="cards-outline"
            size={42}
            className="text-center flex-1 border-r border-r-[#767676]"
            color={selectedTab === 'POST' ? Colors.highlight.main : Colors[colorScheme!].text}
            onPress={() => setSelectedTab(handleTabSelection('POST'))}
          />
          <MaterialCommunityIcons
            name="account-group-outline"
            size={42}
            className="text-center flex-1 border-x border-x-[#767676]"
            color={selectedTab === 'GROUPS' ? Colors.highlight.main : Colors[colorScheme!].text}
            onPress={() => setSelectedTab(handleTabSelection('GROUPS'))}
          />
          <MaterialCommunityIcons
            name="car-outline"
            size={42}
            className="text-center flex-1 border-x border-x-[#767676]"
            color={selectedTab === 'GARAGE' ? Colors.highlight.main : Colors[colorScheme!].text}
            onPress={() => setSelectedTab(handleTabSelection('GARAGE'))}
          />
          <MaterialCommunityIcons
            name="bookmark-outline"
            size={42}
            className="text-center flex-1 border-l border-l-[#767676]"
            color={selectedTab === 'SAVED' ? Colors.highlight.main : Colors[colorScheme!].text}
            onPress={() => setSelectedTab(handleTabSelection('SAVED'))}
          />
        </View>
      </View>
    );
}
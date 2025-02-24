import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface SettingsAsideProps {
    userId: string;
    username: string;
    availableSettings: SettingsOption[];
  }
  export interface SettingsOption {
    title: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    onPress: () => void;
    className?: string;
  }
import UserLoading from "@/components/auth/UserLoading";
import SettingsAside from "@/components/settings/SettingsAside";
import Button from "@/components/ui/Button";
import Footer from "@/components/ui/Footer";
import ThemedText from "@/components/ui/ThemedText";
import { SettingsOption } from "@/constants/types";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { logout } from "@/lib/apiClient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { useColorScheme } from "nativewind";
import { ScrollView, View } from "react-native";

export default function Settings() {
  const { colorScheme } = useColorScheme();
  const { language } = useLanguage();
  const settings: SettingsOption[] = [
    {
      icon: "account-circle-outline",
      onPress: () => {},
      title: "Personal Information",
    },
    {
      icon: "bookmark-outline",
      onPress: () => {},
      title: "Saved Posts",
    },
    {
      icon: "progress-question",
      onPress: () => {},
      title: "About",
    },
    {
      icon: "logout",
      onPress: () => {
        logout();
      },
      title: "Logout",
      className: "font-bold text-red-500",
    },
    {
      icon: "delete-outline",
      onPress: () => {},
      title: "Delete Account",
    },
  ];
  const { user } = useAuthentication();
  if (user === null) {
    return <Redirect href="/login" />;
  }
  if (user === undefined) {
    return <UserLoading />;
  } else
    return (
      <>
        <ScrollView  showsVerticalScrollIndicator={false} overScrollMode="never"  bounces={false} className="h-full w-full flex-1 primary">
          <ThemedText className="w-full text-xl text-center p-3">
            {user.username}
          </ThemedText>

          <SettingsAside
            userId={user.id.toString()}
            username={user.username}
            colorScheme={colorScheme!}
            language={language}
            availableSettings={settings}
          />
        </ScrollView>
        <Footer language={language} />
      </>
    );
}

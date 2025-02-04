import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/ThemedText";
import { View } from "react-native";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { apiFetch } from "@/lib/apiClient";
import { User } from "@/constants/types";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import UserLoading from "@/components/auth/UserLoading";


export default function Profile() {
  const [user, setUser] = useState<User>();
  const { logout } = useAuthentication();
  const { id } = useLocalSearchParams();
  async function getUser() {
    const res = await apiFetch<any>(`users/user/${id}`, "GET", true);
    if (res) {
      setUser(res);
    } else return;
  }
  useEffect(() => {
    getUser();
  }, []);
  const isOwner = user && user.id.toString() === (id as string);
  console.log(isOwner);
  if (isOwner === undefined) return <UserLoading />;
  if (isOwner === false) return <ThemedText>Not your profile</ThemedText>;
  else
  return (
    <View className="pt-24">
      <ThemedText>Profile</ThemedText>
      <Button onPress={() => logout!()}>Logout</Button>
    </View>
  );
}

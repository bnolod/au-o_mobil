import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/ThemedText";
import { View } from "react-native";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { apiFetch } from "@/lib/apiClient";
import { User } from "@/constants/types";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function Profile() {
    const [user, setUser] = useState<any>();
    const {logout} = useAuthentication();
    const {id} = useLocalSearchParams()
    async function getUser() {
        const res = await apiFetch<any>(`users/user/${id}`, "GET", true);
        if (res) {
            setUser(res)
        }
        else return
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <View className="pt-24">
            <ThemedText>
                Profile
            </ThemedText>
            <Button onPress={() => logout!()}>
                Logout
            </Button>
        </View>
    )    
}
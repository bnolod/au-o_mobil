import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/ThemedText";
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import PostCard from "@/components/home/UserPost";
import { colorScheme } from "nativewind";
import { useLanguage } from "@/contexts/LanguageContext";
import RootHeader from "@/components/home/RootHeader";
import { Colors } from "@/constants/Colors";
import { boros_manifesto } from "@/constants/texts";

export default function Home() {

  const { logout, user } = useAuthentication();
  const { language } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [])
  return (
    <>
            
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing}  onRefresh={handleRefresh} tintColor={Colors.highlight.main} colors={[Colors.highlight.main]} progressBackgroundColor="#FFFFFF" />} stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll >
      <RootHeader language={language} colorScheme={colorScheme.get()!} />
        <Button
          variant="highlight"
          type="fill"
          onPress={() => {
            logout!();
          }}
          >
          <ThemedText>Logout</ThemedText>
        </Button>
        <ThemedText>
          Helló, {user?.username} vagyok, tehát {user?.nickname}.{" "}
        </ThemedText>
        
        <PostCard
          author_nickname={"teszt"}
          author_username={"teszti"}
          colorScheme={colorScheme.get()!}
          language={language}
          comments={[
            {
              id: 1,
              replies: [{
                id: 2,
                text: "Köszi!",
                replies: []
              }],
              text: "Szia! Gratulálok hozzá! :)",
            },
            {
              id: 3,
              replies: [{
                id: 4,
                text: "Köszi!",
                replies: []
              }],
              text: "Szia! Nagyon jó lett! :)",
            },
            {
              id: 5,
              replies: [{
                id: 6,
                text: "Köszi!",
                replies: []
              }],
              text: "Nem bírom tovább! :)",
            },
          ]}
          date={"2021-01-01"}
          description={boros_manifesto.EN}
          image={{}}
          location={{ lat: 30, lng: 30 }}
          reactions={{ fire: 4, heart: 0, sunglasses: 4 }}
        />
        <PostCard
          author_nickname={"teszt"}
          author_username={"teszti"}
          colorScheme={colorScheme.get()!}
          language={language}
          comments={[]}
          date={"2021-01-01"}
          description={"teszt"}
          image={{}}
          location={{ lat: 30, lng: 30 }}
          reactions={{ fire: 4, heart: 0, sunglasses: 4 }}
          />
      </ScrollView>
    </TouchableWithoutFeedback>
          </>
  );
}

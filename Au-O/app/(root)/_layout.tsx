import React from "react";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/contexts/LanguageContext";
import { StatusBar } from "expo-status-bar";
import Avatar from "@/components/ui/Avatar";

export default function RootLayout() {
  const { user } = useAuthentication();
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();

  if (!user) {
    return null;
  }
  return (
    <>
    <StatusBar style="auto" />
    <Tabs
       
       
       screenOptions={{
         tabBarShowLabel: false,
         
         tabBarStyle: {
           backgroundColor:
           colorScheme === "light" ? "white" : Colors.dark.secondary,
          },
          
          tabBarActiveTintColor:
          colorScheme === "light"
          ? Colors.highlight.light
          : Colors.highlight.main,
          tabBarInactiveTintColor: colorScheme === "light" ? "gray" : "gray",
          tabBarHideOnKeyboard: true,
          tabBarIconStyle: {
            height: "100%",
            width: "100%",
          },
        }}
          >
        <Tabs.Screen
          name="home"
          initialParams={{colorScheme, language}}
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={42}
              color={color}
              />
            )
          }}
          />
        <Tabs.Screen
          name="new"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
              name={focused ? "plus-circle" : "plus-circle-outline"}
              size={42}
              color={color}
              />
            )
            }}
            />
        <Tabs.Screen
          name="profile/[id]"
          initialParams={{id: user.id}}
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <Avatar className={`${focused ? "highlight" : "primary"}`} image={null} nickname={user.nickname} />
            )
            }}
            />
      </Tabs> 
            </>
  )
}

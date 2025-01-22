import React from "react";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { Redirect, Stack, Tabs } from "expo-router";
import SearchBar from "@/components/ui/SearchBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import RootHeader from "@/components/home/RootHeader";
export default function RootLayout() {
  const { user } = useAuthentication();
  const { colorScheme } = useColorScheme();
  if (!user) {
    return <Redirect href={"/(auth)/login"} />;
  }
  return (
    <>
                <RootHeader/>
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
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                size={42}
                color={color}
              />
            ),
          }}
        />
    
      </Tabs>
    </>
  );
}

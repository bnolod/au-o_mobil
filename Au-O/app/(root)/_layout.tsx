import React from 'react';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { router, Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatusBar } from 'expo-status-bar';
import Avatar from '@/components/ui/Avatar';
import { Platform, Touchable, TouchableOpacity, View } from 'react-native';

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
      key={colorScheme + "_" + language}
      
        screenOptions={{
          tabBarShowLabel: false,
          
          tabBarStyle: {
            backgroundColor: Colors[colorScheme!].secondary,
            height: Platform.OS === 'ios' ? 100 : 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            //           borderTopEndRadius: 30,
            //           borderTopStartRadius: 30,
          },

          tabBarActiveTintColor: colorScheme === 'light' ? Colors.highlight.light : Colors.highlight.main,
          tabBarInactiveTintColor: colorScheme === 'light' ? 'gray' : 'gray',
          tabBarHideOnKeyboard: true,
          tabBarIconStyle: {
            height: '100%',
            width: '100%',
            aspectRatio: 1,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          initialParams={{ colorScheme, language }}
          options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={42} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(groups)"
          initialParams={{ colorScheme, language }}
          options={{
            headerShown: false,
            title: 'Groups',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'account-group' : 'account-group-outline'}
                size={42}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            headerShown: false,
            title: 'Home',
            tabBarIconStyle: {
              height: '100%',
              width: '100%',
              aspectRatio: 1,
            },
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  borderRadius: 15,
                  padding: 4,
                  boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.5)',
                  shadowColor: Colors[colorScheme!].background,
                }}
              >
                <MaterialCommunityIcons name={focused ? 'plus-circle-outline' : 'plus'} size={42} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="(events)"
          initialParams={{ colorScheme, language }}
          options={{
            headerShown: false,
            title: 'Groups',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={focused ? 'bookmark' : 'bookmark-outline'} size={42} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          initialParams={{ colorScheme, language }}
          
          options={{
            lazy: true,
            
            tabBarItemStyle: {
              display: "none"
            }  ,
            headerShown: false,
            title: 'Chat',
            tabBarIcon: ({ color, focused }) => (
             <></>
            ),
          }}
        />
        <Tabs.Screen
          name="profile/selfProfile"
          listeners={{
            tabLongPress: (e) => {
              router.push('/(profile)/settings');
            },
          }}
          options={{
            headerShown: false,
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <View
                className="mb-2"
                style={
                  focused
                    ? {
                        shadowColor: Colors.highlight.main,
                        shadowOpacity: 1,
                        shadowRadius: 7.84,
                      }
                    : {}
                }
              >
                <Avatar
                  className={`${focused ? 'highlight' : 'primary'}`}
                  image={user.profileImg}
                  nickname={user.nickname}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen name="(search)" options={{
            lazy: true,
            
            tabBarItemStyle: {
              display: "none"
            }  ,
            headerShown: false,
            title: 'Search',
            tabBarIcon: ({ color, focused }) => (
             <></>
            ),
          }} />
      </Tabs>
    </>
  );
}

import LoadingModal from '@/components/ui/LoadingModal';
import ThemedText from '@/components/ui/ThemedText';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { ScrollView, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useLanguage } from '@/contexts/LanguageContext';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FilterBar from '@/components/ui/FilterBar';
import { FlashList } from '@shopify/flash-list';
import DirectMessageItem from '@/components/chat/direct/DirectMessageItem';
import ChatHeader from '@/components/chat/base/ChatHeader';
import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/apiClient';
import { User } from '@/lib/entity/User';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { ChatMessage } from '@/lib/entitywebsock/ChatMessage';
import LatestMessage from '@/lib/entitywebsock/LatestMessage';
import { useFocusEffect } from 'expo-router';
export default function DirectMessagesScreen() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const { user } = useAuthentication();
  const [fetched, setFetched] = useState(false);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [latestMessages, setLatestMessages] = useState<LatestMessage[]>([])
  const {stompClient} = useWebSocket();


  
  const handleFetch = async () => {
    console.log('Fetching active users...');
    setFetched(true)
    const response = await apiFetch('/public/activeusers/messagelist', 'GET', true);
    if (response) {
      const data = response.data as LatestMessage[];
      console.log('Fetched users:', data);
      setLatestMessages(data);
    }
  };

  const filterOutCurrentUser = (users: User[], currentUserId: any) => {
    return users.filter((usr) => usr.id !== user!.id); // Filter out the current user by ID
  };

       useFocusEffect(
         useCallback(() => {
           if (!fetched && stompClient?.connected) {
             handleFetch();  
           }
        return () => {
        };
      }, [])
    );

   useEffect(() => {
    // Ensure stompClient is connected before attempting to subscribe
    const connectAndSubscribe = () => {
      if (stompClient?.connected) {
        console.log('WebSocket is connected, subscribing to /topic/activeUsers...');
        const subscription = stompClient.subscribe('/topic/activeUsers', (message) => {
          const users: User[] = JSON.parse(message.body);
          console.log('Received update:', users);
          setActiveUsers(users);
        });

        // Cleanup on unmount
        return () => {
          console.log('Unsubscribing from activeUsers topic...');
          subscription.unsubscribe();
        };
      } else {
        console.log('WebSocket is not connected yet. Retrying...');
      }
    };

    // Retry connection until successful
    const intervalId = setInterval(() => {
      if (stompClient?.connected) {
        connectAndSubscribe();
        clearInterval(intervalId); // Stop retrying once the connection is established
      }
    }, 1000); // Check every second

    // Cleanup the interval when component unmounts or stompClient changes
    return () => {
      clearInterval(intervalId);
    };
  }, [stompClient]);
 


  if (!user) return <LoadingModal loading colorScheme={colorScheme!} />;
  else
    return (
      <>
        <ChatHeader language={language} mainPage user={user} onFilterChange={() => {}}/>
        <FlashList bounces={false} data={latestMessages} renderItem={(item) => (<DirectMessageItem language={language} user={user} latestMessage={item.item}  date={new Date().toDateString()}/>)} />
      </>
    );
}

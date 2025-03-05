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
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/apiClient';
import { User } from '@/lib/entity/User';
import { useWebSocket } from '@/contexts/WebSocketContext';
export default function DirectMessagesScreen() {
  const { language } = useLanguage();
  const { colorScheme } = useColorScheme();
  const { user } = useAuthentication();
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const {stompClient} = useWebSocket();


  
  const handleFetch = async () => {
    console.log('Fetching active users...');
    const response = await apiFetch('/public/activeusers/all', 'GET', true);
    if (response) {
      const data = response.data as User[];
      console.log('Fetched users:', data);
      setActiveUsers(data);
    }
  };

  const filterOutCurrentUser = (users: User[], currentUserId: any) => {
    return users.filter((usr) => usr.id !== user!.id); // Filter out the current user by ID
  };

  useEffect(() => {
    // Fetch data on mount
    handleFetch();

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
        <ChatHeader mainPage user={user} onFilterChange={() => {}}/>
        <FlashList data={activeUsers} renderItem={(item) => (<DirectMessageItem user={item.item} contact={item.item} date={new Date().toDateString()} lastMessage='kifejezetten hosszú sor amit törni kéne itt'/>)} />
      </>
    );
}

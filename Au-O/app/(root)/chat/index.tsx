import LoadingModal from '@/components/ui/LoadingModal';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { useColorScheme } from 'nativewind';
import { useLanguage } from '@/contexts/LanguageContext';
import { FlashList } from '@shopify/flash-list';
import DirectMessageItem from '@/components/chat/direct/DirectMessageItem';
import ChatHeader from '@/components/chat/base/ChatHeader';
import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/apiClient';
import { User } from '@/lib/entity/User';
import { useWebSocket } from '@/contexts/WebSocketContext';
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
    //console.log('Fetching active users...');
    setFetched(true)
    const response = await apiFetch('/public/activeusers/messagelist', 'GET', true);
    if (response) {
      const data = response.data as LatestMessage[];
      console.log('Fetched users:', data);
      setLatestMessages(data);
    }
  };

  const filterOutCurrentUser = (users: User[], currentUserId: any) => {
    return users.filter((usr) => usr.id !== user!.id); // 
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
    const connectAndSubscribe = () => {
      if (stompClient?.connected) {
        //console.log('WebSocket is connected, subscribing to /topic/activeUsers...');
        const subscription = stompClient.subscribe('/topic/activeUsers', (message) => {
          const users: User[] = JSON.parse(message.body);
          //console.log('Received update:', users);
          setActiveUsers(users);
        });

        return () => {
          //console.log('Unsubscribing from activeUsers topic...');
          subscription.unsubscribe();
        };
      } else {
        //console.log('WebSocket is not connected yet. Retrying...');
      }
    };

    const intervalId = setInterval(() => {
      if (stompClient?.connected) {
        connectAndSubscribe();
        clearInterval(intervalId);
      }
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, [stompClient]);
 


  if (!user) return <LoadingModal loading colorScheme={colorScheme!} />;
  else
    return (
      <>
        <ChatHeader language={language} mainPage user={user} onFilterChange={() => {}}/>
        <FlashList keyExtractor={(item) => item.id.toString()} estimatedItemSize={83} bounces={false} data={latestMessages} renderItem={(item) => (<DirectMessageItem language={language} user={user} latestMessage={item.item}  date={new Date().toDateString()}/>)} />
      </>
    );
}

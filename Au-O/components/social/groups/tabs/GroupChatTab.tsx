/**
 * Csoport chat fül
 * @module social/groups/tabs/GroupChatTab
 * @category Component
 */
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import GroupMessage from '@/components/chat/group/GroupMessage';
import MessageBar from '@/components/chat/base/MessageBar';
import { GroupTabProps, ProtectedGroupTabProps } from './props';
import { GroupMessageType } from '@/lib/entity/GroupMessage';
import { apiFetch } from '@/lib/apiClient';
import { getGroupMessages } from '@/lib/ApiCalls/GroupApiCalls';

/**
 * @param {GroupTabProps} props Tulajdonságok
 */
export default function GroupChatTab({ group, language }: ProtectedGroupTabProps) {
  const { sendMessage, stompClient } = useWebSocket();
  const [message, setMessage] = useState<string>('');
  const {user} = useAuthentication()
  const [chatMessages, setChatMessages] = useState<GroupMessageType[]>([]);

  // Subscribe to the group topic when the component mounts
  const onSend = async () => {
    if (!stompClient || !message || message.length < 1) return;
    sendMessage(`group/${group.id}`, {
      message: message,
      groupId: group.id
    });
  };
  const handleFetch = async() => {
    const res = await getGroupMessages(group.id);
    console.log(res)
    if (res) {
      setChatMessages(res? res.reverse() : []);
    }
  }

  useEffect(()=>{
    if (group) {
      handleFetch();
    }
  },[group])

  // Update chat messages when messages change for this group
  useEffect(() => {
    if (group) {
      handleFetch()
    }
  }, [ group.id]);

  useEffect(() => {
    let sub: { unsubscribe: () => void } | null = null;

    if (user && stompClient && stompClient.connected && group && sub == null) {
      sub = stompClient?.subscribe(`/topic/group/${group?.id}`, (incomingMessage) => {
        const parsedMessage = JSON.parse(incomingMessage.body) as GroupMessageType;
        setChatMessages((prev) => [...prev, parsedMessage]);
      });
    }
    return () => {
      sub?.unsubscribe();
    };
  }, [group, stompClient, user]);
  
  return (
    <>
      <MessageBar language={language} text={message} onSend={() => onSend()} onChange={(text) => setMessage(text)} />
    <View className="w-full flex-1 flex flex-col">
      

      { user && stompClient &&
      <FlashList
      data={chatMessages}
      estimatedItemSize={58}
      renderItem={({item}) => (
        <GroupMessage
        date={new Date().toLocaleTimeString()}
        user={user}
        sender={user}
        message={item}
        />
      )}
      />
    }
    </View>
      </>
  );
}

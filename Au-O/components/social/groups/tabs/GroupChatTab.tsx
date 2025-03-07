import { View, TextInput } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { Group } from '@/lib/entity/Group';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import GroupMessage from '@/components/chat/group/GroupMessage';
import MessageBar from '@/components/chat/base/MessageBar';
import { GroupTabProps } from './props';


export default function GroupChatTab({ group, language }: GroupTabProps) {
  const { messages, sendMessage, subscribeToTopic } = useWebSocket();
  const [message, setMessage] = useState<string>('');
  const {user} = useAuthentication()
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  // Subscribe to the group topic when the component mounts
  const onSend = (message: string) => {
    sendMessage(`group/${group.id}`, message);
  };
  // Update chat messages when messages change for this group
  useEffect(() => {
    console.log('Messages:', messages);
    const groupMessages = messages[`group/${group.id}`] || [];
    setChatMessages(groupMessages.toReversed());
  }, [messages, group.id]);
  
  return (
    <>
      <MessageBar language={language} text={message} onSend={() => onSend(message)} onChange={(text) => setMessage(text)} />
    <View className="w-full flex-1 flex flex-col">
      

      { user &&
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

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

interface GroupChatTabProps {
  group: Group;
}

export default function GroupChatTab({ group }: GroupChatTabProps) {
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
    setChatMessages(groupMessages);
  }, [messages, group.id]);

  return (
    <View className="">
      <Input
        label={'Üzenet'}
        icon="pencil-outline"
        TextInputProps={{
          multiline: true,
          numberOfLines: 4,
          value: message,
          onChangeText: (text) => setMessage(text),
        }}
        colorScheme={'light'}
      />
      <Button className="bg-red-500 p-6" onPress={() => onSend(message)}>
        Submit
      </Button>
      {user && chatMessages.map((item, index) => (
        <GroupMessage key={index} date={new Date().toLocaleTimeString()} user={user} sender={user}  message={item}/>
))}
    </View>
  );
}

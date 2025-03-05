import { FlashList } from '@shopify/flash-list';
import ChatHeader from '../base/ChatHeader';
import { DirectMessagePageProps } from '../props';
import DirectMessageItem from './DirectMessageItem';
import RecipientMessage from './RecipientMessage';
import UserMessage from './UserMessage';
import MessageBar from '../base/MessageBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { apiFetch } from '@/lib/apiClient';
import { ChatMessage } from '@/lib/entitywebsock/ChatMessage';
import ThemedText from '@/components/ui/ThemedText';

export default function DirectMessagePage({ user, recipient }: DirectMessagePageProps) {
  // currently logged in user
  const { stompClient } = useWebSocket();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');

  const fetchMessages = async () => {
    if (!user || !recipient) return;
    const response = await apiFetch(`messages/user/${recipient.username}`, 'GET', true);
    if (response) {
      console.log("response: ", response)
      const data = response.data as ChatMessage[];
      setMessages(data);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user, recipient]);

  // Subscribe to the currently logged in user's queue to receive incoming messages.
  // With Spring's convertAndSendToUser, the client must subscribe using the `/user` prefix.
  useEffect(() => {
    let sub: { unsubscribe: () => void } | null = null;
    if (user && stompClient && stompClient.connected) {
      sub = stompClient.subscribe(`/user/queue/chat/${recipient.username}`, (msg: { body: string }) => {
        const incomingMessage = JSON.parse(msg.body) as ChatMessage;
        // Filter messages to include only those exchanged with recipient
        if (incomingMessage.user.username === recipient.username || incomingMessage.user.username === user.username) {
          setMessages((prev) => [...prev, incomingMessage]);
          console.log("message received: ", incomingMessage)
          console.log("messages: ", messages)
        }
      });
    }
    return () => {
      if (sub) {
        sub.unsubscribe();
      }
    };
  }, [user, recipient, stompClient]);

  // Send a message to the friend.
  const sendMessage = () => {
    console.log("message sending")
    console.log(message)
    if (stompClient && message.trim() !== '' && user) {
      const targetedMessage = { username: recipient.username, message };
      stompClient.publish({
        destination: '/app/chat/user/',
        body: JSON.stringify(targetedMessage),
      });
    }
  };

  const onchangehandler = (str : string) => {
    setMessage(str)
  }

  // Scroll to the bottom when messages change

  return (
    <>
      <KeyboardAvoidingView behavior="padding" className=" h-full flex-1 justify-between background">
        <ChatHeader mainPage={false} user={recipient} onFilterChange={() => {}} />
        <MessageBar onChange={onchangehandler} onSend={sendMessage} user={user} />
        {messages && user ? 
        messages.map((msg, index) => {
          return <ThemedText key={index}>{msg.user.username}:{msg.message}</ThemedText>
        }) : ""}
      </KeyboardAvoidingView>
    </>
  );
}

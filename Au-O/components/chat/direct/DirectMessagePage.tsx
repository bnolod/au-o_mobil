import { FlashList } from '@shopify/flash-list';
import ChatHeader from '../base/ChatHeader';
import { DirectMessagePageProps } from '../props';
import DirectMessageItem from './DirectMessageItem';
import RecipientMessage from './RecipientMessage';
import UserMessage from './UserMessage';
import MessageBar from '../base/MessageBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { apiFetch } from '@/lib/apiClient';
import { ChatMessage } from '@/lib/entitywebsock/ChatMessage';
import ThemedText from '@/components/ui/ThemedText';

export default function DirectMessagePage({language, user, recipient }: DirectMessagePageProps) {
  // currently logged in user
  const { stompClient } = useWebSocket();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const fetchMessages = async () => {
    if (!user || !recipient) return;
    const response = await apiFetch(`messages/user/${recipient.username}`, 'GET', true);
    if (response) {
      console.log('response: ', response);
      const data = response.data as ChatMessage[];
      setMessages(data);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user, recipient]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Subscribe to the currently logged in user's queue to receive incoming messages.
  // With Spring's convertAndSendToUser, the client must subscribe using the `/user` prefix.
  useEffect(() => {
    let sub: { unsubscribe: () => void } | null = null;
    if (user && stompClient && stompClient.connected) {
      sub = stompClient.subscribe(`/user/queue/chat/${recipient.username}`, (msg: { body: string }) => {
        const incomingMessage = JSON.parse(msg.body) as ChatMessage;
        // Filter messages to include only those exchanged with recipient
          setMessages((prev) => [incomingMessage, ...prev]);
          console.log('message received: ', incomingMessage);
          console.log('messages: ', messages);
        
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
    console.log('message sending');
    console.log(message);
    if (stompClient && message.trim() !== '' && user) {
      const targetedMessage = { username: recipient.username, message };
      stompClient.publish({
        destination: '/app/chat/user/',
        body: JSON.stringify(targetedMessage),
      });
      setMessage('');
    }
  };

  const onchangehandler = (str: string) => {
    setMessage(str);
  };

  const reversedList = messages.slice().reverse();

  // Scroll to the bottom when messages change

  return (
    <>
      <KeyboardAvoidingView behavior="padding" className=" h-full flex-1 justify-between background">
        <ChatHeader language={language} mainPage={false} user={recipient} onFilterChange={() => {}} />
        {/*messages && user ? 
        messages.map((msg, index) => {
          return <ThemedText key={index}>{msg.user.username}:{msg.message}</ThemedText>
        }) : ""*/}
        <ScrollView ref={scrollViewRef}>
          {user &&
            reversedList.map((item, index) =>
              item.user.username === user.username ? (
                <UserMessage
                  id={user.id}
                  profilePic={user.profileImg}
                  message={item.message}
                  nickname={user.nickname}
                  isLast={!messages[index + 1] || messages[index + 1].user.username === user.username}
                  isFirst={!messages[index - 1] || messages[index - 1].user.username === user.username}
                />
              ) : (
                <RecipientMessage
                  id={recipient.id}
                  profilePic={recipient.profileImg}
                  message={item.message}
                  nickname={recipient.nickname}
                  isLast={
                    !messages[index + 1] ||
                    (messages[index - 1] && messages[index - 1].user.username !== recipient.username)
                  }
                  isFirst={!messages[index - 1] || messages[index - 1].user.username !== recipient.username}
                />
              )
            )}
        </ScrollView>

        <MessageBar language={language} onChange={onchangehandler} onSend={sendMessage} text={message} />
      </KeyboardAvoidingView>
    </>
  );
}

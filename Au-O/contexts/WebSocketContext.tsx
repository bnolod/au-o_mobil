/**
 * WebSocket context
 * @module contexts/WebSocketContext
 * @category Contexts
 */

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuthentication } from './AuthenticationContext';
/**
 * WebSocket context tulajdonságai
 * @type
 */
export type WebSocketContextType = {
  /**
   * WebSocket üzenetek
   * @param {string} topic A lekérdezésre kerülő topic
   */
  messages: { [topic: string]: string[] };
  /**
   * Üzenetküldés funkció
   * @callback
   * @param topic
   * @param message Elküldendő üzenet
   * @returns {void}
   */
  sendMessage: (topic: string, message: any) => void;
  /**
   * Felhasználó feliratkoztatása egy topicra
   * @param topic Topic ID
   * @returns {void}
   */
  subscribeToTopic: (topic: string) => void;
  /**
   * WebSocket kliens
   * @type {Client | null}
   */
  stompClient: Client | null;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<{ [topic: string]: string[] }>({});
  const [connected, setConnected] = useState(false);
  const { user } = useAuthentication();
  const subscriptions = useRef(new Map<string, any>());

  useEffect(() => {
    if (!user && connected) {
      stompClient?.forceDisconnect();
    }
    if (!user) return;

    const connectWebSocket = async () => {
      console.log('Mounting WebSocket');
      let reconnectTimeout: NodeJS.Timeout;
      const socket = new SockJS(process.env.EXPO_PUBLIC_WS_URL!, null, { withCredentials: true } as any); // SockJS
      // console.log("socket: ",socket)
      const client = new Client({
        webSocketFactory: () => socket,
        // debug: (msg) => console.log('STOMP Debug: ' + msg),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          //  console.log('Connected to WebSocket');
          setConnected(true);
        },
        onStompError: (error) => {
          /*console.error('STOMP Error:', error)*/
        },
        onDisconnect: () => {
          // console.log('Disconnected from WebSocket');
          setConnected(false);
          attemptReconnect();
        },
        onWebSocketClose: () => {
          //  console.log('WebSocket closed');
          setConnected(false);
          attemptReconnect();
        },
      });

      const attemptReconnect = () => {
        //console.log('Attempting to reconnect in 5 seconds...');
        reconnectTimeout = setTimeout(() => {
          connectWebSocket();
        }, 5000);
      };

      client.activate();
      setStompClient(client);

      return () => client.deactivate();
    };

    connectWebSocket();

    return () => {
      if (stompClient) {
        //console.log('Cleaning up WebSocket connection');
        stompClient.deactivate();
      }
    };
  }, [user]);

  const subscribeToTopic = (topic: string): void => {
    if (!stompClient || !stompClient.connected) {
      console.error('WebSocket is not connected!');
      return;
    }

    // If already subscribed, do nothing
    if (subscriptions.current.has(topic)) {
      //console.log(`Already subscribed to ${topic}`);
      return;
    }
    // console.log("before: ",subscriptions)
    // console.log(`Subscribing to topic: ${topic}`);
    // console.log("after: ",subscriptions)

    // Subscribe and store the subscription object
    const subscription = stompClient.subscribe(`/topic/${topic}`, (message) => {
      const data = JSON.parse(message.body);
      //console.log(`Received message on topic ${topic}:`, data.message);

      setMessages((prevMessages) => ({
        ...prevMessages,
        [topic]: [...(prevMessages[topic] || []), data.message],
      }));
    });

    // Store the subscription to prevent duplicate subscriptions
    subscriptions.current.set(topic, subscription);
  };

  const sendMessage = (topic: string, message: any) => {
    if (stompClient && stompClient.connected) {
      console.log(`Sending message to ${topic}:`, message);
      stompClient.publish({
        destination: `/app/${topic}`,
        body: JSON.stringify({ 
          message: message.message,
          groupId: message.groupId,
         }),
      });
    } else {
      console.error('WebSocket is not connected!');
    }
  };

  return (
    <WebSocketContext.Provider value={{ stompClient, messages, sendMessage, subscribeToTopic }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

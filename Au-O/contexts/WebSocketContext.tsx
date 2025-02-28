// WebSocketProvider (Updated)
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Client } from "@stomp/stompjs";
import SockJS from 'sockjs-client';

interface WebSocketContextType {
    messages: { [topic: string]: string[] };
    sendMessage: (topic: string, message: string) => void;
    subscribeToTopic: (topic: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<{ [topic: string]: string[] }>({});
    const [connected, setConnected] = useState(false);

    

    useEffect(() => {
        const connectWebSocket = async () => {
            console.log("Mounting WebSocket");

            const token = await SecureStore.getItemAsync('jwtToken');
            if (!token) {
                console.error("JWT token not found!");
                return;
            }
            console.log("JWT Token:", token);

            const socket = new SockJS('http://192.168.0.24:8080/ws?token=' + token); // SockJS 
            const client = new Client({
                webSocketFactory: () => socket,
                connectHeaders: {
                    auth: `Bearer ${token}`,
                },
                debug: (msg) => console.log("STOMP Debug: " + msg),
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: () => {
                    console.log("Connected to WebSocket");
                    setConnected(true);
                },
                onStompError: (error) => console.error("STOMP Error:", error),
                onDisconnect: () => {
                    console.log("Disconnected from WebSocket");
                    setConnected(false);
                },
            });

            client.activate();
            setStompClient(client);

            return () => client.deactivate();
        };

        connectWebSocket();

        return () => {
            if (stompClient) {
                console.log("Cleaning up WebSocket connection");
                stompClient.deactivate();
            }
        };
    }, []);

    const subscribeToTopic = (topic: string) => {
        if (stompClient && stompClient.connected) {
            stompClient.subscribe(`/topic/${topic}`, (message) => {
                const data = JSON.parse(message.body);
                console.log(`Received message on topic ${topic}:`, data.message);
                setMessages((prevMessages) => {
                    const updatedMessages = { ...prevMessages };

                    // Make sure to initialize the array if it doesn't exist
                    if (!updatedMessages[topic]) {
                        updatedMessages[topic] = [];
                    }
                        updatedMessages[topic].push(data.message); // Append 

                    return updatedMessages;
                });
            });
        } else {
            console.error("WebSocket is not connected!");
        }
    };

    const sendMessage = (topic: string, message: string) => {
        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: `/app/${topic}`,
                body: JSON.stringify({ message }),
            });
        } else {
            console.error("WebSocket is not connected!");
        }
    };

    return (
        <WebSocketContext.Provider value={{ messages, sendMessage, subscribeToTopic }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};

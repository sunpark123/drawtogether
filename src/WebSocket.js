import { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { GET_SERVER_URL, userSessionCheck } from './Api';

export const useWebSocket = () => {
    const [messages, setMessages] = useState([]);
    const clientRef = useRef(null);

    useEffect(() => {
        const socket = new SockJS(GET_SERVER_URL() + 'ws-stomp');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe('/server/123', (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    setMessages((prev) => [...prev, newMessage]);
                });
                userSessionCheck().then(({ success, userId }) => {
                    if (success) {
                        client.subscribe('/server/' + userId, (msg) => {
                            console.log(msg.body)
                            const newMessage = JSON.parse(msg.body);
                            setMessages((prev) => [...prev, newMessage]);
                        });
                    }
                });
            },
        });

        client.activate();
        clientRef.current = client;

        return () => client.deactivate();
    }, []);

    const sendMessage = (path, message) => {
        if (clientRef.current && clientRef.current.connected) {
            userSessionCheck().then(({ success, userId }) => {
                if (success) {
                    clientRef.current.publish({
                        destination: '/app/' + path,
                        body: JSON.stringify({ userId: userId, message }),
                    });
                }
             });
        } else {
            console.log('STOMP client not connected yet');
        }
    };

    return { messages, sendMessage }; // 훅에서 반환
};
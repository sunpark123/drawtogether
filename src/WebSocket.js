import { useEffect, useState, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { GET_SERVER_URL, userSessionCheck } from './Api';

export const useWebSocket = (roomId) => {
    const [message, setMessages] = useState([]);
    const clientRef = useRef(null);

    const [addHistory, setAddHistory] = useState([]);
    
    const [userMouse, setUserMouse] = useState([])

    const [allHistory, setAllHistory] = useState([]);

    const updateUserMouse = (userIds, x, y) => {
        setUserMouse(prev => {
            const userExists = prev.some(user => user.userId === userIds);

            if (userExists) {
                return prev.map(user => 
                    user.userId === userIds 
                    ? { ...user, mousePos: { x, y } } 
                    : user
                );
            } 
            else {
                return [...prev, { userId:userIds, mousePos: { x, y } }];
            }
        });
    };
    useEffect(() => {
        if (!roomId) return;


        const socket = new SockJS(GET_SERVER_URL() + 'ws-stomp');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe('/server/chat' + roomId, (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    setMessages((prev) => [...prev, newMessage]);
                });
                client.subscribe('/server/draw/' + roomId, (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    setAddHistory(newMessage)
                });
        
                client.subscribe('/server/mouse/' + roomId, (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    userSessionCheck().then(({ success, userId }) => {
                        if (success) {
                            if(newMessage.userId !== userId) updateUserMouse(newMessage.userId, newMessage.mousePos.x, newMessage.mousePos.y)
                        }
                    });
                });

                userSessionCheck().then(({ success, userId }) => {
                    if (success) {
                        client.subscribe('/server/' + userId, (msg) => {
                            const newMessage = JSON.parse(msg.body);
                            setAllHistory(Object.values(newMessage))
                        });
                    }
                });
            },
        });

        client.activate();
        clientRef.current = client;

        return () => client.deactivate();
    }, [roomId]);

    const sendMessage = useCallback((message) => {
        if (clientRef.current && clientRef.current.connected) {
            userSessionCheck().then(({ success, userId }) => {
                if (success) {
                    clientRef.current.publish({
                        destination: '/app/chat/' + roomId,
                        body: JSON.stringify({ userId: userId, message: message }),
                    });
                }
             });
        } else {
            console.log('STOMP client not connected yet');
        }
    }, [roomId]);

    const sendDraw = (drawHistoryZip) => {
        if (clientRef.current && clientRef.current.connected) {
            userSessionCheck().then(({ success, userId }) => {
                if (success) {
                    clientRef.current.publish({
                        destination: '/app/draw/' + roomId,
                        body: JSON.stringify({ userId: userId, history: drawHistoryZip }),
                    });
                }
             });
        } else {
            console.log('STOMP client not connected yet');
        }
    };
    const sendMousePos = (pos) => {
        if (clientRef.current && clientRef.current.connected) {
            userSessionCheck().then(({ success, userId }) => {
                if (success) {
                    clientRef.current.publish({
                        destination: '/app/mouse/' + roomId,
                        body: JSON.stringify({ userId: userId, mousePos: pos }),
                    });
                }
             });
        } else {
            console.log('STOMP client not connected yet');
        }
    };
    const getAllDrawHistory = useCallback(() => {
        if (clientRef.current && clientRef.current.connected) {
            userSessionCheck().then(({ success, userId }) => {
                if (success) {
                    clientRef.current.publish({
                        destination: '/app/need/' + roomId,
                        body: JSON.stringify({ userId: userId }),
                    });
                }
             });
        } else {
            console.log('STOMP client not connected yet');
        }
    }, [roomId]);

    
    useEffect(() => {
        const interval = setInterval(() => {
            if (clientRef.current?.connected) {
                getAllDrawHistory(); 
                sendMessage("/alert 님이 입장하였습니다.")
                clearInterval(interval);
            }
        }, 500);
        return () => clearInterval(interval);
    }, [getAllDrawHistory,sendMessage]);

    return { addHistory, sendDraw, userMouse, sendMousePos, allHistory, getAllDrawHistory, message, sendMessage }; 
};
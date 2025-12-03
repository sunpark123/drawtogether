import { useEffect, useState, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { GET_SERVER_URL, userSessionCheck } from './Api';
import { useNavigate } from 'react-router-dom';

export const useWebSocket = (roomId) => {
    const [message, setMessages] = useState([]);
    const clientRef = useRef(null);

    const [addHistory, setAddHistory] = useState([]);
    
    const [userMouse, setUserMouse] = useState([])

    const [allHistory, setAllHistory] = useState([]);

    const [userId, setUserId] = useState(null);

    const [userList, setUserList] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
		(async () => {
			const { success, userId } = await userSessionCheck();
			if (!success) {
				navigate("/login");
			}
            else{
                setUserId(userId);
            }
		})();
	}, [roomId, navigate]);

    const updateUserMouse = (userIds, x, y) => {
        setUserMouse(prev => {
            return prev
                .map(mouse => mouse.userId === userIds ? { ...mouse, mousePos: { x, y } } : mouse)
                .concat(prev.some(mouse => mouse.userId === userIds) ? [] : [{ userId: userIds, mousePos: { x, y } }]);
        });
    };
    useEffect(() => {
        setUserMouse(prev => {
            const validUserIds = new Set(userList.map(user => user.userId));
            return prev.filter(mouse => validUserIds.has(mouse.userId));
        });
    }, [userList]);
    useEffect(() => {
        if (!roomId || !userId) return;
        

        const socket = new SockJS(GET_SERVER_URL() + 'ws-stomp');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            queueMessages: true,

            onConnect: () => {
                client.subscribe(`/server/chat/${roomId}`, (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    setMessages((prev) => [...prev, newMessage]);
                });
                client.subscribe(`/server/draw/${roomId}`, (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    setAddHistory(newMessage)
                });
        
                client.subscribe(`/server/mouse/${roomId}`, msg => {
                    const newMessage = JSON.parse(msg.body);
                    if(newMessage.userId !== userId) updateUserMouse(newMessage.userId, newMessage.mousePos.x, newMessage.mousePos.y)
                    
                });

                client.subscribe(`/server/userlist/${roomId}`, msg => {
                    const newMessage = JSON.parse(msg.body);
                    setUserList(newMessage);
                });

                client.subscribe(`/server/need/${roomId}/${userId}`, msg => {
                    const newMessage = JSON.parse(msg.body);
                    setAllHistory(newMessage)
                }, { userId: userId });

                clientRef.current.publish({
                    destination: `/app/need/${roomId}`,
                    body: JSON.stringify({ userId })
                });
        
            },
        });

        client.activate();
        clientRef.current = client;
       
        return () => client.deactivate();

    }, [roomId, userId]);
   
    
    const sendMessage = useCallback((message) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: '/app/chat/' + roomId,
                body: JSON.stringify({ userId: userId, message: message }),
            });
        } else {
            console.log('STOMP client not connected yet');
        }
    }, [roomId, userId]);

    const sendDraw = (drawHistoryZip, code) => {
        if (clientRef.current && clientRef.current.connected) {
                clientRef.current.publish({
                    destination: '/app/draw/' + roomId,
                    body: JSON.stringify({ userId: userId, history: drawHistoryZip, code: code }),
            });
        } else {
            console.log('STOMP client not connected yet');
        }
    };
    const sendMousePos = (pos) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: '/app/mouse/' + roomId,
                body: JSON.stringify({ userId: userId, mousePos: pos }),
            });
        } else {
            console.log('STOMP client not connected yet');
        }
    };
    const getAllDrawHistory = useCallback(() => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: '/app/need/' + roomId,
                body: JSON.stringify({ userId: userId }),
            });
        } else {
            console.log('STOMP client not connected yet');
        }
    }, [roomId, userId]);

    



    return { addHistory, sendDraw, userMouse, sendMousePos, allHistory, getAllDrawHistory, message, sendMessage, userList }; 
};
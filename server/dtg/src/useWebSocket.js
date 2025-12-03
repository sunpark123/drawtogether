import { useEffect, useRef, useContext } from "react";
import { DrawContext } from "./App";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const useWebSocket = (onMessageReceived, roomId) => {
  	const stompClient = useRef(null);
  	const sendJoinMsg = useRef(null);
	const { userId, userName } = useContext(DrawContext);
	useEffect(() => {
		// Stomp 클라이언트 생성
		const client = new Client({
			brokerURL: "ws://localhost:1112/ws-stomp",
			connectHeaders: {},
			// debug: (str) => {
			// 	console.log(str);
			// },
			//디버깅
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			webSocketFactory: () => new SockJS("http://localhost:1112/ws-stomp"),
			onConnect: () => {
				console.log("Connected to WebSocket + " + roomId);

				// 구독
				client.subscribe("/server/" + roomId, (message) => {
					if (onMessageReceived) {
						onMessageReceived(message.body);
					}
				});

				sendJoinMsg.current = true;
			},
		});
		client.activate();
		stompClient.current = client;
		


		return () => {
			if (stompClient.current) {
				stompClient.current.deactivate();
			}
		};
	}, [onMessageReceived, roomId]);
	
	const joinMessage = () => {
		if (stompClient.current && stompClient.current.connected) {
			stompClient.current.publish({ 
				destination: "/app/chat/" + roomId,

				body: JSON.stringify({
					userId: userName,
					message: "님이 접속하였습니다."
				})

			});
		}
	}
	
	useEffect(() => {
		if(sendJoinMsg){
			joinMessage();
			console.log("asd")
		}
	},[sendJoinMsg])
	const sendMessage = (msg) => {
		if (stompClient.current && stompClient.current.connected) {
			stompClient.current.publish({ 
				destination: "/app/chat/" + roomId,

				body: JSON.stringify({
					userId: userName,
					message: msg
				})

			});
		}
	};
	const sendDrawHistory = (draw) => {
		if (stompClient.current && stompClient.current.connected) {
			const message = {
				userId: userId,
				drawList: draw
			};
			stompClient.current.publish({
				destination: `/app/draw/${roomId}`,
				body: JSON.stringify(message)
			});
		}
	};
	// const disconnect = () => {
	// 	stompClient.current?.deactivate();
	// };
  	return { sendMessage, sendDrawHistory, joinMessage };
};

export default useWebSocket;

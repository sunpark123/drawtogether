import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const useWebSocket = (onMessageReceived, roomId) => {
  const stompClient = useRef(null);

	useEffect(() => {
		// Stomp 클라이언트 생성
		const client = new Client({
			brokerURL: "ws://localhost:1112/ws-stomp",
			connectHeaders: {},
			debug: (str) => {
				console.log(str);
			},
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


	const sendMessage = (msg) => {
		if (stompClient.current && stompClient.current.connected) {
			stompClient.current.publish({ 
				destination: "/app/chat/" + roomId,

				body: JSON.stringify({
					userId: "tjrgus",
					message: msg
				})

			});
		}
	};

  	return { sendMessage };
};

export default useWebSocket;

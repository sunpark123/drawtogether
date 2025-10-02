import { useEffect, useState } from "react";
import Chat from "../Chat/Chat";
import Draw from "../Draw/Draw";
import { useParams } from "react-router-dom";
import useWebSocket from "../useWebSocket";

function Room( {moveLocate} ) {
    const { roomId } = useParams();

    const [messages, setMessages] = useState([]);

    const { sendMessage } = useWebSocket((msg) => {
		setMessages((prev) => [...prev, JSON.parse(msg)]);
	}, roomId);

	const send = (msg) => {
		if (msg.trim()) {
			sendMessage(msg);
		}
	};

    useEffect(() => {
        moveLocate("room");
    }, [roomId, moveLocate])

    return (
		<>
			<Draw></Draw>
            <Chat send={send} messages={messages}></Chat>
		</>
    );
}

export default Room;

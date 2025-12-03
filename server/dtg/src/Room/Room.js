import { useEffect, useState, useContext } from "react";
import { DrawContext } from "../App";
import Chat from "../Chat/Chat";
import Draw from "../Draw/Draw";
import { useParams } from "react-router-dom";
import useWebSocket from "../useWebSocket";

function Room( {moveLocate} ) {
	const { userId } = useContext(DrawContext);

    const { roomId } = useParams();

    const [messages, setMessages] = useState([]);
	const [addHistory, setAddHistory] = useState(null);

	const [joinMessageSend, setJoinMeesageSend] = useState(false);

    const { sendMessage, sendDrawHistory, joinMessage } = useWebSocket((msg) => {
		let json = JSON.parse(msg);
		let code = json.code;
		if(code === 0){ //메세지
			setMessages((prev) => [...prev, json]);
		}
		else if (code === 1){ //그림
			if(json.userId !== userId){
				setAddHistory(json.drawList);
			} 
		}

		
		
	}, roomId);
	if(!joinMessageSend){
		joinMessage();	
		setJoinMeesageSend(true);
	}
	const send = (msg) => {
		if (msg.trim()) {
			sendMessage(msg);
		}
	};

	const sendDraw = (draw) => {
		console.log(draw);
		sendDrawHistory(draw);
	}

    useEffect(() => {
        moveLocate("room");
    }, [roomId, moveLocate])

    return (
		<>
			<Draw sendDraw={sendDraw} addHistory={addHistory}></Draw>
            <Chat send={send} messages={messages}></Chat>
		</>
    );
}

export default Room;

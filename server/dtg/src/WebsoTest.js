import React, { useState } from "react";
import useWebSocket from "./useWebSocket";

function WebsoTest() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [userId] = useState("tjrgus");

	const { sendMessage } = useWebSocket((msg) => {
		console.log(msg);
		setMessages((prev) => [...prev, msg]);
	}, userId);

	const handleSend = () => {
		if (input.trim()) {
			sendMessage(input);
			setInput("");
		}
	};

	return (
		<div style={{ padding: 20 }}>
		<h2>Room : {userId}</h2>
		<div style={{ border: "1px solid gray", padding: 10, height: 200, overflowY: "scroll" }}>
			{messages.map((m, i) => (
			<div key={i}>{m}</div>
			))}
		</div>
		<input
			type="text"
			value={input}
			onChange={(e) => setInput(e.target.value)}
			onKeyDown={(e) => e.key === "Enter" && handleSend()}
			style={{ marginTop: 10, width: "80%" }}
		/>
		<button onClick={handleSend}>Send</button>
		</div>
	);
}

export default WebsoTest;

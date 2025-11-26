import { useRef, useState } from 'react';
import { useWebSocket } from '../WebSocket';


function DrawToGether () {


    const { messages, sendMessage } = useWebSocket();
    const [input, setInput] = useState('');


    const canvasRef = useRef(null);

    const handleGetHistory = () => {
        if (canvasRef.current?.getHistory) {
        console.log("Canvas history:", canvasRef.current.getHistory());
        }
    };


    return(
        <>
            <div>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={() => sendMessage("chat/123", input)}>Send</button>
                <button onClick={() => sendMessage("need/tjrgus", input)}>Send</button>
                <button onClick={() => handleGetHistory()}>Send</button>
        
                <div>
                    {messages.map((m, i) => (
                        <p key={i}><b>{m.userId}</b>: {m.message}</p>
                    ))}
                </div>
            </div>
        </>
    )
}
export default DrawToGether;
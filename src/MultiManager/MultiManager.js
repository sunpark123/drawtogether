import { useEffect, useRef, useState } from 'react';
import './MultiManager.css'
import { l } from '../language';

function MultiManager({message, sendMessage, userList, roomId}) {
    const [style, setStyle] = useState({});
    const handleMouseMove = (number, e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const rotateX = (y / rect.height - 0.5) * 20;
		const rotateY = (x / rect.width - 0.5) * -20;
		
		setStyle({
			number: number,
			transform: `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
			background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2), transparent 60%) rgba(255, 255, 255, 0.8)`,
		});
	};
	const resetStyle = (n) => setStyle({number:n, transform: "perspective(350px) rotateX(0deg) rotateY(0deg)", trastransition: `all 3s`, background: `rgba(255, 255, 255, 0` });


    const [enable, setEnable] = useState(true);

    const inputRef = useRef(null);
        
    const sendMessageRequest = (e) => {
        e.preventDefault();
        const value = inputRef.current.value;
        if (value?.trim()) {
            sendMessage(inputRef.current.value)
            inputRef.current.value = "";
        }
    }
    
    const [beforeMessageLength, setBeforeMessageLength] = useState(0);
    const [messageLength, setMessageLength] = useState(0);
    useEffect(() => {
        if(enable) setBeforeMessageLength(message.length);;

        setMessageLength(message.length - beforeMessageLength);
    }, [message, setMessageLength, beforeMessageLength, enable]);

    const containerRef = useRef(null);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [message]);
    return(
        <>
            <div className="MultiManagerOpener" onClick={() => {setEnable(!enable); setBeforeMessageLength(message.length);}}>
                <img src='/chat.png' alt='chat'></img>
                <h1>{messageLength}</h1>
            </div>
            {enable && (
                <div className='MutiManager'>
                    <div className='close' onClick={() => setEnable(false)}>X</div>
                    <div className='header'>
                        <p>{l("room_list_room_code")} </p><h1>{roomId}</h1>
                    </div>
                    <div className='userList'>
                        {userList.map((user, index) => {
                            const isActive = style.number === index;

                            const containerStyle = {
                                transform: isActive ? style.transform : 'none',
                                background: isActive ? style.background : 'rgba(255, 255, 255, 0.8)',
                            };
                            
                            return (
                                <div className="user" key={index}
                                    onMouseMove={(e) => handleMouseMove(index, e)}
                                    onMouseLeave={() => resetStyle(index)}
                                    style={containerStyle}
                                >
                                <img src={user.userProfileImage} alt='profileImage'></img>
                                    <p>{user.userId}</p>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className='chat'>
                        <div className='chatWrap' ref={containerRef}>
                            {message.map((chat, index) => {
                                if (chat.message.includes("/alert")) {
                                    const newMessages = chat.message.replace("/alert", "");
                                    return (
                                        <div className='message' key={index}>
                                            <p style={{textAlign:"center", width:"100%", height:"30px", color:'gray'}} id='userMessage'>{chat.userId} {newMessages}</p>
                                        </div>
                                    )
                                }
                                else{
                                    return (
                                        <div className='message' key={index}>
                                            <p id='userId'>{chat.userId} :</p>
                                            <p id='userMessage'>{chat.message}</p>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <form onSubmit={(e) => sendMessageRequest(e)}>
                            <div className='sendChat'>
                                <input ref={inputRef}></input>
                                <button>보내기</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
export default MultiManager;
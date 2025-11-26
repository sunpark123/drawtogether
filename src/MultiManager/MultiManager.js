import { useRef, useState } from 'react';
import './MultiManager.css'

function MultiManager({message, sendMessage}) {
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
    const [userList] = useState([{userId:"gang"},{userId:"gang"},{userId:"gang"},{userId:"gang"}]);

    const inputRef = useRef(null);
        
    const sendMessageRequest = (e) => {
        e.preventDefault();
        const value = inputRef.current.value;
        if (value?.trim()) {
            sendMessage(inputRef.current.value)
            inputRef.current.value = "";
        }
    }
    
    return(
        <>
            <div className="MultiManagerOpener" onClick={() => setEnable(!enable)}>
                
            </div>
            {enable && (
                <div className='MutiManager'>
                    <div className='header'>
                        <h1>RoomName</h1>
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
                                <img src='/basicProfileImage.png' alt='profileImage'></img>
                                    <p>{user.userId}</p>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className='chat'>
                        {message.map((chat, index) => {
                            if (chat.message.includes("/alert")) {
                                const newMessages = chat.message.replace("/alert", "");
                                return (
                                    <div className='message' key={index}>
                                        <p style={{textAlign:"center", width:"100%", height:"30px"}} id='userId'>{chat.userId} {newMessages}</p>
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
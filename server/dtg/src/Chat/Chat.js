import { useRef } from 'react';
import './Chat.css'

function Chat( {send, messages} ) {
    
	const inputRef = useRef();
	
	const sendChat = (e) => {
		e.preventDefault(); 
		send(inputRef.current.value);
		inputRef.current.value = "";
	}


    return (
		<>
			<div className='Chat'>
				<div className='inChat'>
					{messages.map((chatDTO, index) => (
						
						<p key={index}>{chatDTO.userId} : {chatDTO.message}</p>
					))}
				</div>
				<div className='chatInput'>
					<form onSubmit={sendChat}>
						<input ref={inputRef}></input>
						<button>人<br />|</button>
					</form>
				</div>
			</div>
		</>
    );
}

export default Chat;

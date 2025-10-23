import { useEffect, useState, useContext } from 'react';
import './Lobby.css';
import { DrawContext } from "../App";

function Lobby( ) {
	const { userId } = useContext(DrawContext);
	const [lobbyTextX, setLobbyTextX] = useState(150);
	
	return (
		<>
			<div className='lobby'>
				<div className='textBox' style={{ left:`${lobbyTextX}%`, top:`${lobbyTextX}%`}}>
					<span>D</span><span>r</span><span>a</span><span>w</span> <br></br>
					<span id='spanT'>T</span><span>o</span> <br></br>
					<span>G</span><span>e</span><span>t</span><span>h</span><span>e</span><span>r</span>
					<span>!</span>
				</div>
				
			</div>
			{console.log(userId)}
		</>
	);
}

export default Lobby;

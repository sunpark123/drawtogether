import { useEffect, useState } from 'react';
import './Lobby.css';
import Draw from '../Draw/Draw';
function Lobby( {locate, tool, size, color, saveHistory, needHistory} ) {

	const [lobbyTextX, setLobbyTextX] = useState(150);

	useEffect(() => {
		if(locate === "lobby") setLobbyTextX(50);
		if(locate === "draw") setLobbyTextX(150);
	}, [locate])
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
			{lobbyTextX === 150 && <Draw tool={tool} size={size} color={color} saveHistory={saveHistory} needHistory={needHistory}/>}
			
		</>
	);
}

export default Lobby;

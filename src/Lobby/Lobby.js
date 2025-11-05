import { useState, useContext } from 'react';
import './Lobby.css';
import { DrawContext } from "../App";
import { l } from '../language';
import LanguageSetter from '../LanguageSetter/LanguageSetter';


function Lobby( ) {
	
	
	

	const { userId } = useContext(DrawContext);
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

	const resetStyle = (n) => setStyle({number:n, transform: "perspective(350px) rotateX(0deg) rotateY(0deg)", trastransition: `all 3s`, background: `rgba(255, 255, 255, 0.8)` });
	return (
		<>
			<LanguageSetter />
			<div className='lobby'>
				<div className='textBox'>
					<span>D</span><span>r</span><span>a</span><span>w</span> <br></br>
					<span id='spanT'>T</span><span>o</span> <br></br>
					<span>G</span><span>e</span><span>t</span><span>h</span><span>e</span><span>r</span>
					<span>!</span>
				</div>
				<div className='menuBox'>
					<div className='menuWrap'>
						<div className="menu" onMouseMove={(e) => handleMouseMove(1, e)}  onMouseLeave={() => resetStyle(1)} style={{
							transform: (style.number === 1) ? style.transform : 'none',
							background: (style.number === 1) ? style.background : 'rgba(255, 255, 255, 0.075);'
						}}>
							<img src="menu_1.png" alt="gameIcon"></img>
							<h1>{l("menu_draw")}</h1>
							<p>{l("menu_info_draw")}</p>
						</div>
						<div className="menu" onMouseMove={(e) => handleMouseMove(2, e)}  onMouseLeave={() => resetStyle(2)} style={{
							transform: (style.number === 2) ? style.transform : 'none',
							background: (style.number === 2) ? style.background : 'rgba(255, 255, 255, 0);'
						}}>
							<img src="menu_2.png" alt="gameIcon"></img>
							<h1>{l("menu_profile")}</h1>
							<p>{l("menu_info_profile")}</p>
						</div>
					</div>
					<div className='menuWrap'>
						<div className="menu" onMouseMove={(e) => handleMouseMove(3, e)}  onMouseLeave={() => resetStyle(3)} style={{
							transform: (style.number === 3) ? style.transform : 'none',
							background: (style.number === 3) ? style.background : 'rgba(255, 255, 255, 0.075);'
						}}>
							<img src="menu_3.png" alt="gameIcon"></img>
							<h1>{l("menu_other")}</h1>
							<p>{l("menu_info_other")}</p>
						</div>
						<div className="menu" onMouseMove={(e) => handleMouseMove(4, e)}  onMouseLeave={() => resetStyle(4)} style={{
							transform: (style.number === 4) ? style.transform : 'none',
							background: (style.number === 4) ? style.background : 'rgba(255, 255, 255, 0);'
						}}>
							<img src="menu_4.png" alt="gameIcon"></img>
							<h1>{l("menu_join")}</h1>
							<p>{l("menu_info_join")}</p>
						</div>
					</div>
				</div>
			</div>
			{console.log(userId)}
		</>
	);
}

export default Lobby;

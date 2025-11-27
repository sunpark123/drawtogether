import { useState } from 'react';
import { l } from '../language';
import './LobbyDrawSelect.css'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


function LobbyDrawSelect( { setClose, code = 0 }){

    const navigate = useNavigate();

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

    const newRoomCode = () => {
        const number = uuidv4().slice(0, 6).toUpperCase();
        return number;
    };
    
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value.toUpperCase());
    };

    const submitHandle = (e) => {
        e.preventDefault();
        if(value.length === 6) navigate(`/room/${value}`)
    }
    return (
        <div className="LobbyDrawSelect">
            <div className="drawSelectBox" style={{backgroundImage: "url('background.jpg') "}}>
            {code === 0 ? (
                <>
                    <div className='menuWrap'>
                        <div className="menu" onClick={() => navigate("/draw")} onMouseMove={(e) => handleMouseMove(3, e)}  onMouseLeave={() => resetStyle(3)} style={{
                            transform: (style.number === 3) ? style.transform : 'none',
                            background: (style.number === 3) ? style.background : 'rgba(255, 255, 255, 0.8)'
                        }}>
                            <img src="menu_3.png" alt="gameIcon"></img>
                            <h1>{l("menu_room_solo")}</h1>
                            <p>{l("menu_room_info_solo")}</p>
                        </div>
                        <div className="menu" onClick={() => navigate("/room/" + newRoomCode())} onMouseMove={(e) => handleMouseMove(4, e)}  onMouseLeave={() => resetStyle(4)} style={{
                            transform: (style.number === 4) ? style.transform : 'none',
                            background: (style.number === 4) ? style.background : 'rgba(255, 255, 255, 0.8)'
                        }}>
                            <img src="menu_4.png" alt="gameIcon"></img>
                            <h1>{l("menu_room_multi")}</h1>
                            <p>{l("menu_room_info_multi")}</p>
                        </div>
                    </div>
                    
                </>
            ) : (
                <form onSubmit={(e) => submitHandle(e)}>
                    <div className='menuWrap' style={{flexDirection: "column"}}>
                        <input
                            type="text"
                            value={value}
                            onChange={handleChange}
                            placeholder={l("menu_input_join_code")}
                            maxLength={6}
                        />
                        <button>{l("menu_button_join_code")}</button>
                    </div>
                </form>
            )}
            <div className='close' onClick={() => setClose(false)}>X</div>
            </div>
        </div>
    )
}
export default LobbyDrawSelect;
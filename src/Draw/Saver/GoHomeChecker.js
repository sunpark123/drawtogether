import { useState } from 'react';
import { l } from '../../language';
import './SaveChecker.css'
import { useNavigate } from 'react-router-dom';

function GoHomeChecker ({ setGoHomeChecker}) {
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

    const navigate = useNavigate();

	const resetStyle = (n) => setStyle({number:n, transform: "perspective(350px) rotateX(0deg) rotateY(0deg)", trastransition: `all 3s`, background: `rgba(255, 255, 255, 0.8)` });
    return (
        <>
            <div className="SaveChecker">
                <div className='block' style={{backgroundImage: "url('background.jpg') "}}>
                    <div className='menuWrap'>
                        <div className="menu" onClick={() => navigate("/lobby")} onMouseMove={(e) => handleMouseMove(1, e)}  onMouseLeave={() => resetStyle(1)} style={{
                            transform: (style.number === 1) ? style.transform : 'none',
                            background: (style.number === 1) ? style.background : 'rgba(255, 255, 255, 0.8)',
                        }}>
                            <img src="noneDrawImage.png" style={{ height: "50px" }} alt="gameIcon"></img>
                            <h1 style={{ color:"blue" }}>{l("saved_overwrite_yes")}</h1>
                            <p>{l("go_home_check_saved")}</p>
                        </div>
                        <div className="menu" onClick={() => setGoHomeChecker(false)} onMouseMove={(e) => handleMouseMove(2, e)}  onMouseLeave={() => resetStyle(2)} style={{
                            transform: (style.number === 2) ? style.transform : 'none',
                            background: (style.number === 2) ? style.background : 'rgba(255, 255, 255, 0.8)'
                        }}>
                            <img src="noneDrawImage.png" style={{ height: "50px" }} alt="gameIcon"></img>
                            <h1 style={{ color:"red" }}>{l("saved_overwrite_no")}</h1>
                            <p>{l("go_home_check_not_saved")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default GoHomeChecker;
import { useState } from 'react';
import { l } from '../../language';
import './Saver.css'
import {saveDrawHistory, saveDrawImage } from '../../Api'

function Saver( { setSaverEnable, saveHistory }){
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


    const getAllDrawRequest = () => {
        (async () => {
            console.log(saveHistory)
            const { success } = await saveDrawImage(saveHistory.drawImg, 3);
            if (success) {
                console.log("저장됨ㄴㅁㅇㄴㅁㅇ!!");
                const { success: historySuccess } = await saveDrawHistory(saveHistory.history, 3);
                if(historySuccess)
                {
                    console.log("저장됨!!");
                }
                else{
                    console.log(":nono")
                }
            } 
            else{
                console.log("fas")
            }
        })();
    }



    return (
        <div className="Saver">
            <div className="drawSelectBox" style={{backgroundImage: "url('background.jpg') "}}>
                <h1>{l("saver_save")}</h1>
                <div className='menuWrap'>
                    <div className="menu" onClick={() => getAllDrawRequest()} onMouseMove={(e) => handleMouseMove(3, e)}  onMouseLeave={() => resetStyle(3)} style={{
                        transform: (style.number === 3) ? style.transform : 'none',
                        background: (style.number === 3) ? style.background : 'rgba(255, 255, 255, 0.8)'
                    }}>
                        <img src="menu_3.png" alt="gameIcon"></img>
                        <h1>2025. 03. 03</h1>
                        <p>{l("loader_last_edit_day")}</p>
                    </div>
                </div>
                <div className='close' onClick={() => setSaverEnable(false)}>X</div>
            </div>
        </div>
    )
}
export default Saver;
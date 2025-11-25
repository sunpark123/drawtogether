import { useCallback, useEffect, useState } from 'react';
import { l } from '../../language';
import './Saver.css'
import {getAllDrawImage, saveDrawHistory, saveDrawImage, userSessionCheck } from '../../Api'
import { useNavigate } from 'react-router-dom';
import SaveChecker from './SaveChecker';

function Saver( { setSaverEnable, saveHistory }){
    const [style, setStyle] = useState({});
    const [saveOverWriteChecker, setSaveOverWriteChecker] = useState(-1);
    
    const navigate = useNavigate();


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


    const saveDrawHistoryRequest = (number) => {
        (async () => {
            if(!saveHistory.history) return;

            const { success } = await saveDrawImage(saveHistory.drawImg, number);
            if (success) {
                const { success: historySuccess } = await saveDrawHistory(saveHistory.history, number);
                if(historySuccess)
                {
                    setSaveOverWriteChecker(-1);
                    getAllDrawImageRequest();
                }
            } 
        })();
    }

    const getAllDrawImageRequest = useCallback(() => {
        (async () => {
            const { success:sessionCheck, userId } = await userSessionCheck();
            if (sessionCheck) {
                const { success, allDrawImage } = await getAllDrawImage(userId);
                if (success) {
                    setAllDrawImage(allDrawImage)
                } 
            } else {
                navigate("/login");
            }
        })();
    }, [navigate]);
    
    const [allDrawImage, setAllDrawImage] = useState([]);

    useEffect(() => {
        getAllDrawImageRequest();
    }, [getAllDrawImageRequest]);



 
    const onClickItem = (image, index) => {
        if (image.have) setSaveOverWriteChecker(index);
        else saveDrawHistoryRequest(index);
    };

    return (
        <>
            <div className="Saver" onClick={() => setSaverEnable(false)}>
                <div className="drawSelectBox" style={{backgroundImage: "url('background.jpg') "}}>
                    <h1>{l("saver_save")}</h1>
                    <div className='menuWrap'>
                        {allDrawImage.map((image, index) => {
                            const isActive = style.number === index;

                            const containerStyle = {
                                transform: isActive ? style.transform : 'none',
                                background: isActive ? style.background : 'rgba(255, 255, 255, 0.8)',
                            };

                            const imageSrc = image.have ? image.url : "noneDrawImage.png";
                            const imgStyle = image.have ? {} : { height: "30px" };
                            
                            return (
                                <div className="menu" key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClickItem(image, index);
                                    }}
                                    onMouseMove={(e) => handleMouseMove(index, e)}
                                    onMouseLeave={() => resetStyle(index)}
                                    style={containerStyle}
                                >
                                    <img src={imageSrc} style={imgStyle} alt="gameIcon" />
                                    <h1>{image.have ? image.lastEditDate : l("saved_empty")}</h1>
                                    <p>{image.have ? l("loader_last_edit_day") : l("loader_click_to_select")}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className='close' onClick={() => setSaverEnable(false)}>X</div>
                </div>
            </div>
            { saveOverWriteChecker >= 0 && <SaveChecker setSaveOverWriteChecker={setSaveOverWriteChecker} saveDrawHistoryRequest={() => saveDrawHistoryRequest(saveOverWriteChecker)}/> }
        </>
    )
}
export default Saver;
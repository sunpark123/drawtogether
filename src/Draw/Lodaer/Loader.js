import { useCallback, useEffect, useState } from 'react';
import { l } from '../../language';
import './Loader.css'
import { useNavigate } from 'react-router-dom';
import { getAllDrawImage, getDrawHistoryOfNumber, userSessionCheck } from '../../Api';

function Loader( { setLoaderEnable, setLoadHistoryRequest }){

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


    const getDrawHistory = (number) => {
        (async () => {
            const { success:sessionCheck, userId } = await userSessionCheck();
            if (sessionCheck) {
                const { success, drawHistory } = await getDrawHistoryOfNumber(userId, number);
                if (success) {
                    setLoaderEnable(false);
                    setLoadHistoryRequest(drawHistory);
                } 
            }
            else{
                navigate("/login");
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


    return (
        <div className="Loader" onClick={() => setLoaderEnable(false)}>
            <div className="drawSelectBox" style={{backgroundImage: "url('background.jpg') "}}>
                <h1>{l("loader_load")}</h1>
                <div className='menuWrap'>
                    {allDrawImage.map((image, index) => (
                            <div className="menu" key={index} onClick={() => getDrawHistory(index)} onMouseMove={(e) => handleMouseMove(index, e)}  onMouseLeave={() => resetStyle(index)} style={{
                                transform: (style.number === index) ? style.transform : 'none',
                                background: (style.number === index) ? style.background : 'rgba(255, 255, 255, 0.8)'
                            }}>
                                <img src={image.have? image.url : "noneDrawImage.png"} style={image.have ? {} : { height: "30px" }} alt="gameIcon"></img>
                                <h1>{image.have ? image.lastEditDate : l("saved_empty")}</h1>
                                <p>{image.have ? l("loader_last_edit_day") : l("loader_click_to_select")}</p>
                            </div>
                    ))}
                </div>
                <div className='close' onClick={() => setLoaderEnable(false)}>X</div>
            </div>
        </div>
    )
}
export default Loader;
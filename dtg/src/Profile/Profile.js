import { useState, useEffect, useRef, useCallback  } from 'react';
import './Profile.css';
import { changeUserName, getUserName, getUserProfileImage, saveUserProfileImage, userSessionCheck } from '../Api';
import Cursor from '../Draw/Cursor';

function Profile( {moveLocate} ) {

    const [isInput, setIsInput] = useState([true]);
    const [errorMessage, setErrorMessage] = useState("");

    const [openDrawProfileImage, setOpenDrawProfileImage] = useState(false);

    const [userProfileImageURL, setUserProfileImageURL] = useState('/basicProfileImage.png')

    // const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const userNameRef = useRef();

    useEffect(() => {
        (async () => {
            const { success, userId } = await userSessionCheck();
            if (success) {
                // setUserId(userId);

                const { success: imgSuccess, userProfileImage } = await getUserProfileImage(userId);
                if (imgSuccess) setUserProfileImageURL(userProfileImage);

                const { success: nameSuccess, userName } = await getUserName(userId);
                if (nameSuccess) setUserName(userName);
                
            } else { moveLocate("lobby") }
        })();
    }, [moveLocate]);

    const userProfileEditRequest = async (e) => {
        e.preventDefault(); 

        const changedUserName = userNameRef.current.value;

        if(changedUserName.length < 1) {setErrorMessage("이름은 2글자 이상이여야 합니다."); return}

        (async () => {
            const { success, userId } = await userSessionCheck();
            if (success) {
                changeUserName(userId, changedUserName);
                moveLocate("lobby")
            }
        })();
    }

    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);

    const [history, setHistory] = useState([]);
    const [currentStroke, setCurrentStroke] = useState(null);

    
 
   
    //캔버스



    const startDrawing = (e) => {
        setDrawing(true);
        
        let dx = e.nativeEvent.offsetX;
        let dy = e.nativeEvent.offsetY
        setCurrentStroke({ tool: "pen", color: "black", size: 5, path: [{ x: dx, y: dy, }, {x: dx+1, y: dy+1}] });
        
    };

    const draw = (e) => {
        if (!drawing) return;

        let dx = e.nativeEvent.offsetX;
        let dy = e.nativeEvent.offsetY
        
        setCurrentStroke(s => ({ ...s, path: [...s.path, { x: dx, y: dy }] }));
    };

    const stopDrawing = () => {
        setDrawing(false);
        setHistory(h => [...h, currentStroke]);
        setCurrentStroke(null);
    }

    const reDrawCanvas = useCallback(() => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = "white"; 
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const drawStroke = (drawInfo) => {
            if(drawInfo === null) return;
            
            const { tool, color, size, path: paths } = drawInfo;
            if (paths.length < 2) return;

            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = size;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            

            if (tool === "eraser") {
                ctx.globalCompositeOperation = "destination-out";
                ctx.strokeStyle = "rgba(0,0,0,1)";
            } else {
                ctx.globalCompositeOperation = "source-over";
                ctx.strokeStyle = color;
            }

            ctx.moveTo(paths[0].x, paths[0].y);
            paths.forEach((p) => {
                ctx.lineTo(p.x, p.y);
            });
            ctx.stroke();
        };

        history.forEach(drawInfo => {drawStroke(drawInfo)});
        if (currentStroke) drawStroke(currentStroke); 
    }, [history, currentStroke]);

    useEffect(() => {
        reDrawCanvas();
    }, [reDrawCanvas]);

    //커서
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleMove = (e) => {
            if (e.target.classList.contains("drawCanvas")) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);


    //캔버스 저장
    const saveCanvasImage = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL("image/png");
        setUserProfileImageURL(dataURL);


        saveUserProfileImage(dataURL);
    }

    return (
        <>
            <div className="Login" >
                <form onSubmit={userProfileEditRequest}>
                    <div className='LoginBox'>
                        <button className='ProfileImage' type='button'>
                            <img src={userProfileImageURL} onClick={() => setOpenDrawProfileImage(!openDrawProfileImage)} alt='profileImage'/>
                        </button>
                        <div className='line'></div>
                        <div className={`InputBox ${isInput[0] ? "isInput" : ""}`}>
                            <input
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                    setIsInput((prev) => {
                                        const newState = [...prev];
                                        newState[0] = e.target.value !== "";
                                        return newState;
                                    });
                                }}
                                ref={userNameRef}
                            />

                            <p>UserName</p>
                        </div>
                        <div className="ErrorMessage">
                            {errorMessage}
                        </div>
                        <div className='InputBox' style={{ marginTop: '30px' }}>
                            <button className='loginButton' type='submit'>수정</button>
                        </div>
                    </div>
                </form>
                <div className='drawProfileImageBox' style={{ display: (openDrawProfileImage ? "block" : "none")}}>
                    <p>프로필 이미지 그리기</p>
                    <div className='drawProfileImage'>
                        <canvas
                            className='drawCanvas'
                            width={200}
                            height={200}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "100%"
                            }}
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                        >
                        </canvas>
                        
                    </div>
                    <div className='drawProfileImageButton'>
                        <button className='edit' type='button' onClick={() => {saveCanvasImage(); setOpenDrawProfileImage(false)}}>완료</button>
                        <button className='close' type='button' onClick={() => {
                            setHistory([]);
                            setOpenDrawProfileImage(false);
                        }}>닫기(Reset)</button>
                    </div>
                </div>
            </div>
            {visible && <Cursor size={5}/>}
        </>
	);
}


export default Profile;

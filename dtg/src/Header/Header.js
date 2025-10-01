import { useEffect, useRef, useState } from 'react';
import './Header.css';
import { SketchPicker } from 'react-color';


function Header( { userId, locate, moveLocate, tool, setTool, size, setSize, color, setColor, saveHistoryRequest, resetHistoryRequest} ) {
    const [headerLeft, setHeaderLeft] = useState(0);
    const [colorSeleterOpen, setColorSeleterOpen] = useState(false);
    const colorPicker = useRef();
    const colorPickerWrapper = useRef();
    
    useEffect(() => {
        setHeaderLeft((locate === "lobby") ? 0 : -300);
    }, [locate])
    
    useEffect(() => {
        function handleClickOutside(e) {
            if (colorSeleterOpen && colorPickerWrapper.current && !colorPickerWrapper.current.contains(e.target)) {
                setColorSeleterOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [colorSeleterOpen]);



	return (
		<>
            <div className='header' style={{left:`${headerLeft}px`}}>
                {locate !== "lobby" && (
                    <div className='headerButton' id='headerClose' onClick={() => setHeaderLeft((headerLeft === 0) ? -300 : 0)}>
                        <p>{headerLeft === 0 ? "X" : ">"}</p>
                    </div> 
                )}
                
                {locate === "lobby" ? (
                    <div className='headerButton' onClick={() => moveLocate("draw")}>
                        <span></span>
                        <p>Draw</p>
                    </div>
                ) : (
                    <div className='headerButton' onClick={() => moveLocate("lobby")}>
                        <span></span>
                        <p>Lobby</p>
                    </div>
                )}
                
                {locate !== "draw" ? (
                    <>
                        {userId === null || userId === undefined ? (
                            <div className='headerButton'  onClick={() => moveLocate("login")}>
                                <span></span>
                                <p>Login</p>
                            </div>
                        ) : (
                            <div className='headerButton'  onClick={() => moveLocate("profile")}>
                                <span></span>
                                <p>Profile</p>
                            </div>
                        )}
                        
                        <div className='headerButton'>
                            <span></span>
                            <p>Other</p>
                        </div>
                        <div className='headerButton'>
                            <span></span>
                            <p>Join</p>
                        </div>
                    </>
                ) : (
                    <>
                        
                        <div className='headerButton' onClick={() => saveHistoryRequest()}>
                            <span></span>
                            <p>Save</p>
                        </div>
                        <div className='headerButton' onClick={() => resetHistoryRequest()}>
                            <span></span>
                            <p>Reset</p>
                        </div>
                        <div className='headerButton'>
                            <span></span>
                            <p>Invite</p>
                        </div>
                    </>
                )};
                

                <div className='drawTools' style={{display: (locate === "draw") ? "block" : "none"}}>
                    <div className='drawToolBox' style={{ '--t' : 1}}>
                        <div className="drawButton" style={{ '--i': 0 }} onClick={() => setTool("pen")}>
                            <p>Pen</p>
                        </div>
                        <div className="drawButton" style={{ '--i': 50 }} onClick={() => setTool("eraser")}>
                            <p>Eraser</p>
                        </div>
                    </div>
                    <div className='drawToolBox' style={{ '--t' : 2}}>
                        <div className="drawButton" style={{ '--i': 0 }} onClick={() => setSize(prev => prev-1)}>
                            <p>-</p>
                        </div>
                        <div className="drawButton" style={{ '--i': 50 }} onClick={() => setSize(prev => prev+1)}>
                            <p>+</p>
                        </div>
                    </div>
                    
                    <div className='drawToolBox' style={{ '--t' : 3}}>
                        <div className="drawButton" 
                            style={{
                                    '--i': 50,
                                    backgroundColor: colorPicker?.current?.state?.hex ?? "black",
                                    borderRadius: '100%'
                                }}
                            onClick={() => setColorSeleterOpen(!colorSeleterOpen)}>
                        </div>
                    </div>
                    
                    
                 
                </div>
                
            </div>
            <div
                ref={colorPickerWrapper}
                className='colorSeleter' 
                style={{ 
                    display: colorSeleterOpen ? "block" : "none",
                }}>
                <SketchPicker 
                    ref={colorPicker}
                    color={color}
                    onChange={setColor}
                />
            </div>
		</>
	);
}

export default Header;

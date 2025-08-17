import { useEffect, useState } from 'react';
import './Header.css';


function Header( {locate, moveLocate, tool, setTool, size, setSize} ) {
    const [headerLeft, setHeaderLeft] = useState(0);

    useEffect(() => {
        setHeaderLeft((locate === "lobby") ? 0 : -300);
    }, [locate])
  
	return (
		<>
            <div className='header' style={{left:`${headerLeft}px`}}>
                {locate !== "lobby" && (
                    <div className='headerButton' id='headerClose' onClick={() => setHeaderLeft((headerLeft === 0) ? -300 : 0)}>
                        <p>{headerLeft === 0 ? "X" : ">"}</p>
                    </div> 
                )}
                
                
                {locate === "lobby" ? (
                    <>
                        <div className='headerButton' onClick={() => moveLocate("draw")}>
                            <span></span>
                            <p>Draw</p>
                        </div>
                        <div className='headerButton'>
                            <span></span>
                            <p>Login</p>
                        </div>
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
                        <div className='headerButton' onClick={() => moveLocate("lobby")}>
                            <span></span>
                            <p>Lobby</p>
                        </div>
                        <div className='headerButton'>
                            <span></span>
                            <p>Save</p>
                        </div>
                        <div className='headerButton'>
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
                        <div className="drawButton" style={{ '--i': 0 }}>
                            <p>Pen</p>
                        </div>
                        <div className="drawButton" style={{ '--i': 50 }}>
                            <p>Es</p>
                        </div>
                    </div>
                    <div className='drawToolBox' style={{ '--t' : 4}}>
                        <div className="drawButton" style={{ '--i': 0 }}>
                            <p>Pen</p>
                        </div>
                        <div className="drawButton" style={{ '--i': 50 }}>
                            <p>Es</p>
                        </div>
                    </div>
                    <div className='drawToolBox' style={{ '--t' : 5}}>
                        <div className="drawButton" style={{ '--i': 0 }}>
                            <p>Pen</p>
                        </div>
                        <div className="drawButton" style={{ '--i': 50 }}>
                            <p>Es</p>
                        </div>
                    </div>
                    <div className='drawToolBox' style={{ '--t' : 6}}>
                        <div className="drawButton" style={{ '--i': 0 }}>
                            <p>Pen</p>
                        </div>
                        <div className="drawButton" style={{ '--i': 50 }}>
                            <p>Es</p>
                        </div>
                    </div>
                    
                 
                </div>
                
            </div>
		</>
	);
}

export default Header;

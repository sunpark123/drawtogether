import { useEffect, useState } from 'react';
import './Header.css';


function Header( {locate, moveLocate} ) {
    const [headerLeft, setHeaderLeft] = useState(0);
    const [mainButtonLocation, setMainButtonLocation] = useState("draw");

    const mainButtonEvent = () => {
        moveLocate(mainButtonLocation);
        setMainButtonLocation((mainButtonLocation === "draw") ? "lobby" : "draw");
    }

    useEffect(() => {
        console.log(locate);
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
                
                

                <div className='headerButton' onClick={() => mainButtonEvent()}>
                    <span></span>
                    <p>{mainButtonLocation === "draw" ? "Draw" : "Lobby"}</p>
                </div>
                <div className='headerButton'  onClick={() => moveLocate("lobby")}>
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

                <div className='drawTools' style={{display: (locate === "draw") ? "block" : "none"}}>
                    <div className='drawButton'>
                        <span></span>
                        <p>Pen</p>
                    </div>
                    <div className='drawButton'>
                        <span></span>
                        <p>Pen</p>
                    </div>
                    <div className='drawButton'>
                        <span></span>
                        <p>Pen</p>
                    </div>
                </div>
                
            </div>
		</>
	);
}

export default Header;

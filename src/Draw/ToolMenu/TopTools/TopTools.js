import { useEffect, useRef, useState } from 'react';
import './TopTools.css'

function TopTools( {tool, setSizeRequest, addSizeRequest, size} ){

     const [intervalId, setIntervalId] = useState(null);
    const sizeRef = useRef(size);

    useEffect(() => {
        sizeRef.current = size;
    }, [size]);

    const changeSize = (delta) => {
        if (sizeRef.current + delta < 1) return;
        if (sizeRef.current + delta > 100) return;

        addSizeRequest(delta);
    };

    const handleMouseDown = (delta) => {
        const id = setInterval(() => {
            changeSize(delta);
        }, 150);
        setIntervalId(id);
    };

    const handleMouseUp = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };
   
    return (
        <>
            <div className="TopTools">
            {tool === "pen" ? (
                <>
                    
                    <div className='tool' id='sizeP'>
                        <p>Size : ({size})</p>
                    </div>
                    <div className='tool'>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            step="1"
                            value={size}
                            onChange={(e) => setSizeRequest(Number(e.target.value))}
                        />
                    </div>
                    <div className='tool' id='toolSizeI'>
                        <img
                            src="DrawTool/toolSizePlus.png"
                            alt="tool/size/plus"
                            onClick={() => changeSize(+1)}
                            onMouseDown={() => handleMouseDown(+1)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        />
                    </div>
                    <div className='tool'>
                        <p>/</p>
                    </div>
                    <div className='tool' id='toolSizeI'>
                        <img
                            src="DrawTool/toolSizeMinus.png"
                            alt="tool/size/minus"
                            onClick={() => changeSize(-1)}
                            onMouseDown={() => handleMouseDown(-1)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        />
                    </div>
                    <div className='panel'></div>
                    <div className='tool' id='toolSizeI'>
                        <img
                            src="menu_1.png"
                            alt="tool/size/minus"
                            onClick={() => changeSize(-1)}
                            onMouseDown={() => handleMouseDown(-1)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        />
                    </div>
                    <div className='tool' id='toolSizeI'>
                        <img
                            src="language.png"
                            alt="tool/size/minus"
                            onClick={() => changeSize(-1)}
                            onMouseDown={() => handleMouseDown(-1)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        />
                    </div>
                </>
            ) : (
                <></>
            )}
            </div>
        </>
    );  
}

export default TopTools;
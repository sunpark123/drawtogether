import { useEffect, useRef, useState } from 'react';
import Canvas from '../Canvas/Canvas';

function Draw () {

    const canvasRef = useRef();

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return(
        <>
            <Canvas
                width={windowSize.width}
                height={windowSize.height}
                background={false}
                border={false}
                ref={canvasRef}
            ></Canvas>
        </>
    )
}
export default Draw;
import { useEffect, useRef, useState } from 'react';
import Canvas from '../Canvas/Canvas';
import SideTools from './ToolMenu/SideTools/SideTools';
import TopTools from './ToolMenu/TopTools/TopTools';
import Cursor from '../Canvas/Cursor';

function Draw () {
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
    //canvas 리 사이징

    const [cursorEnable, setCusorEnable] = useState(false);

    //
    const [tool, setTool] = useState("pen");
    const [size, setSize] = useState(5);

    const canvasRef = useRef();

    

    const setToolRequest = (toolName) => {
        setTool(toolName);
    }
    const setSizeRequest = (sizeNumber) => {
        setSize(sizeNumber);
    }
    const addSizeRequest = (sizeNumber) => {
        if(size < 1) return;
        setSize((prev) => (prev + sizeNumber));
    }
    return(
        <>
            
            <SideTools setToolRequest={setToolRequest}/>
            <TopTools tool={tool} setSizeRequest={setSizeRequest} addSizeRequest={addSizeRequest} size={size}/>
            <Canvas
                width={windowSize.width}
                height={windowSize.height}
                background={false}
                border={false}
                ref={canvasRef}
                tool={tool}
                size={size}
                onMouseMove={() => setCusorEnable(true)}
                onMouseLeave={() => setCusorEnable(false)}
            ></Canvas>
            {cursorEnable && (<Cursor size={size} />)}
        </>
    )
}
export default Draw;
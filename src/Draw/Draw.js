import { useEffect, useRef, useState } from 'react';
import Canvas from '../Canvas/Canvas';
import SideTools from './ToolMenu/SideTools/SideTools';
import TopTools from './ToolMenu/TopTools/TopTools';
import Cursor from '../Canvas/Cursor';
import Loader from './Lodaer/Loader';
import Saver from './Saver/Saver';

function Draw () {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {

        setTool("pen:pen");

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
    const [color, setColor] = useState({r: 0, g: 0, b: 0, a: 1}
);

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
    const setColorRequest = (color) => {
        setColor(color);
    }


    const [LoaderEnable, setLoaderEnable] = useState(false);
    const [saverEnable, setSaverEnable] = useState(true);
    
    const [saveHistory, setSaveHistory] = useState([]);

    const sendHistory = (history) => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL("image/png");
        setSaveHistory({history: history, drawImg: dataURL});
    }

    return(
        <>
            
            <SideTools setToolRequest={setToolRequest} setSaverEnable={setSaverEnable}/>
            <TopTools tool={tool} setToolRequest={setToolRequest} setSizeRequest={setSizeRequest} addSizeRequest={addSizeRequest} size={size} setColorRequest={setColorRequest} color={color}/>
            <Canvas
                width={windowSize.width}
                height={windowSize.height}
                background={false}
                border={false}
                ref={canvasRef}
                tool={tool}
                size={size}
                color={color}
                onMouseMove={() => setCusorEnable(true)}
                onMouseLeave={() => setCusorEnable(false)}
                sendHistory={sendHistory}
            ></Canvas>
            {cursorEnable && (<Cursor size={size} />)}
            {LoaderEnable && (<Loader setLoaderEnable={setLoaderEnable}/>)}
            {saverEnable && (<Saver setSaverEnable={setSaverEnable} saveHistory={saveHistory}/>)}
        </>
    )
}
export default Draw;
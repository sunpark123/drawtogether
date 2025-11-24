import { useCallback, useEffect, useRef, useState } from 'react';
import Canvas from '../Canvas/Canvas';
import SideTools from './ToolMenu/SideTools/SideTools';
import TopTools from './ToolMenu/TopTools/TopTools';
import Cursor from '../Canvas/Cursor';
import Loader from './Lodaer/Loader';
import Saver from './Saver/Saver';
import { useNavigate } from 'react-router-dom';
import { userSessionCheck } from '../Api';

function Draw () {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const navigate = useNavigate();

    useEffect(() => {
		(async () => {
			const { success } = await userSessionCheck();
			if (!success) {
				navigate("/login");
			}
		})();
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
    const [tool, setTool] = useState("pen:pen");
    const [size, setSize] = useState(5);
    const [color, setColor] = useState({r: 0, g: 0, b: 0, a: 1});

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


    const [loaderEnable, setLoaderEnable] = useState(false);
    const [saverEnable, setSaverEnable] = useState(false);
    
    const [saveHistory, setSaveHistory] = useState(null);
    
    const sendHistory = useCallback((history) => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL("image/png");

        setSaveHistory({ history, drawImg: dataURL });
    }, []);

    const [loadHistory, setLoadHistory] = useState([]);

    const setLoadHistoryRequest = (history) => {
        if(loadHistory === history) return;
        
        setLoadHistory(history);
        sendHistory(history);
    }
    return(
        <>
            
            <SideTools setToolRequest={setToolRequest} setSaverEnable={setSaverEnable} saverEnable={saverEnable} setLoaderEnable={setLoaderEnable} loaderEnable={loaderEnable}/>
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
                loadHistory={loadHistory}
            ></Canvas>
            {cursorEnable && (<Cursor size={size} />)}
            {loaderEnable && (<Loader setLoaderEnable={setLoaderEnable} setLoadHistoryRequest={setLoadHistoryRequest}/>)}
            {saverEnable && (<Saver setSaverEnable={setSaverEnable} saveHistory={saveHistory}/>)}
        </>
    )
}
export default Draw;
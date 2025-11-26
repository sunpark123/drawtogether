import { useCallback, useEffect, useRef, useState } from 'react';
import Canvas from '../Canvas/Canvas';
import SideTools from './ToolMenu/SideTools/SideTools';
import TopTools from './ToolMenu/TopTools/TopTools';
import Cursor from '../Canvas/Cursor';
import Loader from './Lodaer/Loader';
import Saver from './Saver/Saver';
import { useNavigate } from 'react-router-dom';
import { userSessionCheck } from '../Api';
import { encode, decode } from "@msgpack/msgpack";
import { useWebSocket } from '../WebSocket';
import pako from 'pako';
import { useParams } from "react-router-dom";
import MultiManager from '../MultiManager/MultiManager';
function Draw () {
    const { roomId } = useParams();
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

 
    const setLoadHistoryRequest = useCallback((history) => {
        setLoadHistory(history);
        sendHistory(history);
    }, [sendHistory]); 

    function compressHistory(history) {
        const dict = [];
        const dictIndex = {};

        function getToolId(tool) {
            if (dictIndex[tool] != null) return dictIndex[tool];
            const id = dict.length;
            dict.push(tool);
            dictIndex[tool] = id;
            return id;
        }

        const data = history.map(item => {
            return [
                getToolId(item.tool),
                item.size,
                [item.color.r, item.color.g, item.color.b, item.color.a], 
                item.path.flatMap(p => [p.x, p.y])
            ];
        });

        const packed = encode({ dict, data }); 

        const compressed = pako.gzip(packed, { to: 'uint8array' });
        const base64 = btoa(String.fromCharCode(...compressed));

        return base64;
    }
    function decompressHistory(base64) {
            const compressed = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
            const packed = pako.ungzip(compressed);
            const { dict, data } = decode(packed);
            return data.map(entry => {
                const [toolId, size, [r, g, b, a], flat] = entry;
    
                const path = [];
                for (let i = 0; i < flat.length; i += 2) {
                path.push({ x: flat[i], y: flat[i + 1] });
                }
    
                return {
                tool: dict[toolId],
                size,
                color: { r, g, b, a },
                path
                };
            });
        }
    
    
    const { addHistory, sendDraw, userMouse, sendMousePos, allHistory, message, sendMessage } = useWebSocket(roomId ? roomId : null);
    const returnHistory = (history) => {
        const historyZip = compressHistory(history);
        sendDraw(historyZip);
    }
    const returnMousePos = (pos) => {
        sendMousePos(pos)
    }
    useEffect(() => {
        if(!allHistory) return;
        if(allHistory.length === 0) return;


        const decodeHistory = allHistory[0].map(item => 
            decompressHistory(item.history)
        );
        const newHistory = decodeHistory.flat();
        
        setLoadHistoryRequest(newHistory);
        
    }, [allHistory, setLoadHistoryRequest])

    return(
        <>
            <SideTools setToolRequest={setToolRequest} setSaverEnable={setSaverEnable} saverEnable={saverEnable} setLoaderEnable={setLoaderEnable} loaderEnable={loaderEnable}/>
            <TopTools tool={tool} setToolRequest={setToolRequest} setSizeRequest={setSizeRequest} addSizeRequest={addSizeRequest} size={size} setColorRequest={setColorRequest} color={color}/>
            <Canvas
                {...(roomId && { returnHistory })}
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
                addHistory={addHistory}
            ></Canvas>
            {cursorEnable && (<Cursor size={size} {...(roomId && { returnMousePos })} {...(userMouse && { userMouse })}/>)}
            {loaderEnable && (<Loader setLoaderEnable={setLoaderEnable} setLoadHistoryRequest={setLoadHistoryRequest}/>)}
            {saverEnable && (<Saver setSaverEnable={setSaverEnable} saveHistory={saveHistory}/>)}
            {roomId && (<MultiManager message={message} sendMessage={sendMessage}></MultiManager>)}
        </>
    )
}
export default Draw;
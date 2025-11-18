import { useState, useEffect, useRef, useCallback, useImperativeHandle  } from 'react';

function Canvas( {width=200, height=200, borderRadius, ref, background=true, border=true, tool = "pen", size = 5, onMouseMove, onMouseLeave }) {

    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);

    const [history, setHistory] = useState([]);
    const [, setUndoHistory] = useState([]);
    const [currentStroke, setCurrentStroke] = useState(null);

    useImperativeHandle(ref, () => canvasRef.current);
    
    const [line, setLine] = useState()


    const startDrawing = (e) => {
        setDrawing(true);
        
        let dx = e.nativeEvent.offsetX;
        let dy = e.nativeEvent.offsetY

        if(tool === "line") setLine([{sx: dx, sy: dy}, {ex: dx+1, ey: dy+1}]);

        if(tool === "pen" || tool === "eraser") setCurrentStroke({ tool: tool, color: "black", size: size, path: [{ x: dx, y: dy, }, {x: dx+1, y: dy+1}] });
    };

    const draw = (e) => {
        if (!drawing) return;

        let dx = e.nativeEvent.offsetX;
        let dy = e.nativeEvent.offsetY
        

        if(tool === "line") setLine(([start, end]) => [start, { ex: dx, ey: dy }]);

        if(tool === "pen" || tool === "eraser") setCurrentStroke(s => ({ ...s, path: [...s.path, { x: dx, y: dy }] }));
    };
    const stopDrawing = () => {
        setDrawing(false);
        setHistory(h => [...h, currentStroke]);
        setCurrentStroke(null);
        console.log(line);
    }
    const reDrawCanvas = useCallback(() => {
        const ctx = canvasRef.current.getContext("2d");
        if(background) {
            ctx.fillStyle = "white"; 
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        else {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        

        
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
        
    }, [history, currentStroke, background]);
    
    useEffect(() => {
        reDrawCanvas();
    }, [reDrawCanvas]);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.code === "KeyZ") {
                event.preventDefault();
                drawUndo();
            }
            if ((event.ctrlKey || event.metaKey) && event.code === "KeyY") {
                event.preventDefault();
                drawRedo();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, []);
    const drawUndo = () => {
        setHistory(prev => {
            if (prev.length === 0) return prev; 

            const newHistory = [...prev]; 

            const last = newHistory.pop();
            setUndoHistory(pr => [...pr, last]);

            return newHistory;
        });
    }
    const drawRedo = () => {
        setUndoHistory(prev => {
            if (prev.length === 0) return prev;
            
            const newHistory = [...prev];
            
            const last = newHistory.pop();
            setHistory(h => [...h, last]);

            return newHistory;
        })
    }



   

    return (
        <canvas
            className='drawCanvas'
            width={width}
            height={height}
            style={{
                backgroundColor: 'transparent',
                width: width,
                height: height,
                borderRadius: borderRadius,
                border: border ? "1px solid black" : "none",
                cursor: "none",
            }}
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={(e) => {draw(e); onMouseMove();}}
            onMouseUp={stopDrawing}
            onMouseLeave={() => onMouseLeave()}
        >
        </canvas>
    )
}

export default Canvas;
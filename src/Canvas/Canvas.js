import { useState, useEffect, useRef, useCallback, useImperativeHandle  } from 'react';


function Canvas( { returnHistory=null, width=200, height=200, borderRadius, ref }) {

    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);

    const [history, setHistory] = useState([]);
    const [currentStroke, setCurrentStroke] = useState(null);

    useImperativeHandle(ref, () => canvasRef.current);

    const startDrawing = (e) => {
        setDrawing(true);
        
        let dx = e.nativeEvent.offsetX;
        let dy = e.nativeEvent.offsetY
        setCurrentStroke({ tool: "pen", color: "black", size: 5, path: [{ x: dx, y: dy, }, {x: dx+1, y: dy+1}] });
        
    };

    const draw = (e) => {
        if (!drawing) return;

        let dx = e.nativeEvent.offsetX;
        let dy = e.nativeEvent.offsetY
        
        setCurrentStroke(s => ({ ...s, path: [...s.path, { x: dx, y: dy }] }));
    };

    const stopDrawing = () => {
        setDrawing(false);
        setHistory(h => [...h, currentStroke]);
        setCurrentStroke(null);
    }

    const reDrawCanvas = useCallback(() => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = "white"; 
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

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
        
    }, [history, currentStroke]);
    useEffect(() => {
        if(!returnHistory) return;
        returnHistory(history);
    }, [history])
    useEffect(() => {
        reDrawCanvas();
    }, [reDrawCanvas]);


    return (
        <canvas
            className='drawCanvas'
            width={width}
            height={height}
            style={{
                width: width,
                height: height,
                borderRadius: borderRadius
            }}
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
        >
        </canvas>
    )
}

export default Canvas;
import Cursor from './Cursor';
import './Draw.css'
import React, { useRef, useEffect, useState } from "react";


function Draw( {tool, size} ) {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState();

    const [history, setHistory] = useState([]);
    const [undoHistory, setUndoHistory] = useState([]);
    const [currentStroke, setCurrentStroke] = useState(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight;

        const handleResize = () => {
            canvas.width = window.innerWidth; 
            canvas.height = window.innerHeight;
        };


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

        window.addEventListener("resize", handleResize);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        reDrawCanvas();
    }, [history, currentStroke]);

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
    const startDrawing = (e) => {
        setDrawing(true);
        
        let dx = e.nativeEvent.offsetX;
        let dy = e.nativeEvent.offsetY
        
        setCurrentStroke({ tool: tool, color: "black", size: size, path: [{ x: dx, y: dy, }, {x: dx+1, y: dy+1}] });
        
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

    const reDrawCanvas = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const drawStroke = (drawInfo) => {
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
    };

    

	return (
		<>
            <div className="draw">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                />
                <Cursor size={size}/>
            </div>
            
		</>
	);
}

export default Draw;

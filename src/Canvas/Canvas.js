import { useState, useEffect, useRef, useCallback, useImperativeHandle, useMemo  } from 'react';

function Canvas( {width=200, height=200, borderRadius, ref, background=true, border=true, tool = "pen", size = 5, color="black", onMouseMove, onMouseLeave, sendHistory=null, loadHistory=null }) {

    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);

    const [history, setHistory] = useState([]);
    const [, setUndoHistory] = useState([]);
    const [currentStroke, setCurrentStroke] = useState(null);

    useImperativeHandle(ref, () => canvasRef.current);

 

    useEffect(() => { setHistory(loadHistory);}, [loadHistory] )

    useEffect(() => {if(sendHistory !== null) sendHistory(history)},[history, sendHistory])

    

    const pencil = useMemo(() => {
        const img = new Image();
        img.src = 'DrawTool/Pen/a.png';
        return img;
    }, []);

    const startDrawing = (e) => {
        setDrawing(true);
        setUndoHistory([]);
        let dx = e.nativeEvent.offsetX;
        let dy = e.nativeEvent.offsetY
        if(tool.includes("line")) setCurrentStroke({ tool: tool, color: color, size: size, path: [{ x: dx, y: dy, }, {x: dx, y: dy}] });
        if(tool.includes("pen") || tool === "eraser") setCurrentStroke({ tool: tool, color: color, size: size, path: [{ x: dx, y: dy, }, {x: dx+1, y: dy+1}] });
    };

    const draw = (e) => {
        if (!drawing) return;

        let dx = e.nativeEvent.offsetX;
        let dy = e.nativeEvent.offsetY
        

        if(tool.includes("line")) setCurrentStroke(s => ({ ...s, path: [s.path[0], { x: dx, y: dy }] }));

        if(tool.includes("pen") || tool === "eraser") setCurrentStroke(s => ({ ...s, path: [...s.path, { x: dx, y: dy }] }));
    };
    const stopDrawing = () => {
        setDrawing(false);
        setHistory(h => [...h, currentStroke]);
        setCurrentStroke(null);
        
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
            
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

            if (tool === "eraser") {
                ctx.globalCompositeOperation = "destination-out";
                ctx.strokeStyle = "rgba(0,0,0,1)";
            } 
            else if (tool.includes("pen")) {
                const subTool = tool.split(":")[1];
                
                if(subTool === "pencil") {
                    const pattern = ctx.createPattern(pencil ,'repeat');
                    ctx.strokeStyle = pattern;
                }
                if(subTool === "highlighter") {
                    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`;
                }
            }
            


            if(tool.includes("pen") || tool === "eraser"){
                ctx.moveTo(paths[0].x, paths[0].y);
                paths.forEach((p) => {
                    ctx.lineTo(p.x, p.y);
                });
                ctx.stroke();
            }   
            if(tool.includes("line")){
                const subTool = tool.split(":")[1];
                const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = paths;

                const drawMap = {
                    line: () => {
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    },
                    square: () => {
                        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
                    },
                    triangle: () => {
                        const midX = (x1 + x2) / 2;
                        ctx.moveTo(midX, y1);
                        ctx.lineTo(x2, y2);
                        ctx.lineTo(x1, y2);
                        ctx.lineTo(midX, y1);
                        ctx.stroke();
                    }
                };

                drawMap[subTool]?.();

            }
        };

        history.forEach(drawInfo => {drawStroke(drawInfo)});
        if (currentStroke) drawStroke(currentStroke); 
        
    }, [history, currentStroke, background, pencil]);
    




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
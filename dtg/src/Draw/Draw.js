import './Draw.css'
import React, { useRef, useEffect, useState } from "react";


function Draw() {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [drawList, setDrawList] = useState([{
        x: 0,
        y: 0,
        penSize: 0
    }]);
    const [stepDrawList, setStepDrawList] = useState([]);
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight;

        const handleResize = () => {
            canvas.width = window.innerWidth; 
            canvas.height = window.innerHeight;
        };


        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                console.log(stepDrawList);
                stepDrawList[stepDrawList.length - 1].map((drawList) => {
                    const ctx = canvasRef.current.getContext("2d");
                    ctx.clearRect(drawList.x, drawList.y, drawList.penSize, drawList.penSize);
                });
                console.log("Escape 키가 눌렸습니다!");
            }
            if (event.key === "Escape") {
                console.log("Escape 키가 눌렸습니다!");
            }
            
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    const startDrawing = (e) => {
        const ctx = canvasRef.current.getContext("2d");
        setDrawing(true);
        ctx.beginPath();

        let dx = e.nativeEvent.offsetX;
        let dy = e.nativeEvent.offsetY
        ctx.moveTo(dx, dy);
        setDrawList([{ x: dx, y: dy, penSize: 5 }]);
    };

    const draw = (e) => {
        if (!drawing) return;
        const ctx = canvasRef.current.getContext("2d");
        let dx = e.nativeEvent.offsetX;
        let dy = e.nativeEvent.offsetY
        ctx.lineTo(dx, dy);
        ctx.lineWidth = 5;
        ctx.stroke();

        setDrawList(prev => [...prev, { x: dx, y: dy, penSize: 5 }]);
    };

    const stopDrawing = () => {
        setDrawing(false);
        setStepDrawList(prev => [...prev, drawList]);
    }


    

	return (
		<>
            <div className="draw">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                />
            </div>
		</>
	);
}

export default Draw;

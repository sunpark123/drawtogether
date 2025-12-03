import { useState, useEffect } from "react";

function Cursor( { size, returnMousePos, userMouse } ) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [penCursorImagePath] = useState("cursor.png")

    useEffect(() => {
        const handleMove = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    useEffect(() => {
        if(!returnMousePos) return;

        const timer = setTimeout(() => {
            returnMousePos(pos);
        }, 100);

        return () => clearTimeout(timer);
    }, [pos,returnMousePos]);
    return (
        <>
            <div
                style={{
                    position: "fixed",
                    left: pos.x,
                    top: pos.y,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundImage: `url('/${penCursorImagePath}')`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    pointerEvents: "none",
                    outline: "1px solid gray",
                    borderRadius: "100%",
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.2s ease, height 0.2s ease",
                    zIndex: "200"
                }}
            >
                
            </div>
            {(returnMousePos) && userMouse.map((mouse) => (
                <div
                    style={{
                        position: "fixed",
                        left: mouse.mousePos.x,
                        top: mouse.mousePos.y,
                        width: `15px`,
                        height: `15px`,
                        backgroundImage: `url('/${penCursorImagePath}')`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        pointerEvents: "none",
                        outline: "1px solid gray",
                        borderRadius: "100%",
                        transform: "translate(-50%, -50%)",
                        transition: "width 0.2s ease, height 0.2s ease",
                        zIndex: "200",
                    }}
                > 
                    <div className="who" style={{
                        position:"absolute",
                        top:"-100%",
                        left:"100%",
                        transform:"translateY(-100%)",
                        border: "1px solid black",
                        borderRadius: "15px",
                    }}>
                        <p style={{
                            margin: "0",
                            padding: "5px"
                        }}>{mouse.userId}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Cursor;

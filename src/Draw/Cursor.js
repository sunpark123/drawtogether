import { useState, useEffect } from "react";

function Cursor( { size } ) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [penCursorImagePath] = useState("cursor.png")

    useEffect(() => {
        const handleMove = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
         
          
        };

        window.addEventListener("mousemove", handleMove);

        

        return () => window.removeEventListener("mousemove", handleMove);
    }, []);


    return (
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
            }}
        />
    );
}

export default Cursor;

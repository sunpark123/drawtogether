import './SideTools.css'

function SideTools( {setToolRequest} ){

    const setTool = (toolName) =>{
        setToolRequest(toolName);
    }

    return (
        <>
            <div className="SideTools">
                <div className='tool' onClick={() => setTool("pen")}>
                    <img src='basicProfileImage.png' alt='tool/pen'></img>
                </div>
                <div className='tool' onClick={() => setTool("eraser")}>
                    <img src='basicProfileImage.png' alt='tool/eraser'></img>
                </div>
            </div>
        </>
    );  
}

export default SideTools;
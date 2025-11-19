import './SideTools.css'

function SideTools( {setToolRequest, setSaverEnable} ){

    const setTool = (toolName) =>{
        setToolRequest(toolName);
    }

    return (
        <>
            <div className="SideTools">
                <div className='tool' onClick={() => setTool("pen:pen")}>
                    <img src='/DrawTool/SideTool/tool_pen.png' alt='tool/pen'></img>
                </div>
                <div className='tool' onClick={() => setTool("eraser")}>
                    <img src='/DrawTool/SideTool/tool_eraser.png' alt='tool/eraser'></img>
                </div>
                <div className='tool' onClick={() => setTool("line:line")}>
                    <img src='/DrawTool/SideTool/tool_diagram.png' alt='tool/eraser'></img>
                </div>
                <div className='tool' onClick={() => setSaverEnable(true)}>
                    <img src='/DrawTool/SideTool/tool_diagram.png' alt='tool/eraser'></img>
                </div>
                

           
            </div>
        </>
    );  
}

export default SideTools;
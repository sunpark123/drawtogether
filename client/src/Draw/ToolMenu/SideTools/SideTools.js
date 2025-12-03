import './SideTools.css'
import { useState } from 'react';
import GoHomeChecker from '../../Saver/GoHomeChecker';

function SideTools( {setToolRequest, setSaverEnable, saverEnable, setLoaderEnable, loaderEnable, set} ){

    const setTool = (toolName) =>{
        setToolRequest(toolName);
    }

    const [goHomeChecker, setGoHomeChecker] = useState(false)

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
                <div className='a' style={{position:"absolute", top:"100%", transform:'translateY(-100%)'}}>
                    <div className='tool' onClick={() => setGoHomeChecker(true)}>
                        <img src='/DrawTool/SideTool/home.png' alt='tool/eraser'></img>
                    </div>
                    <div className='tool' onClick={() => {setSaverEnable(!saverEnable); setLoaderEnable(false);}}>
                        <img src='/DrawTool/SideTool/tool_save.png' alt='tool/eraser'></img>
                    </div>
                    <div className='tool' onClick={() => {setLoaderEnable(!loaderEnable); setSaverEnable(false);}}>
                        <img src='/DrawTool/SideTool/tool_load.png' alt='tool/eraser'></img>
                    </div>
                </div>
                {goHomeChecker && <GoHomeChecker setGoHomeChecker={setGoHomeChecker} />}
           
            </div>
        </>
    );  
}

export default SideTools;
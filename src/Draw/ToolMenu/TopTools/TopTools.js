import { useEffect, useRef, useState } from 'react';
import './TopTools.css'
import { SubtoolProvider, useSubtool } from './SubtoolProvider';
import { SketchPicker, GithubPicker, HuePicker, AlphaPicker } from "react-color";
import { l } from '../../../language';
function TopTools( {tool, setSizeRequest, addSizeRequest, size, setToolRequest, setColorRequest, color}  ){

    const [allColorSelectorEnable, setAllColorSelectorEnable] = useState(false);

    const changeColor = (selectedColor) => {
        setColorRequest(selectedColor.rgb);
    }

    const [intervalId, setIntervalId] = useState(null);
    const sizeRef = useRef(size);

    useEffect(() => {
        sizeRef.current = size;
    }, [size]);

    const changeSize = (delta) => {
        if (sizeRef.current + delta < 1) return;
        if (sizeRef.current + delta > 100) return;

        addSizeRequest(delta);
    };

    const handleMouseDown = (delta) => {
        const id = setInterval(() => {
            changeSize(delta);
        }, 150);
        setIntervalId(id);
    };

    const handleMouseUp = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };
    const sizeTool = () => {
        return (
            <>
                <div className='tool' id='sizeP'>
                    <p>{l("top_tool_size")} : ({size})</p>
                </div>
                <div className='tool'>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        value={size}
                        onChange={(e) => setSizeRequest(Number(e.target.value))}
                    />
                </div>
                <div className='tool' id='toolSizeI'
                    onClick={() => changeSize(+1)}
                    onMouseDown={() => handleMouseDown(+1)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <img
                        src="/DrawTool/Size/toolSizePlus.png"
                        alt="tool/size/plus"
                    />
                </div>
                <div className='tool'>
                    <p>/</p>
                </div>
                <div className='tool' id='toolSizeI'
                    onClick={() => changeSize(-1)}
                    onMouseDown={() => handleMouseDown(-1)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <img
                        src="/DrawTool/Size/toolSizeMinus.png"
                        alt="tool/size/minus"
                    />
                </div>
                <div className='panel'></div>
            </>
        )
    }

    const SubToolButton = ({ imgSrc, imgAlt = "tool", toolName }) => {
        const { selectedSubtool, setSelectedSubtool } = useSubtool();

        const handleClick = () => {
            setSelectedSubtool(toolName);
            setToolRequest(toolName)
        };

        return (
            <div
                className="tool"
                id="toolSizeI"
                onClick={handleClick}
                style={{
                    backgroundColor: selectedSubtool === toolName && "rgba(145, 196, 253, 1)"
                }}
            >
            <img src={imgSrc} alt={imgAlt} />
            </div>
        );
    };

    const ColorSetter = () => {
        return (
            <div className='tool' style={{float:"right", marginRight:"10px"}}>
                <div className='tool'>
                    <div className='tool' id='color'>
                        <HuePicker color={color} onChange={changeColor}/>
                        
                    </div>
                    <div className='tool' id='color'>
                        <AlphaPicker color={color} onChange={changeColor}/>
                    </div>
                </div>
                <div className='tool' id='gitColor' style={{marginTop:"7px"}}>
                    <GithubPicker color={color} onChange={changeColor} triangle={'hide'} colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB']}></GithubPicker>
                </div>
                <div className='tool' style={{position:"relative", marginLeft:"15px"}} >
                    <div className='colorBack' 
                        style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}
                        onClick={() => setAllColorSelectorEnable(!allColorSelectorEnable)}>
                    </div>
                    {allColorSelectorEnable && (
                        <div className='colorTool'>
                            <SketchPicker color={color} onChange={changeColor} presetColors={[]}/>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="TopTools">
                <div className='toolB' style={{width:"60px"}}><p>{l("top_tool_tool")}</p></div>
                {sizeTool()}
                <SubtoolProvider>
                {tool.includes("pen") && (
                    <>
                        <SubToolButton imgSrc="/DrawTool/SideTool/tool_pen.png" toolName="pen:pen" />
                        <SubToolButton imgSrc="/DrawTool/Pen/highlighter.png" toolName="pen:highlighter" />
                        
                        {ColorSetter()}
                    </>
                )}
                {tool.includes("line") && (
                    <>
                        <SubToolButton imgSrc="/DrawTool/Line/line_line.png" toolName="line:line" />
                        <SubToolButton imgSrc="/DrawTool/Line/line_square.png" toolName="line:square" />
                        <SubToolButton imgSrc="/DrawTool/Line/line_triangle.png" toolName="line:triangle" />
                        
                        {ColorSetter()}
                    </>
                )}
                </SubtoolProvider>
            </div>
        </>
    );  
}

export default TopTools;
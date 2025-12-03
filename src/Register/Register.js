import { useState, useEffect, useRef } from 'react';
import './Register.css';
import { requestCheckCode, requestMakeCode, saveUserProfileImage, userRegister, userSessionCheck } from '../Api';
import { useNavigate } from 'react-router-dom';
import Canvas from '../Canvas/Canvas';
import { l } from '../language';
import LanguageSetter from '../LanguageSetter/LanguageSetter';
import Cursor from '../Canvas/Cursor';


function Register( ) {
    
    const [reloadKey, setReloadKey] = useState(0);
    const [, setUserProfileImageURL] = useState('/basicProfileImage.png')
    


    const navigate = useNavigate();
    useEffect(() => {
		(async () => {
			const { success } = await userSessionCheck();
			if (success) {
				navigate("/lobby");
			}
		})();
	},[navigate]);


    const [left, setLeft] = useState(50);
    useEffect(() => {
        setLeft(30);
    },[])

  

    const [errorMesage, setErrorMessage] = useState("");

    const userIdRef = useRef(null);
    const userNameRef = useRef(null);
    const userPasswordRef = useRef(null);
    const canvasRef = useRef();

    const registerRequest = async (e) => {
        e.preventDefault();

        if(!codeChecked) return;

        const userId = userIdRef.current.value;
        const userName = userNameRef.current.value;
        const userPassword = userPasswordRef.current.value;

        if(userId.includes("_")) {setErrorMessage(l("errorMessage_id_short")); return}
        if(userId.length < 3) {setErrorMessage(l("errorMessage_id_short")); return}
        if(userName.length < 1) {setErrorMessage(l("errorMessage_name_short")); return}
        if(userPassword.length < 7) {setErrorMessage(l("errorMessage_password_short")); return}

        const result = await userRegister(userId, userPassword, userName, mailInput);

        if(result.success) {
            saveCanvasImage();
            window.location.href = "/lobby";
        }
        else{
            setErrorMessage(result.error);
        }
    }
    
    const saveCanvasImage = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL("image/png");
        setUserProfileImageURL(dataURL);

        saveUserProfileImage(dataURL);
    }
    
    const [cursorEnable, setCusorEnable] = useState(false);


    const [codeChecked, setCodeChecked] = useState(false);
    const [reqeustMailCheck, setRequestMailCheck] = useState(false)
    const [mailInput, SetMailInput] = useState("");
    const codeRef = useRef(null);

    const requestMailVerification = () => {
        setErrorMessage("");
        codeRef.current.value = "";
        setRequestMailCheck(true);
        (async () => {
			const { success, errorMessage="error_unknown" } = await requestMakeCode(mailInput);
			if (success) {
				setRequestMailCheck(true);
			}
            else{
                setRequestMailCheck(false);
                setErrorMessage(l(errorMessage));
            }
		})();
    }
    const checkCode = () => {
        setErrorMessage("");
        (async () => {
			const { success, errorMessage="error_unknown" } = await requestCheckCode(mailInput, codeRef.current.value);
			if (success) {
				setCodeChecked(true);
			}
            else{
                setErrorMessage(l(errorMessage));
            }
		})();
    }
    return (
        <>
            <LanguageSetter />
            {cursorEnable && (<Cursor size={5} />)}
            <div className="Login">
                <div className='textBox' style={{left: `${left}%`}}>
					<span>D</span><span>r</span><span>a</span><span>w</span> <br></br>
					<span id='spanT'>T</span><span>o</span> <br></br>
					<span>G</span><span>e</span><span>t</span><span>h</span><span>e</span><span>r</span>
					<span>!</span>
				</div>
                <div className='registerBox'>
                    <div className='type'>
                        <p style={{whiteSpace: 'nowrap'}}>{l("form_type_register")}</p>
                    </div>
                    <div className='loginInput'>
                        <form method='post' onSubmit={registerRequest}>
                            <div className='drawInfo'>
                                <div className='semo'></div>
                                <p>{l("register_text_profile_draw")}</p>
                            </div>
                            <div className='reDraw' onClick={() => setReloadKey(prev => prev + 1)}>
                                <p>{l("register_text_profile_re_draw")}</p>
                            </div>
                            <Canvas
                                key={reloadKey}
                                width={200} 
                                height={200} 
                                borderRadius={100} 
                                ref={canvasRef}
                                onMouseMove={() => setCusorEnable(true)}
                                onMouseLeave={() => setCusorEnable(false)}
                            />
                            <div className='Input'>
                                <input placeholder=" " required type='text' ref={userNameRef}></input>
                                <p>{l("input_name")}</p>
                            </div>
                            <div className='Input'>
                                <input placeholder=" " required type='text' ref={userIdRef}></input>
                                <p>{l("input_userId")}</p>
                            </div>
                            <div className='Input'>
                                <input placeholder=" " required type='password' ref={userPasswordRef}></input>
                                <p>{l("input_userPassword")}</p>
                            </div>
                            
                            <div className='Input'>
                                <input
                                    placeholder=" "
                                    style={{ right: codeChecked ? "0px" : "90px" }}
                                    type="text"
                                    value={mailInput}
                                    onChange={(e) => {if(!reqeustMailCheck) {SetMailInput(e.target.value)}}}
                                    required
                                />
                                <p>{l("input_mail")}</p>
                                {!codeChecked && (
                                    <button type='button' onClick={() => requestMailVerification()}>
                                        {!reqeustMailCheck ? "인증" : "재전송"}
                                    </button>
                                )}
                                
                            </div>
                            <div className='Input' style={{visibility: (reqeustMailCheck ? "visible" : "hidden")}}> 
                                <input placeholder=" " ref={codeRef} style={{ right: codeChecked ? "0px" : "90px" }} required type='text'></input>
                                <p>{l("input_code")}</p>
                                {!codeChecked && (
                                    <button type='button' onClick={() => checkCode()}>확인</button>
                                )}
                            </div>
                            



                            <div className='Error'>
                                <p>{errorMesage}</p>
                            </div>
                            <div className='Submit'>
                                {codeChecked ? (
                                    <button type='submit'>{l("register_button")}</button>
                                ) : (
                                    <button type='button' style={{backgroundColor:"lightgray" , cursor:"not-allowed"}}>{l("register_button")}</button>
                                )}
                            </div>
                        </form>
                        <div className='Register'>
                            <a href='/login'>{l("or_login_button")}</a>
                            <p>{l("or_login_text")}</p>
                        </div>

                    
                    </div>
      
                </div>
            </div>
        </>
    );
}

export default Register;

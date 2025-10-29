import { useState, useEffect, useRef, useImperativeHandle } from 'react';
import './Register.css';
import { saveUserProfileImage, userRegister, userSessionCheck } from '../Api';
import { data, useNavigate } from 'react-router-dom';
import Canvas from '../Canvas/Canvas';

function Register( ) {

    const [reloadKey, setReloadKey] = useState(0);
    const [, setUserProfileImageURL] = useState('/basicProfileImage.png')
    


    const navigate = useNavigate();
    useEffect(() => {
		(async () => {
			const { success } = await userSessionCheck();
			if (success) {
				navigate("/logined");
			}
		})();
	});


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

        

        const userId = userIdRef.current.value;
        const userName = userNameRef.current.value;
        const userPassword = userPasswordRef.current.value;

        if(userId.includes("_")) {setErrorMessage("아이디에 언더바 사용 금지."); return}
        if(userId.length < 3) {setErrorMessage("아이디는 4글자 이상이여야 합니다."); return}
        if(userName.length < 1) {setErrorMessage("이름은 2글자 이상이여야 합니다."); return}
        if(userPassword.length < 7) {setErrorMessage("비밀번호는 8글자 이상이여야 합니다."); return}

        const result = await userRegister(userId, userPassword, userName);

        if(result.success) {
            saveCanvasImage();
            window.location.href = "/logined";
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
    


    return (
        <>
            <div className="Login">
                <div className='textBox' style={{left: `${left}%`}}>
					<span>D</span><span>r</span><span>a</span><span>w</span> <br></br>
					<span id='spanT'>T</span><span>o</span> <br></br>
					<span>G</span><span>e</span><span>t</span><span>h</span><span>e</span><span>r</span>
					<span>!</span>
				</div>
                <div className='registerBox'>
                    <div className='type'>
                        <p style={{whiteSpace: 'nowrap'}}>Create Account</p>
                    </div>
                    <div className='loginInput'>
                        <form method='post' onSubmit={registerRequest}>
                            <div className='drawInfo'>
                                <div className='semo'></div>
                                <p>프로필 그리기</p>
                            </div>
                            <div className='reDraw' onClick={() => setReloadKey(prev => prev + 1)}>
                                <p>다시하기</p>
                            </div>
                            <Canvas
                                key={reloadKey}
                                width={200} 
                                height={200} 
                                borderRadius={100} 
                                ref={canvasRef}
                            />
                            <div className='Input'>
                                <input placeholder=" " required type='text' ref={userNameRef}></input>
                                <p>User Name</p>
                            </div>
                            <div className='Input'>
                                <input placeholder=" " required type='text' ref={userIdRef}></input>
                                <p>UserId</p>
                            </div>
                            <div className='Input'>
                                <input placeholder=" " required type='password' ref={userPasswordRef}></input>
                                <p>PassWord</p>
                            </div>
                            
                            <div className='Error'>
                                <p>{errorMesage}</p>
                            </div>
                            <div className='Submit'>
                                <button type='submit'>회원가입</button>
                            </div>
                        </form>
                        <div className='Register'>
                            <a href='/login'>Sign in</a>
                            <p>Already have an account?</p>
                        </div>

                    
                    </div>
      
                </div>
            </div>
        </>
    );
}

export default Register;

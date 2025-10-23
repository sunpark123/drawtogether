import { useState, useEffect, useRef } from 'react';
import './Login.css';
import { GET_SERVER_URL, userLogin, userSessionCheck } from '../Api';
import { useNavigate } from 'react-router-dom';

function Login( ) {
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

    const goGoogleoAuth = () => {
        window.location.href = `${GET_SERVER_URL()}oauth2/authorization/google`;
    }

    const [errorMesage, setErrorMessage] = useState("");

    const userIdRef = useRef(null);
    const userPasswordRef = useRef(null);

    const loginRequest = async (e) => {
        e.preventDefault();

        const userId = userIdRef.current.value;
        const userPassword = userPasswordRef.current.value;

        if(userId.length < 3) {setErrorMessage("아이디는 4글자 이상이여야 합니다."); return}
        if(userPassword.length < 7) {setErrorMessage("비밀번호는 8글자 이상이여야 합니다."); return}

        const result = await userLogin(userId, userPassword);

        if(result.success) {
            window.location.href = "/logined";
        }
        else{
            setErrorMessage(result.error);
        }
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
                <div className='loginBox'>
                    <div className='type'>
                        <p>DrawToGether</p>
                    </div>
                    <div className='loginInput'>
                        <form method='post' onSubmit={loginRequest}>
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
                                <button type='submit'>로그인</button>
                            </div>
                        </form>
                        <div className='Register'>
                            <a href='/register'>Create an Account</a>
                            <p>New to DrawToGether?</p>
                        </div>

                        <div className='or'>
                            <span></span>
                            <p>or</p>
                            <span></span>
                        </div>
                    </div>
                    <div className='otherLogin'>
                        <button onClick={goGoogleoAuth}>
                            <img src='/basicProfileImage.png' alt='googleoAuth2'></img>
                            <p>Login With Google</p>
                        </button>
                        <button>
                            <img src='/basicProfileImage.png' alt='googleoAuth2'></img>
                            <p>Login With Appleasdl</p>
                        </button>
                       
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default Login;

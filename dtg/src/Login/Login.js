import { useRef, useState } from 'react';
import './Login.css';
import { userLogin } from '../Api';
function Login( { moveLocate } ) {

    const [isInput, setIsInput] = useState([false,false]);

    const userIdRef = useRef(null);
    const userPasswordRef = useRef(null);


    const userLoginRequest = (e) => {
        e.preventDefault(); 
        userLogin(userIdRef.current.value, userPasswordRef.current.value);
    }

  return (
        <>
            <div className="Login">
                <form onSubmit={userLoginRequest}>
                    <div className='LoginBox'>
                        <div className={`InputBox ${isInput[0] ? "isInput" : ""}`}>
                            <input onChange={(e) => setIsInput((prev) => {
                                    const newState = [...prev];
                                    newState[0] = e.target.value !== "";
                                    return newState;
                                })}
                                ref={userIdRef}
                            />
                            <p>UserId</p>
                        </div>
                        <div className={`InputBox ${isInput[1] ? "isInput" : ""}`}>
                            <input type='password' onChange={(e) => setIsInput((prev) => {
                                    const newState = [...prev];
                                    newState[1] = e.target.value !== "";
                                    return newState;
                                })}
                                ref={userPasswordRef}
                            />
                            <p>PassWord</p>
                        </div>
                        <div className='InputBox' style={{ marginTop: '30px' }}>
                            <button className='loginButton' type='submit'>로그인</button>
                        </div>

                        <div className='InputBox'>
                            <button className='registerButton' type='button' onClick={() => moveLocate("register")}>회원가입</button>
                        </div>
                        <div className='line'></div>

                        <div className='InputBox oAuth' style={{ marginTop: '50px' }}>
                            <button className='oAuthButton'>로그인</button>
                            <button className='oAuthButton'>로그인</button>
                            <button className='oAuthButton'>로그인</button>
                            <button className='oAuthButton'>로그인</button>
                        </div>

                        
                    </div>
                </form>
            </div>
        </>
	);
}


export default Login;

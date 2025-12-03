import { useRef, useState } from 'react';
import './Login.css';
import { userLogin } from '../Api';
function Login( { moveLocate } ) {

    const [isInput, setIsInput] = useState([false,false]);
    const [errorMessage, setErrorMessage] = useState("");

    const userIdRef = useRef(null);
    const userPasswordRef = useRef(null);


    const userLoginRequest = async (e) => {
        e.preventDefault(); 

        const userId = userIdRef.current.value;
        const userPassword = userPasswordRef.current.value;

        if(userId.length < 3) {setErrorMessage("아이디는 4글자 이상이여야 합니다."); return}
        if(userPassword.length < 7) {setErrorMessage("비밀번호는 8글자 이상이여야 합니다."); return}

        const result = await userLogin(
            userId,
            userPassword
        );

        if(result.success) {
            moveLocate("lobby")
        }
        else{
            setErrorMessage(result.error);
        }
    }

  return (
        <>
            <div className="Login" >
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
                        <div className="ErrorMessage">
                            {errorMessage}
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

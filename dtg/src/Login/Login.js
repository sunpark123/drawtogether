import { useState } from 'react';
import './Login.css';

function Login( { moveLocate } ) {

    const [isInput, setIsInput] = useState([false,false]);

  return (
        <>
            <div className="Login">
                <div className='LoginBox'>
                    <div className={`InputBox ${isInput[0] ? "isInput" : ""}`}>
                        <input onChange={(e) => setIsInput((prev) => {
                                const newState = [...prev];
                                newState[0] = e.target.value !== "";
                                return newState;
                            })}
                        />
                        <p>UserId</p>
                    </div>
                    <div className={`InputBox ${isInput[1] ? "isInput" : ""}`}>
                        <input type='password' onChange={(e) => setIsInput((prev) => {
                                const newState = [...prev];
                                newState[1] = e.target.value !== "";
                                return newState;
                            })}
                        />
                        <p>PassWord</p>
                    </div>
                    <div className='InputBox' style={{ marginTop: '30px' }}>
                        <button type='submit' className='loginButton'>로그인</button>
                    </div>

                    <div className='InputBox'>
                        <button className='registerButton' onClick={() => moveLocate("register")}>회원가입</button>
                    </div>
                    <div className='line'></div>

                    <div className='InputBox oAuth' style={{ marginTop: '50px' }}>
                        <button className='oAuthButton'>로그인</button>
                        <button className='oAuthButton'>로그인</button>
                        <button className='oAuthButton'>로그인</button>
                        <button className='oAuthButton'>로그인</button>
                    </div>

                    
                </div>
            </div>
        </>
	);
}


export default Login;

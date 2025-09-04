import { useState } from 'react';
import './Login.css';

function Register( { moveLocate } ) {

    const [isInput, setIsInput] = useState([false, false, false]);

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
                    <div className={`InputBox ${isInput[2] ? "isInput" : ""}`}>
                        <input onChange={(e) => setIsInput((prev) => {
                                const newState = [...prev];
                                newState[2] = e.target.value !== "";
                                return newState;
                            })}
                        />
                        <p>Name</p>
                    </div>
                    <div className='InputBox' style={{ marginTop: '30px' }}>
                        <button type='submit' className='loginButton'>회원가입</button>
                    </div>

                    <div className='InputBox'>
                        <button className='registerButton' onClick={() => moveLocate("login")}>계정이 있습니다.</button>
                    </div>
                </div>
            </div>
        </>
	);
}


export default Register;

import { useState, useRef, useEffect } from 'react';
import './Login.css';
import { userRegister } from '../Api';

function Register( { moveLocate } ) {

    const [isInput, setIsInput] = useState([false, false, false]);
    const [errorMessage, setErrorMessage] = useState("");
    
    const userIdRef = useRef(null);
    const userPasswordRef = useRef(null);
    const userNameRef = useRef(null);

    useEffect(() => {
        setErrorMessage("");
    }, [])

    const userRegisterRequest = async (e) => {
        e.preventDefault(); 
        
        const userId = userIdRef.current.value;
        const userPassword = userPasswordRef.current.value;
        const userName = userNameRef.current.value;

        if(userId.length < 3) {setErrorMessage("아이디는 4글자 이상이여야 합니다."); return}
        if(userPassword.length < 7) {setErrorMessage("비밀번호는 8글자 이상이여야 합니다."); return}
        if(userName.length < 1) {setErrorMessage("이름은 2글자 이상이여야 합니다."); return}

        const result = await userRegister(
            userId,
            userPassword,
            userName
        );

        if(result.success){
            moveLocate("login");
        }
        else{
            setErrorMessage(result.error);
        }
    };


  return (
        <>
            <div className="Login">
                <form onSubmit={userRegisterRequest}>
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
                        <div className={`InputBox ${isInput[2] ? "isInput" : ""}`}>
                            <input onChange={(e) => setIsInput((prev) => {
                                    const newState = [...prev];
                                    newState[2] = e.target.value !== "";
                                    return newState;
                                })}
                                ref={userNameRef}
                            />
                            <p>Name</p>
                        </div>
                        <div className="ErrorMessage">
                            {errorMessage}
                        </div>
                        <div className='InputBox' style={{ marginTop: '30px' }}>
                            <button type='submit' className='loginButton'>회원가입</button>
                        </div>

                        <div className='InputBox'>
                            <button type='button' className='registerButton' onClick={() => moveLocate("login")}>계정이 있습니다.</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
	);
}


export default Register;

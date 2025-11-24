import './Profile.css';
import { l } from '../language';
import LanguageSetter from '../LanguageSetter/LanguageSetter';
import { changeUserName, getUserName, getUserProfileImage, saveUserProfileImage, userSessionCheck } from '../Api';
import { useEffect, useRef, useState } from 'react';
import Canvas from '../Canvas/Canvas';
import { useNavigate } from 'react-router-dom';
import Cursor from '../Canvas/Cursor';


function Profile( ) {
	const [reloadKey, setReloadKey] = useState(0);
    const [userProfileImageURL, setUserProfileImageURL] = useState('/basicProfileImage.png')

    const navigate = useNavigate();
    


    const [, setLeft] = useState(50);
    useEffect(() => {
        setLeft(30);
    },[])

    useEffect(() => {
        (async () => {
            const { success, userId } = await userSessionCheck();
            if (success) {
                const { success: imgSuccess, userProfileImage } = await getUserProfileImage(userId);
                if (imgSuccess) setUserProfileImageURL(userProfileImage);

                const { success: nameSuccess, userName } = await getUserName(userId);
                if (nameSuccess) userNameRef.current.value = userName;
                
            } 
            else { navigate("/login"); }
        })();
    }, [navigate]);

    const [errorMesage, setErrorMessage] = useState("");

    const userNameRef = useRef(null);
    const canvasRef = useRef();

    const registerRequest = async (e) => {
        e.preventDefault();

        

        const userName = userNameRef.current.value;

        if(userName.length < 1) {setErrorMessage(l("errorMessage_name_short")); return}

        const result = await changeUserName(userName);

        if(result.success) {
            if(profileImageEnable === "profile_image_not_draw") {saveCanvasImage();}
            
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
    const [profileImageEnable, setProfileImageEnable] = useState("profile_image_draw"); // profile_image_draw == true

    const [cursorEnable, setCusorEnable] = useState(false);
	return (
		<>
			<LanguageSetter />
            {cursorEnable && (<Cursor size={5} />)}
			<div className="Profile">
                <div className='textBox' style={{left:'30%', top:"50%"}} id='textBox_smallSize'>
					<span>D</span><span>r</span><span>a</span><span>w</span> <br></br>
					<span id='spanT'>T</span><span>o</span> <br></br>
					<span>G</span><span>e</span><span>t</span><span>h</span><span>e</span><span>r</span>
					<span>!</span>
				</div>
                <div className='profileBox'>
                    <div className='type'>
                        <p style={{whiteSpace: 'nowrap'}}>{l("form_type_edit_profile")}</p>
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
                            <div className='reDraw' id='profileDraw' onClick={() => setProfileImageEnable(prev => {if(prev === "profile_image_draw") {return "profile_image_not_draw"} else {return "profile_image_draw"}})}>
                                <p>{l(profileImageEnable)}</p>
                            </div>
							{profileImageEnable === "profile_image_draw" && (<div className='my_profile'>
								<img src={userProfileImageURL} alt='profileImage'></img>
							</div>)}
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
              
                            
                            <div className='Error'>
                                <p>{errorMesage}</p>
                            </div>
                            <div className='Submit'>
                                <button type='submit'>{l("edit_profile_button")}</button>
                            </div>
                            <div className='Register'>
                                <a href='/logout'>{l("logout_message")}</a>
                            </div>
                        </form>
                    

                    
                    </div>
      
                </div>
            </div>
		</>
	);
}

export default Profile;

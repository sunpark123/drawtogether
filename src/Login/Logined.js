import { useEffect, useContext  } from "react";
import { userLogout, userSessionCheck } from "../Api";
import { DrawContext } from "../App";
import { useNavigate } from "react-router-dom";

function Logined( { setUserIdRequest } ) {
    const { userId } = useContext(DrawContext);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const { success, userId } = await userSessionCheck();
            if (success) { setUserIdRequest(userId); }
            else{ navigate("/login"); }
        })();
    });

    const userLogoutRequest = () => {
        navigate("/login");
        (async () => { await userLogout() })();
    }
    return (
        <>
           <p>구글 로그인 성공 : {userId}</p>
            <br></br>
           <p onClick={userLogoutRequest}>로그아웃</p>
        </>
    );
}

export default Logined;

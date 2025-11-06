import { useEffect } from "react";
import { userLogout } from "../Api";
import { useNavigate } from "react-router-dom";

function Logout( ) {
    const navigate = useNavigate();
    useEffect(() => {
        userLogoutRequest();
    });

    const userLogoutRequest = () => {
        navigate("/login");
        (async () => { await userLogout() })();
    }
}

export default Logout;

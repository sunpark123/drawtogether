
const languageList = ["kor", "eng"]
const translations = {
    kor: {
        // 로그인, 회원가입 에러 메세지
        errorMessage_id_short: "아이디는 4글자 이상이여야 합니다.",
        errorMessage_password_short: "비밀번호는 8글자 이상이여야 합니다.",
        errorMessage_id_cant_use_underbar: "아이디에 언더바 사용 금지.",
        errorMessage_name_short: "이름은 2글자 이상이여야 합니다.",


        // 로그인, 회원가입
        form_type_login: "로그인",
        form_type_register: "회원가입",
        form_type_edit_profile: "프로필 수정",

        input_userId: "아이디",
        input_userPassword: "비밀번호",
        input_name: "이름",

        login_button: "로그인",
        register_button: "회원가입",
        edit_profile_button: "프로필 수정",

        or_register_text: "DrawToGether가 처음인가요?",
        or_register_button: "계정 생성",

        or_login_text: "계정이 이미 있나요?",
        or_login_button: "로그인",

        oAuth_Google: "구글로 로그인하기",
        oAuth_Gang: "갱으로 로그인하기",
        
        register_text_profile_draw: "프로필 그리기",
        register_text_profile_re_draw: "다시하기",


        // 로비
        menu_draw: "그리기",
        menu_profile: "프로필",
        menu_other: "방 목록",
        menu_join: "코드입력",

        menu_info_draw: "너의 생각을 보여줘!!",
        menu_info_profile: "그림으로 너를 표현해봐",
        menu_info_other: "다른 방 입장하기",
        menu_info_join: "코드로 입장하기",

        profile_image_draw: "그리기",
        profile_image_not_draw: "그리기 취소",

        logout_message: "로그아웃",
    },
    eng: {
        errorMessage_id_short: "ID must be at least 4 characters long.",
        errorMessage_password_short: "Password must be at least 8 characters long.",
        errorMessage_id_cant_use_underbar: "Do not use underscores in your ID.",
        errorMessage_name_short: "name must be at least two characters long.",

        form_type_login: "Sign In",
        form_type_register: "Create Account",
        form_type_edit_profile: "Edit Profile",

        input_userId: "UserId",
        input_userPassword: "Password",
        input_name: "Name",

        login_button: "Login",
        register_button: "Register",
        edit_profile_button: "Profile Edit",

        or_register_text: "New to DrawToGether?",
        or_register_button: "Create an Account",

        or_login_text: "Already have an account?",
        or_login_button: "Sign In",

        oAuth_Google: "Login With Google",
        oAuth_Gang: "Login With oAuth_Gang",

        register_text_profile_draw: "draw profile",
        register_text_profile_re_draw: "redraw",

        menu_draw: "Draw",
        menu_profile: "Profile",
        menu_other: "Other",
        menu_join: "Join",
        
        menu_info_draw: "Draw Your Thoughts!!",
        menu_info_profile: "Express Myself In Draw",
        menu_info_other: "Join Other Room",
        menu_info_join: "Join With Code",

        profile_image_draw: "draw",
        profile_image_not_draw: "draw cancle",

        logout_message: "logout",
    },
};


export const changeLanguage = ( language ) => {
    if(languageList.includes(language))
    {
        localStorage.setItem("language", language)
    }
};


export const l = ( word ) => {
    let lang = localStorage.getItem("language");
    if (!lang) {
        changeLanguage("kor");
        lang = "kor";
    }

    return translations[lang][word] || word;
}

export const getLanguage = () => {
    return localStorage.getItem("language");
}
import { changeLanguage, getLanguage } from '../language';
import './LanguageSetter.css'
function LanguageSetter( ) {
    const cl = () => {
        if(getLanguage() === "eng"){
            changeLanguage("kor")
        }
        else{
            changeLanguage("eng")
        }
        window.location.reload();
    }
    return (
        <>
           <div className='LanguageSetter'>
                <p>{getLanguage()}</p>
                <img src='language.png' alt='languageSetting' onClick={() => cl()}></img>
           </div>
        </>
    );
}

export default LanguageSetter;

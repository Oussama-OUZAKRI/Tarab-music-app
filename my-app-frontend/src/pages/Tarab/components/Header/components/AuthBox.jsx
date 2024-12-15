import { useNavigate } from "react-router-dom";
import './css/authbox.css';
import login from '/login.svg';
import register from '/register.svg';

const AuthBox = () => {
    const navigate = useNavigate();
    const handleSignupClick = () => {
        navigate('/register');
    };
    const handleLoginClick = () => {
        navigate('/login');
    };

    return(
        <div className="auth-box">
            <button className="register_btn" onClick={handleSignupClick}>
                <span className="button-text">S'inscrire</span>
                <img className="icon register" src={register} alt="register" title="register" />
            </button>
            <button className="login_btn" onClick={handleLoginClick}>
                <span className="button-text">Se connecter</span>
                <img className="icon" src={login} alt="login" title="login" />
            </button>
        </div>
    );
}

export default AuthBox
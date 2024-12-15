import './css/righthead.css';
import notification from '/notification.svg';
import redirect from '/external.svg';
import { useState, useEffect, useRef } from 'react';

const RightHead = () => {
    const [visible, setVisible] = useState(false);
    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;
    let firstLetter = userData && userData.name ? userData.name.charAt(0) : 'U';
    const dropdownRef = useRef(null);
    const showMenu = () => {
        setVisible(!visible);
    }
    const closeMenu = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setVisible(false);
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', closeMenu);
        return () => {
            document.removeEventListener('mousedown', closeMenu);
        };
    }, []);
    return(
        <div className="logged">
            <button className="notification"><img src={notification} alt="notification" /></button>
            <button className="profil" onClick={showMenu}>
                <span className="username">{firstLetter}</span>
            </button>
            <div className={`dropdown-menu ${visible ? "visible" : "hidden"}`} ref={dropdownRef}>
                <ul>
                    <li>
                        <span>Compte</span>
                        <img src={redirect} alt="External Link" />
                    </li>
                    <li>
                        <span>Profil</span>
                    </li>
                    <li>
                        <span>Passer à Premium</span>
                        <img src={redirect} alt="External Link" />
                    </li>
                    <li>
                        <span>Préférences</span>
                    </li>
                    <li>
                        <span>Déconnexion</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default RightHead;
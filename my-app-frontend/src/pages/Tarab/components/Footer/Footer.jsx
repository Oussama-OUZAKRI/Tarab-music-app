import s from './footer.module.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/register');
    }

    return(
        <div className={s.footer}>
            <div>
                <h4>Extrait sur Tarab</h4>
                <p>Inscrivez-vous pour écouter titres et podcasts en illimité, avec quelques coupures pubs. Pas besoin de carte de crédit.</p>
            </div>
            <button onClick={handleClick}>S'inscrire gratuitement</button>
        </div>
    );
}

export default Footer;
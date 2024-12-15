import s from './footer.module.css';
import InstagramIcon from '/logo-instagram.svg';
import TwitterIcon from '/logo-twitter.svg';
import FacebookIcon from '/logo-facebook.svg';

function FooterMain() {
    return(
        <footer className={s.footer}>
            <div className={s.footer_content}>
                <div className={s.footer_section}>
                    <h3>Société</h3>
                    <ul>
                        <li><a href="#">A propos</a></li>
                        <li><a href="#">Offres d'emploi</a></li>
                        <li><a href="#">For the Record</a></li>
                    </ul>
                </div>
                <div className={s.footer_section}>
                    <h3>Communautés</h3>
                    <ul>
                        <li><a href="#">Espace artistes</a></li>
                        <li><a href="#">Développeurs</a></li>
                        <li><a href="#">Campagnes publicitaires</a></li>
                        <li><a href="#">Investisseurs</a></li>
                        <li><a href="#">Fournisseurs</a></li>
                    </ul>
                </div>
                <div className={s.footer_section}>
                    <h3>Liens utiles</h3>
                    <ul>
                        <li><a href="#">Assistance</a></li>
                        <li><a href="#">Appli mobile gratuite</a></li>
                    </ul>
                </div>
                <div className={s.footer_section}>
                    <h3>Abonnements Spotify</h3>
                    <ul>
                        <li><a href="#">Premium Personnel</a></li>
                        <li><a href="#">Premium Duo</a></li>
                        <li><a href="#">Premium Famille</a></li>
                        <li><a href="#">Premium Étudiants</a></li>
                        <li><a href="#">Tarab Free</a></li>
                    </ul>
                </div>
            </div>
            <div className={s.footer_bottom}>
                <ul className={s.footer_links}>
                    <li><a href="#">Légal</a></li>
                    <li><a href="#">Centre de sécurité et de confidentialité</a></li>
                    <li><a href="#">Protection des données</a></li>
                    <li><a href="#">Cookies</a></li>
                    <li><a href="#">À propos des pubs</a></li>
                    <li><a href="#">Accessibilité</a></li>
                </ul>
                <p>&copy; {new Date().getFullYear()} Tarab AB</p>
                <div className={s.social_icons}>
                    <a href="#"><img src={InstagramIcon} alt="Instagram" /></a>
                    <a href="#"><img src={TwitterIcon} alt="Twitter" /></a>
                    <a href="#"><img src={FacebookIcon} alt="Facebook" /></a>
                </div>
            </div>
        </footer>
    );
}

export default FooterMain;
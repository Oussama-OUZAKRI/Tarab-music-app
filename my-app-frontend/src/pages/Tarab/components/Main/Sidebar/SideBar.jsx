import './sidebar.css';
import collecIcon from '/collection-fill.svg';
import plusIcon from '/plus.svg';
import transIcon from '/translate.svg';

const SideBar = () => {
    return(
        <div className="side-bar">
            <div className="side-bar-head">
                <div className="biblio-container">
                    <img src={collecIcon} alt="Bibliothèque"/>Bibliothèque
                </div>
                <div className="add-btn">
                    <img src={plusIcon} alt="Ajouter"/>
                </div>
            </div>
            <div className="scroll-box">
                <div className="playlist-box">
                    <h4>Créer votre première playlist</h4>
                    <p>C'est simple, nous allons vous aider</p>
                    <button>Créer une playlist</button>
                </div>
                <div className="podcast-box">
                    <h4>Cherchons quelques podcasts auxquels vous abonner</h4>
                    <p>Nous vous transmettrons des informations sur les nouveaux épisodes</p>
                    <button>Parcourir les podcasts</button>
                </div>
            </div>
            <div className="side-bar-links">
                <a>Légal</a>
                <a>Centre de sécurité et de confidentialité</a>
                <a>Protection des données</a>
                <a>Cookies</a>
                <a>À Propos des pubs</a>
                <a>Accessibilité</a>
            </div>
            <button className="translate-btn"><img src={transIcon} alt="Traduire"/>Français</button>
        </div>
    );
}

export default SideBar;
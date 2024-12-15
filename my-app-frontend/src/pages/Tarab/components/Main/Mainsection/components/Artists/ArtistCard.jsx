import { useNavigate } from 'react-router-dom';
import s from './artist.module.css';
import PlayIcn from '/play.svg';

const ArtistCard = (props) => {
    const artist = props.artist;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/artist/${artist.id}`);
    }
    return(
        <div className={s.card} onClick={handleClick}>
            <div className={s.img_container}>
                <img className={s.img_box} src={artist.images[0].url} alt={artist.name} />
                <div className={s.play_button}>
                    <img className={s.play_icon} src={PlayIcn} alt="Play" />
                </div>
            </div>
            <a>{artist.name}</a>
            <span>{artist.type.charAt(0).toUpperCase() + artist.type.slice(1)}</span>
        </div>
    );
}

export default ArtistCard;
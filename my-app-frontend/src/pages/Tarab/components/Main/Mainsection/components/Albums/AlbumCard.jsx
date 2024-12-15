import s from './album.module.css';
import { useNavigate } from 'react-router-dom';
import PlayIcn from '/play.svg';

function AlbumCard(props) {
    const album = props.album;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/album/${album.id}`);
    }

    return(
        <div className={s.card} onClick={handleClick}>
            <div className={s.img_container}>
                <img className={s.img_box} src={album.images[0].url} alt={album.name} />
                <div className={s.play_button}>
                    <img className={s.play_icon} src={PlayIcn} alt="Play" />
                </div>
            </div>
            <a>{album.name}</a>
            <span>{album.label}</span>
        </div>
    );
}

export default AlbumCard;
import s from './playlist.module.css';
import PlayIcn from '/play.svg';

const PlaylistCard = (props) => {
    const playlist = props.playlist;

    return(
        <div className={s.card}>
            <div className={s.img_container}>
                <img className={s.img_box} src={playlist.images[0].url} alt={playlist.name} />
                <div className={s.play_button}>
                    <img className={s.play_icon} src={PlayIcn} alt="Play" />
                </div>
            </div>
            <a>{playlist.name}</a>
        </div>
    );
}

export default PlaylistCard;
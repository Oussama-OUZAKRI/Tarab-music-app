import s from './css/album.module.css';
import PlayIcn from '/play.svg';

function AlbumCard(props) {
    const album = props.album;

    return(
        <div className={s.card}>
            <div className={s.img_container}>
                <img className={s.img_box} src={album.images[0].url} alt={album.name} />
                <div className={s.play_button}>
                    <img className={s.play_icon} src={PlayIcn} alt="Play" />
                </div>
            </div>
            <a>{album.name}</a>
            <span>{album.artists.map(artist => artist.name).join(", ")}</span>
        </div>
    );
}

export default AlbumCard;
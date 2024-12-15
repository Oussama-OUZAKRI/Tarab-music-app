import s from '../list.module.css';
import PlaylistCard from './PlaylistCard';


const PlaylistList = (props) => {
    const playlists = props.playlists;

    return (
        <div className={s.container}>
            <div className={s.header}>
                <h2>Playlists Tarab</h2>
                <a href="#" className={s.show_more}>Tout afficher</a>
            </div>
            <div className={s.scroll_box}>
                {playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
            </div>
        </div>
    );
}

export default PlaylistList;
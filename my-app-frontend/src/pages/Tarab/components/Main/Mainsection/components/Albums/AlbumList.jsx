import s from '../list.module.css';
import AlbumCard from './AlbumCard';

function AlbumList(props) {
    const albums = props.albums;
    console.log('Albums: ', albums);

    return (
        <div className={s.container}>
            <div className={s.header}>
                <h2>Albums populaires</h2>
                <a href="#" className={s.show_more}>Tout afficher</a>
            </div>
            <div className={s.scroll_box}>
                {albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                ))}
            </div>
        </div>
    );
}

export default AlbumList;
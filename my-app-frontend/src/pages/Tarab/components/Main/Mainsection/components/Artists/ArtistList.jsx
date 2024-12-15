import s from '../list.module.css';
import ArtistCard from './ArtistCard';

const ArtistList = (props) => {
    const artists = props.artists;
    console.log('Artists :', artists);

    return (
        <div className={s.container}>
            <div className={s.header}>
                <h2>Artistes populaires</h2>
                <a href="#" className={s.show_more}>Tout afficher</a>
            </div>
            <div className={s.scroll_box}>
                {artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
        </div>
    );
}

export default ArtistList;
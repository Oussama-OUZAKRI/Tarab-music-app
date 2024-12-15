import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import ChargingAlbum from './components/ChargingAlbum';
import { PlayerContext } from '../Artist/PlayerContext';
import AlbumCard from './components/AlbumCard';
import Track from './components/Track';
import Error from '../Error/Error';
import s from './album.module.css';
import play from '/play.svg';
import dots from '/dots.svg';

const AlbumDetail = () => {
    const [album, setAlbum] = useState(null);
    const [albums, setAlbums] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const { id } = useParams();
    
    const { setCurrentTrack } = useContext(PlayerContext);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: 0, 
                behavior: 'smooth', 
            });
        }
    }, [id]);

    useEffect(() => {
        const fetchAlbum = async (endpoint, id) => {
            try {
                const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
                const url = endpoint + id;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Erreur de récupération des données');
                }
                const result = await response.json();
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }

        const fetchAlbums = async (endpoint, id) => {
            try {
                const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
                const url = `${endpoint}${id}/albums`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Erreur de récupération des données');
                }
                const result = await response.json();
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }

        const fetchAllData = async () => {
            try {
                const albumData = await fetchAlbum("https://api.spotify.com/v1/albums/", id);
                console.log(albumData);
                if (!albumData.artists || albumData.artists.length === 0) {
                    throw new Error("Aucun artiste trouvé pour cet album.");
                }
        
                const artistId = albumData.artists[0].id;
                const albumsData = await fetchAlbums("https://api.spotify.com/v1/artists/", artistId);
        
                setAlbum(albumData);
                setAlbums(albumsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };        

        fetchAllData();
    }, [id]);

    const handleTrackClick = (track) => {
        setCurrentTrack(track);
    };

    if (loading) {
        return <ChargingAlbum />;
    };
    if (error) {
        return <Error message={error} />;
    };

    return(
        <div ref={containerRef} className={`${s.main_box} ${s.scroll_box}`}>
            <div className={s.album_header}>
                <img src={album.images[0].url} alt="artist Cover" className={s.album_cover} />
                <div className={s.album_info}>
                    <span>{album.type.charAt(0).toUpperCase() + album.type.slice(1)}</span>
                    <h1>{album.name}</h1>
                    <div>
                        <span>
                            {album.artists.map((artist) => artist.name).join(', ')} 
                        </span>  
                        •
                        <span>{album.release_date.split('-')[0]}</span> 
                        •
                        <span>{album.total_tracks} titres</span>
                    </div>
                </div>
            </div>
            <div className={s.album_controls}>
                <button className={s.play_btn}>
                    <img src={play} alt="play" />
                </button>
                <button className={s.add_btn}>S'abonner</button>
                <button className={s.more_options_btn}>
                    <img src={dots} alt="dots" />
                </button>
            </div>
            <div className={s.tracks}>
                <ul>
                    {album.tracks.items.map((track, id) => (
                        <li key={id} onClick={() => handleTrackClick(track)}>
                            <Track index={id} track={track} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={s.container}>
                <div className={s.header}>
                    <h2>Plus de contenu avec {album.artists[0].name}</h2>
                    <a href="#" className={s.show_more}>Tout afficher</a>
                </div>
                <div className={s.scroll_box_album}>
                    {albums.items.slice(0, 5).map((album) => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AlbumDetail;
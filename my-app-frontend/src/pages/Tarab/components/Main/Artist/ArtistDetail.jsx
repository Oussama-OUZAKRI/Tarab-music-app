import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext, useRef } from 'react';
import { PlayerContext } from './PlayerContext';
import s from './artist.module.css';
import Track from './components/Track';
import ChargingArtist from './components/ChargingArtist';
import RelatedArtist from './components/RelatedArtist';
import AlbumCard from './components/AlbumCard';
import Error from '../Error/Error';
import play from '/play.svg';
import dots from '/dots.svg';

const ArtistDetail = () => {
    const [artist, setArtist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState(null);
    const [albums, setAlbums] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setCurrentTrack } = useContext(PlayerContext);
    const { id } = useParams();
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: 0, 
                behavior: 'smooth', 
            });
        }
    }, [id]);

    useEffect(() => {
        const fetchArtist = async (endpoint, id) => {
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
        };
        const fetchTracks = async (endpoint, id) => {
            try {
                const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
                const url = `${endpoint}${id}/top-tracks`;
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
        };
        const fetchRelatedArtists = async (endpoint, id) => {
            try {
                const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
                const url = `${endpoint}${id}/related-artists`;
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
                const [artistData, tracksData, relatedArtistsData, albumsData] = await Promise.all([
                    fetchArtist("https://api.spotify.com/v1/artists/", id),
                    fetchTracks("https://api.spotify.com/v1/artists/", id),
                    fetchRelatedArtists("https://api.spotify.com/v1/artists/", id),
                    fetchAlbums("https://api.spotify.com/v1/artists/", id)
                ]);

                setArtist(artistData);
                setTracks(tracksData);
                setRelatedArtists(relatedArtistsData);
                setAlbums(albumsData)
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
        return <ChargingArtist />;
    }
    if (error) {
        return <Error message={error} />;
    }
    return(
        <div ref={containerRef} className={`${s.main_box} ${s.scroll_box}`}>
            <div className={s.artist_header}>
                <img src={artist.images[0].url} alt="artist Cover" className={s.artist_cover} />
                <div className={s.artist_info}>
                    <h1>{artist.name}</h1>
                    <p>{artist.followers.total} followers</p>
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
            <div className={s.popular_tracks}>
                <h2>Populaires</h2>
                <ul>
                    {tracks.tracks.map((track, id) => (
                        <li key={id} onClick={() => handleTrackClick(track)}>
                            <Track index={id} track={track} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={s.container}>
                <div className={s.header}>
                    <h2>Avec {artist.name}</h2>
                    <a href="#" className={s.show_more}>Tout afficher</a>
                </div>
                <div className={s.scroll_box_artist}>
                    {albums.items.slice(0, 5).map((album) => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </div>
            <div className={s.container}>
                <div className={s.header}>
                    <h2>Les fans aiment aussi</h2>
                    <a href="#" className={s.show_more}>Tout afficher</a>
                </div>
                <div className={s.scroll_box_artist}>
                    {relatedArtists.artists.slice(0, 5).map((artist) => (
                        <RelatedArtist key={artist.id} artist={artist} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArtistDetail;
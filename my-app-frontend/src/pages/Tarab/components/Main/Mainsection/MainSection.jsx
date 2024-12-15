import { useState, useEffect } from 'react';
import s from './main.module.css';
import ArtistList from './components/Artists/ArtistList';
import AlbumList from './components/Albums/AlbumList';
import PlaylistList from './components/Playlists/PlaylistList';
import FooterMain from './components/Footer/FooterMain';
import ChargingPage from './components/LoadingPage/ChargingPage';
import Error from '../Error/Error';

const MainSection = () => {
    const [data, setData] = useState({ albums: [], artists: [], playlists: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const artistsIds = ['471CLfthkGwHrnegKOcTbx', '4BFLElxtBEdsdwGA1kHTsx', '3IRAzpoLeNDGv7kqwNK3bp', '7yK3vix9XmeNwPDmjGs78F', '0bmKQDkU4J3gUykZS8tb6v'];
    const albumsIds = ['3zKwuAbA8kBGjwgGhebvI5', '5e3bPy9xbaSULrXRVG8fp8', '5MM2Wa6hlvuiwun1RgvRlm', '5LuZWDplnk8b6cL0BV3SJ9', '2mQJkHDgHmV19m9tbkULA5'];
    const playlistsIds = ['37i9dQZF1E4yBd5f8tF8jP', '37i9dQZF1E4nLOJflhphQ7', '37i9dQZF1E4l5KFFydlDvb', '37i9dQZEVXbNG2KDcFcKOF', '37i9dQZEVXbMDoHDwVN2tF'];

    useEffect(() => {
        const fetchData = async (endpoint, ids, type) => {
            try {
                const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
                const url = `${endpoint}?ids=${ids.join(',')}`;
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

        const fetchPlaylists = async (playlistIds) => {
            try {
                const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
                const playlistPromises = playlistIds.map(async (id) => {
                    const url = `https://api.spotify.com/v1/playlists/${id}`;
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Erreur de récupération des playlists');
                    }
                    return await response.json();
                });
                return await Promise.all(playlistPromises);
            } catch (err) {
                throw new Error(err.message);
            }
        };

        const fetchAllData = async () => {
            try {
                const [artistsData, albumsData, playlistsData] = await Promise.all([
                    fetchData('https://api.spotify.com/v1/artists/', artistsIds, 'artists'),
                    fetchData('https://api.spotify.com/v1/albums/', albumsIds, 'albums'),
                    fetchPlaylists(playlistsIds),
                ]);

                setData({
                    artists: artistsData.artists,
                    albums: albumsData.albums,
                    playlists: playlistsData,
                });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) {
        return <ChargingPage />;
    }
    if (error) {
        return <Error message={error} />;
    }

    return (
        <div className={`${s.main_box} ${s.scroll_box}`}>
            <ArtistList artists={data.artists} />
            <AlbumList albums={data.albums} />
            <PlaylistList playlists={data.playlists} />
            <FooterMain />
        </div>
    );
};

export default MainSection;

import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../Main/Artist/PlayerContext';
import s from './player.module.css';
import Left from './components/Left';
import Center from './components/Center';
import audio from '/Tarab.mp3';
import logo from '/logo.png';

const Player = () => {
    const { currentTrack } = useContext(PlayerContext);
    const [track, setTrack] = useState(null);

    useEffect(() => {
        if (currentTrack) {
            const audio = new Audio(currentTrack.preview_url);
        }
    }, [currentTrack]);

    useEffect(() => {
        const fetchTrack = async (endpoint, id) => {
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
                setTrack(result);
            } catch (err) {
                console.error(err.message);
            }
        };
    
        if (currentTrack && currentTrack.id) {
            fetchTrack("https://api.spotify.com/v1/tracks/", currentTrack.id);
        }
    }, [currentTrack]);

    return(
        <div className={s.footer}>
            {currentTrack ? (
                <>
                    <Left image={track.album.images[0].url} title={track.name} artist={track.artists[0].name} />
                    <Center audio={track.preview_url} />
                </>
            ) : (
                <>
                    <Left image={logo} title="Welcome in" artist="Tarab" />
                    <Center audio={audio} />
                </>
            )}
        </div>
    );
}

export default Player;
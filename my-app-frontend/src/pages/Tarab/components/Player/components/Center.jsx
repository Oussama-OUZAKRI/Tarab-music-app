import { useState, useEffect,useRef } from 'react';
import s from './css/center.module.css';
import Right from './Right';
import shuffle from '/shuffle.svg';
import previous from '/previous.svg';
import player from '/player.svg';
import pause from '/pause.svg'
import next from '/next.svg';
import repeat from '/repeat.svg';

const Center = ({ audio }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isRepeating, setIsRepeating] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleRepeat = () => {
        setIsRepeating(!isRepeating);
        /* audioRef.current.loop = !isRepeating; */
    };

    const handleShuffle = () => {
        setIsShuffling(!isShuffling);
        // Implémenter la logique du shuffle ici si nécessaire
    };

    const handleNext = () => {
        // Logique pour passer à la piste suivante
    };

    const handlePrevious = () => {
        // Logique pour revenir à la piste précédente
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
    };

    useEffect(() => {
        if (audio && audioRef.current) {
            audioRef.current.src = audio;
            setIsPlaying(false); 
        }
    }, [audio]);

    return(
        <>
            <div className={s.footer_center}>
                <div className={s.player_controller}>
                    <button className={s.control_btn} onClick={handleShuffle}>
                        <img src={shuffle} alt="Shuffle" />
                    </button>
                    <button className={s.control_btn} onClick={handlePrevious}>
                        <img src={previous} alt="Previous" />
                    </button>
                    <button className={s.control_btn} onClick={handlePlayPause}>
                        <img src={isPlaying ? player : pause} alt="Play" />
                    </button>
                    <button className={s.control_btn} onClick={handleNext}>
                        <img src={next} alt="Next" />
                    </button>
                    <button className={s.control_btn} onClick={handleRepeat}>
                        <img src={repeat} alt="Repeat" />
                    </button>
                </div>

                <div className={s.progress_container}>
                    <span>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        className={s.progress_bar}
                        min="0"
                        max="100"
                        value={duration ? (currentTime / duration) * 100 : 0}
                        onChange={handleSeek}
                    />
                    <span>{formatTime(duration)}</span>
                </div>

                <audio
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleAudioEnd} 
                />
            </div>
            
            <Right audioRef={audioRef} />
        </>
    );
}

export default Center;
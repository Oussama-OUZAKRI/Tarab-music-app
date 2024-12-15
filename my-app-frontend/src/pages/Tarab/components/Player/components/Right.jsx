import {useState} from 'react';
import s from './css/right.module.css';
import playlist from '/library-music.svg';
import lyrics from '/lyrics.svg';
import volume  from '/volume.svg';
import mute  from '/mute.svg';
import queue from '/queue.svg';
import resize from '/resize.svg';
import fullscreen from '/fullscreen.svg';

const Right = ({audioRef}) => {
    const [value, setValue] = useState(0.8);
    const handleVolumeChange = (e) => {
        const newVolume = e.target.value; 
        setValue(newVolume); 
        audioRef.current.volume = newVolume;
    };
    const handleMute =() => {
        if (value !== 0) {
            setValue(0);
            audioRef.current.volume = 0;
        }
        else {
            setValue(0.1);
            audioRef.current.volume = 0.1;
        }
    };
    return(
        <div className={s.footer_right}>
            <button className={s.control_btn}><img src={playlist} alt="Playlist" /></button>
            <button className={s.control_btn}><img src={lyrics} alt="Lyrics" /></button>
            <button className={s.control_btn}><img src={queue} alt="Queue" /></button>
            <button className={s.control_btn} onClick={handleMute}>
                <img src={value != 0 ? volume : mute} alt="Volume" />
            </button>
            <input 
                type="range" 
                className={s.volume} 
                min="0" 
                max="1" 
                step={0.1}
                value={value}
                onChange={handleVolumeChange}
            />
            <button className={s.control_btn}><img src={resize} alt="Resize" /></button>
            <button className={s.control_btn}><img src={fullscreen} alt="Fullscreen" /></button>
        </div>
    );
}

export default Right;
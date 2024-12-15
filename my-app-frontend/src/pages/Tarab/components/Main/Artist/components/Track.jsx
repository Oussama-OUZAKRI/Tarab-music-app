import './css/track.css';
import play from '/play-arrow.svg';

const Track = ({ track, index }) => {
    const formatTime = (time) => {
        time /= 1000;
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return(
        <div className="track">
            <span className="number">{index + 1}</span>
            {/* <img src={play} alt="play" className="play" /> */}
            <img src={track.album.images[0].url} alt="Cover 5" className="cover" />
            <span className="track-name">{track.name}</span>
            <span className="duration">{track.album.release_date}</span>
            <span className="streams">{formatTime(track.duration_ms)}</span>
        </div>
    );
}

export default Track;
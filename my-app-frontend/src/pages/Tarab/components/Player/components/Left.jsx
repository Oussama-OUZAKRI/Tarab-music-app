import './css/left.css';

const Left = ({ image, title, artist }) => {
    return(
        <div className="footer-left">
            <img src={ image } alt="img-cover" className="album-cover" />
            <div className="song-info">
                <p className="song-title">{ title }</p>
                <p className="artist">{ artist }</p>
            </div>
        </div>
    );
}

export default Left;
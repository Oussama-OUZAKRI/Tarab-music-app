import { useNavigate } from 'react-router-dom';
import './css/searchbox.css';
import home from '/home.svg';
import search from '/search.svg';
import list from '/list-icon.svg';

const SearchBox = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    }

    return (
        <div className="header-box">
            <div className="home-btn" onClick={handleHome}>
                <img src={home} />
            </div>
            <div className="search-box">
                <div className="search-btn">
                    <img src={search} />
                </div>
                <input type="text" placeholder="Que souhaitez-vous écouter ou regarder ?" /> 
                <div className="list-btn">
                    <img src={list} />
                </div>
            </div>
        </div>
    );
}

export default SearchBox
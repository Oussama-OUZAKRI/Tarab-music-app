import { Routes, Route } from 'react-router-dom';
import s from './main.module.css';
import SideBar from './Sidebar/SideBar';
import MainSection from './Mainsection/MainSection';
import ArtistDetail from './Artist/ArtistDetail';
import AlbumDetail from './Album/AlbumDetail';

const Main = () => {
    return(
        <div className={s.main_container}>
            <SideBar />
            <Routes>
                <Route path="/" element={<MainSection />} />
                <Route path="/artist/:id" element={<ArtistDetail />} />
                <Route path="/album/:id" element={<AlbumDetail />} />
                {/* <Route path="/playlist/:id" element={<PlaylistDetail />} /> */}
            </Routes>
        </div>
    );
}

export default Main;
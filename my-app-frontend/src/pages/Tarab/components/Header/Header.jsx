import s from './style-header.module.css';
import Logo from './components/Logo';
import SearchBox from './components/SearchBox';
import AuthBox from './components/AuthBox';
import RightHead from './components/RightHead';

const Header = () => {
    const token = localStorage.getItem("token");
    return(
        <div className={s.header}>
            <Logo />
            <SearchBox />
            { token && (
                <RightHead />
            )}

            { !token && (
                <AuthBox />
            )}
        </div>
    );
}

export default Header
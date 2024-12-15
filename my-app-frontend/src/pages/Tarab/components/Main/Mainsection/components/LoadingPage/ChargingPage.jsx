import s from './css/charging-page.module.css';
import FooterMain from '../Footer/FooterMain';
import HeadCharger from './HeadCharger';
import SubCharger from './SubCharger';

const ChargingPage = () => {
    return(
        <div className={`${s.main_box} ${s.scroll_box}`}>
            <div className={s.skeleton_header}></div>
            <HeadCharger />
            <SubCharger />
            <SubCharger />
            <SubCharger />
            <SubCharger />
            <SubCharger />
            <FooterMain />
        </div>
    );
}

export default ChargingPage;
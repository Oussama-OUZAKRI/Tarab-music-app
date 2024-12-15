import s from './css/charging.module.css';

const ChargingArtist = () => {
    return(
        <div className={`${s.main_box} ${s.scroll_box}`}>
            <div className={s.wrapper}>
                <div className={s.circle}></div>
                <div className={s.circle}></div>
                <div className={s.circle}></div>
                <div className={s.shadow}></div>
                <div className={s.shadow}></div>
                <div className={s.shadow}></div>
            </div>
        </div>
    );
}

export default ChargingArtist;
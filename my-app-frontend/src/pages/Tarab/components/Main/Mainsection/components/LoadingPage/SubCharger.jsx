import s from './css/subcharger.module.css';

const SubCharger = () => {
    return (
        <>
            <div className={s.skeleton_subheader}></div>
            <div className={s.skeleton_content}>
                <div className={s.skeleton_card}>
                    <div className={s.skeleton_img_v2}></div>
                    <div className={s.skeleton_title_v1}></div>
                    <div className={s.skeleton_title_v2}></div>
                </div>
                <div className={s.skeleton_card}>
                    <div className={s.skeleton_img_v2}></div>
                    <div className={s.skeleton_title_v1}></div>
                    <div className={s.skeleton_title_v2}></div>
                </div>
                <div className={s.skeleton_card}>
                    <div className={s.skeleton_img_v2}></div>
                    <div className={s.skeleton_title_v1}></div>
                    <div className={s.skeleton_title_v2}></div>
                </div>
                <div className={s.skeleton_card}>
                    <div className={s.skeleton_img_v2}></div>
                    <div className={s.skeleton_title_v1}></div>
                    <div className={s.skeleton_title_v2}></div>
                </div>
                <div className={s.skeleton_card}>
                    <div className={s.skeleton_img_v2}></div>
                    <div className={s.skeleton_title_v1}></div>
                    <div className={s.skeleton_title_v2}></div>
                </div>
                <div className={s.skeleton_card}>
                    <div className={s.skeleton_img_v2}></div>
                    <div className={s.skeleton_title_v1}></div>
                    <div className={s.skeleton_title_v2}></div>
                </div>
            </div>
        </>
    );
}

export default SubCharger;
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import s from './css/step4-style.module.css'
import Logo from '/logo.png';
import Back from '/chevron-back-outline.svg';

function Step4(props) {
    
    const { marketingMessages, shareData, prev, submit } = props;

    const initialValues = {
        marketingMessages: marketingMessages,
        shareData: shareData,
    };

    const validationSchema = Yup.object().shape({
        marketingMessages: Yup.boolean(),
        shareData: Yup.boolean(),
    });

    const handleSubmit = (values) => {
        console.log('Form values:', values);
        submit(values.marketingMessages, values.shareData);
    };
    
    return(
        <div className={s.container}>
            <img className={s.logo_tarab} src={Logo} alt="Tarab" />
            <div className={s.progress_container}>
                <div className={s.progress_bar}></div>
            </div>
            <div className={s.step}>
                <div  onClick={prev} ><img src={Back} alt="précédent" /></div>
                <div>
                    <span>Étape 3 sur 3</span>
                    <h2>Créez un mot de passe</h2>
                </div>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form className={s.form_box}>
                        <div className={s.checkbox_box}>
                            <Field type="checkbox" id="marketingMessages" name="marketingMessages" />
                            <label htmlFor="marketingMessages">Je ne souhaite pas recevoir de messages marketing de Spotify</label>
                        </div>

                        <div className={s.checkbox_box}>
                            <Field type="checkbox" id="shareData" name="shareData" />
                            <label htmlFor="shareData">Partagez les données sur mon inscription avec les fournisseurs de contenu de Spotify à des fins de marketing.</label>
                        </div>

                        <div className={s.terms}>
                            <p>En cliquant sur le bouton d'inscription, vous acceptez les 
                                <a href="#">Conditions générales d'utilisation de Spotify</a>.
                            </p>
                            <p>Pour en savoir plus sur la façon dont Spotify recueille, utilise, partage et protège vos données personnelles, veuillez consulter la 
                                <a href="#">Politique de confidentialité de Spotify</a>.
                            </p>
                        </div>

                        <button type="submit" className={s.btn}>S'inscrire</button>
                    </Form>
                )}
            </Formik>
            <div className={s.captcha}>
                This site is protected by reCAPTCHA and the Google
                <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> apply.
            </div>
        </div>
    );
};

export default Step4;
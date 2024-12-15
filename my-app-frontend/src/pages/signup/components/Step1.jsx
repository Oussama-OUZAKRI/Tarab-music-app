import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './css/step1-style.module.css';
import Logo from '/logo.png';
import GoogleIcon from '/logo-google.svg';
import FacebookIcon from '/logo-facebook.svg';
import AppleIcon from '/logo-apple.svg';
import errorIcn from '/error.svg';
import axios from 'axios';

function Step1(props) {

    const { email, next } = props;

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.post('http://localhost:3000/user/check-email', { email });
            console.log(response.data.exists);
            return response.data.exists;
        } catch (error) {
            console.error("Erreur lors de la vérification de l'e-mail:", error);
            return false;
        }
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/, 'Cette adresse e-mail est non valide. Assurez vous qu\'elle respecte ce format : exemple@email.com')
            .required('L\'adresse e-mail est requis')
            .test('checkEmailExists', 'Cet e-mail est déjà utilisé', async (value) => {
                const exists = await checkEmailExists(value);
                return !exists;
            })
    });

    const handleSubmit = (values) => {
        console.log('Form values:', values);
        const email = values.email;
        next(email);
    };

    const CustomErrorMessage = ({ name }) => (
        <ErrorMessage name={name}>
            {(msg) => (
                <div className={s.error_box}>
                    <img src={errorIcn} alt="Error" className={s.error_icn} />
                    <p className={s.error_msg}>{msg}</p>
                </div>
            )}
        </ErrorMessage>
    );
    
    return (
        <div className={s.register_box}>
            <img className={s.logo_tarab} src={Logo} />
            <h1>Inscrivez-vous pour commencer à écouter</h1>
            <Formik
                initialValues={{ email: email }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors }) => (
                    <Form className={s.form}>
                        <div className={s.form_box}>
                            <label htmlFor="email" className={s.label}>Adresse e-mail</label>
                            <Field name="email">
                                {({ field, form }) => (
                                    <input
                                        {...field}
                                        type="email"
                                        placeholder= "nom@domaine.com"
                                        className={`${s.input} ${form.errors.email && form.touched.email 
                                            ? s.invalid_input 
                                            : s.valid_input}`}
                                    />
                                )}
                            </Field>
                            <CustomErrorMessage name="email" />
                            <a href="#" className={s.link_phone}>Utilisez plutôt un numéro de téléphone.</a>
                        </div>
                        <button type="submit" className={s.submit_btn}>S'inscrire</button>
                    </Form>
                )}
            </Formik> 
            <div className={s.separate_line_ou}>
                <hr />
                <span>ou</span>
                <hr />
            </div>
            <button type="button" className={s.btn}><img src={GoogleIcon}/>Inscrivez-vous avec Google</button>
            <button type="button" className={s.btn}><img src={FacebookIcon}/>Inscrivez-vous avec Facebook</button>
            <button type="button" className={s.btn}><img src={AppleIcon}/>S'inscrire avec Apple</button>
            <hr className={s.seperate_line} />
            <p className={s.redirect_login}>Vous avez déjà un compte ? <a href="#">Connectez-vous ici.</a></p>
        </div>
    );
};

export default Step1;

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import s from './css/step2-style.module.css';
import Logo from '/logo.png';
import Back from '/chevron-back-outline.svg';
import EyeOn from '/eye-outline.svg';
import EyeOff from '/eye-off-outline.svg';
import PassReq from './sub-components/passReq';
import errorIcn from '/error.svg';

function Step2(props) {
    const { password, next, prev } = props;
    const [type, setType] = useState('password');
    const [isFocused, setIsFocused] = useState(false);

    const validationSchema = Yup.object({
        password: Yup.string()
            .matches(/^(?=.*[A-Za-z])(?=.*[\d\W]).{10,}$/, 'Mot de passe invalide')
            .required('Mot de passe requis'),
    });

    const handleToggle = () => {
        setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };

    const handleSubmit = (values) => {
        console.log('Form values:', values);
        const password = values.password;
        next(password);
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

    const minLetter = (password) => /^(?=.*[A-Za-z])/.test(password);
    const minChar = (password) => /^(?=.*[\d\W])/.test(password);
    const minLength = (password) => /^.{10,}$/.test(password);

    return (
        <div className={s.container}>
            <img className={s.logo_tarab} src={Logo} alt="Tarab" />
            <div className={s.progress_container}>
                <div className={s.progress_bar}></div>
            </div>
            <div className={s.step}>
                <div onClick={prev}><img src={Back} alt="précédent" /></div>
                <div>
                    <span>Étape 1 sur 3</span>
                    <h2>Créez un mot de passe</h2>
                </div>
            </div>
            <Formik
                initialValues={{ password: password }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form className={s.form_box}>
                        <div className={s.input_box}>
                            <label htmlFor="password" className={s.label}>Mot de passe</label>
                            <div className={`${s.password_field} ${isFocused ? s.focused_valid : ''} ${errors.password && touched.password ? s.invalid_input : s.valid_input}`}>
                                <Field name="password">
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type={type}
                                            placeholder= "Mot de passe"
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)} 
                                        />
                                    )}
                                </Field>
                                <button type="button" onClick={handleToggle} className={s.toggle_password}>
                                    <img src={type === 'password' ? EyeOn : EyeOff} id="toggle-icon" alt="Toggle visibility" />
                                </button>
                            </div>
                            <CustomErrorMessage name="password" />
                        </div>
                        <div className={s.requirements_box}>
                            <h2>Votre mot de passe doit comporter au moins</h2>
                            <ul className={s.password_requirements}>
                                <PassReq message="1 lettre" isValid={minLetter(values.password)} />
                                <PassReq message="1 chiffre ou caractère spécial (p. ex., # ? ! &)" isValid={minChar(values.password)} />
                                <PassReq message="10 caractères" isValid={minLength(values.password)} />
                            </ul>
                        </div>
                        <button type="submit" className={s.btn}>Suivant</button>
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

export default Step2;

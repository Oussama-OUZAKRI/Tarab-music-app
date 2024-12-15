import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './login.module.css';
import Logo from '/logo.png';
import GoogleIcon from '/logo-google.svg';
import FacebookIcon from '/logo-facebook.svg';
import AppleIcon from '/logo-apple.svg';
import EyeOn from '/eye-outline.svg';
import EyeOff from '/eye-off-outline.svg';
import errorIcn from '/error.svg';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

function Login () {
    const navigate = useNavigate();
    const GlobalStyle = createGlobalStyle`
        body {
            font-family: 'Montserrat', sans-serif;
            background-color: #000;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        #root {
            display: flex;
            flex-direction: column;
        }
    `;
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [type, setType] = useState('password');
    const [isFocused, setIsFocused] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const validationSchema = Yup.object({
        email: Yup.string()
            .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/, 'Cette adresse e-mail est non valide. Assurez vous qu\'elle respecte ce format : exemple@email.com')
            .required('L\'adresse e-mail est requis'),
        password: Yup.string()
            .required('Mot de passe requis')
    })

    const handleToggle = () => {
        setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };

    const handleLogin = async (values, { resetForm }) => {
        const { email, password } = values;
        const url = 'http://localhost:3000/auth/login';

        try {
            const response = await axios.post(url, { email, password });
            const { user, token } = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            setErrorMessage('Échec de la connexion. Veuillez vérifier vos identifiants.');
            console.error('Error during logging:', error);
        } finally {
            setFormData({
                email: '',
                password: ''
            });
            resetForm();
        }
    }

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

    return(
        <>
            <GlobalStyle />
            <div className={s.login_box}>
                <img className={s.logo_tarab} src={Logo} />
                <h1>J'ai un compte Tarab</h1>
                <button className={s.btn}><img src={GoogleIcon}/>Continuer avec Google</button>
                <button className={s.btn}><img src={FacebookIcon}/>Continuer avec Facebook</button>
                <button className={s.btn}><img src={AppleIcon}/>Continuer avec Apple</button>
                <button className={s.btn}>Continuer avec un numéro de téléphone</button>
                <hr className={s.seperate_line} />
                {errorMessage && <div className={s.login_error}>{errorMessage}</div>}
                <Formik
                    initialValues={{email: formData.email, password: formData.password}}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {({ errors, touched }) => (
                        <Form className={s.form_box}>
                            <div className={s.input_box}>
                                <label className={s.label}>Adresse e-mail ou nom d'utilisateur</label>
                                <Field
                                    name="email"
                                    type="text"
                                    placeholder="Adresse e-mail ou nom d'utilisateur"
                                    className={`${s.input} ${errors.email && touched.email 
                                        ? s.invalid_input 
                                        : s.valid_input}`}
                                />
                                <CustomErrorMessage name="email" />
                            </div>
                            <div className={s.input_box}>
                                <label className={s.label}>Mot de passe</label>
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
                            <button type="submit" className={s.submit_btn}>Se connecter</button>
                        </Form>
                    )}
                </Formik>
                <a className={s.link} href="#">Mot de passe oublié ?</a>
                <p className={s.register_redirect}>Vous n'avez pas de compte ? <a className={s.link} href="#">S'inscrire à Tarab</a></p>
            </div>
        </>
    );
};

export default Login;
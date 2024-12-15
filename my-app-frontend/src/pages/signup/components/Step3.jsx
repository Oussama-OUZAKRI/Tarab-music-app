import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './css/step3-style.module.css'
import Logo from '/logo.png';
import Back from '/chevron-back-outline.svg';
import errorIcn from '/error.svg';

function Step3(props) {
    const { name, date, gender, next, prev} = props;

    const validationSchema = Yup.object({
        name: Yup.string().required('Le nom est requis'),
        day: Yup.number()
            .min(1, 'Veuillez saisir le jour entre 1 et 31.')
            .max(31, 'Veuillez saisir le jour entre 1 et 31.')
            .required('Le jour est requis'),
        month:Yup.number()
            .min(1, 'Mois invalide')
            .max(12, 'Mois invalide')
            .required('Le mois est requis'),
        year: Yup.number()
            .min(1900, 'Veuillez saisir l\'année à partir de 1900.')
            .max(new Date().getFullYear(), 'Année invalide')
            .required('L\'année est requise'),
        gender: Yup.string().required('Le genre est requis'),
    });

    const parseDate = (dateString) => {
        const [year, month, day] = dateString.split('-').map(Number);
        return { year, month, day };
    }

    const { year, month, day } = parseDate(date);

    const handleSubmit = (values) => {
        console.log('Form values:', values);
        const dateBirth = `${values.year}-${values.month.toString().padStart(2, '0')}-${values.day.toString().padStart(2, '0')}`;
        next(values.name, dateBirth, values.gender);
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
        <div className={s.container}>
            <img className={s.logo_tarab} src={Logo} alt="Tarab" />
            <div className={s.progress_container}>
                <div className={s.progress_bar}></div>
            </div>
            <div className={s.step}>
                <div onClick={prev} ><img src={Back} alt="précédent" /></div>
                <div>
                    <span>Étape 2 sur 3</span>
                    <h2>Parlez-nous de vous</h2>
                </div>
            </div>
            <Formik 
                initialValues={{ 
                    name: name || "", 
                    day: day || "", 
                    month: month || "", 
                    year: year || "", 
                    gender: gender || ""
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form className={s.form_box}>
                        <div className={s.input_box}>
                            <div className={s.section_box}>
                                <label className={s.label}>Nom</label>
                                <p className={s.desc_label}>Ce nom apparaîtra sur votre profil</p>
                                <Field
                                    name="name"
                                    type="text"
                                    placeholder="Nom"
                                    className={`${s.input} ${errors.name && touched.name 
                                        ? s.invalid_input 
                                        : s.valid_input}`}
                                />
                                <CustomErrorMessage name="name" />
                            </div>
                            <div className={s.section_box}>
                                <label className={s.label}>Date de naissance</label>
                                <p className={s.desc_label}>Pourquoi avons nous besoin de votre date de naissance ? <a>En savoir plus.</a></p>
                                <div className={s.input_field}>
                                    <Field 
                                        name="day"
                                        type="number" 
                                        placeholder="jj"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.length <= 2 && (value === "" || /^[0-9]+$/.test(value))) {
                                                setFieldValue('day', value);
                                            }
                                        }}
                                        className={`${s.day_input} ${s.input}
                                            ${errors.day && touched.day 
                                            ? s.invalid_input 
                                            : s.valid_input}`}
                                    />
                                    <Field 
                                        as="select" 
                                        name="month"
                                        onChange={(e) => setFieldValue('month', e.target.value)}
                                        className={`${s.month_input} ${s.input} 
                                            ${errors.month && touched.month 
                                            ? s.invalid_input 
                                            : s.valid_input}`}
                                    >
                                        <option value="" disabled>Mois</option>
                                        <option value="01">Janvier</option>
                                        <option value="02">Février</option>
                                        <option value="03">Mars</option>
                                        <option value="04">Avril</option>
                                        <option value="05">Mai</option>
                                        <option value="06">Juin</option>
                                        <option value="07">Juillet</option>
                                        <option value="08">Août</option>
                                        <option value="09">Septembre</option>
                                        <option value="10">Octobre</option>
                                        <option value="11">Novembre</option>
                                        <option value="12">Décembre</option>
                                    </Field>
                                    <Field 
                                        name="year"
                                        type="number"
                                        placeholder="aaaa"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.length <= 4 && (value === "" || /^[0-9]+$/.test(value))) {
                                                setFieldValue('year', value);
                                            }
                                        }}
                                        className={`${s.year_input} ${s.input} 
                                            ${errors.year && touched.year 
                                            ? s.invalid_input 
                                            : s.valid_input}`}
                                    />
                                </div>
                                <CustomErrorMessage name="day" />
                                <CustomErrorMessage name="month" />
                                <CustomErrorMessage name="year" />
                            </div>
                            <div className={s.section_box}>
                                <label htmlFor="gender" className={s.label}>Genre</label>
                                <p className={s.desc_label}>Nous utilisons votre genre pour presonnaliser nos recommandations de contenu et nos annonces</p>
                                <div className={s.radio_btn_box}>
                                    <Field 
                                        name="gender"
                                        type="radio"
                                        value="male"
                                    />
                                    <label className={s.radio_label}>Homme</label>
                                    <Field 
                                        name="gender"
                                        type="radio"
                                        value="female"
                                    />
                                    <label className={s.radio_label}>Femme</label>
                                </div>
                                <CustomErrorMessage name="gender" />
                            </div>
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

export default Step3;
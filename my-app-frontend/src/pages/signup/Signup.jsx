import { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();

    const GlobalStyle = createGlobalStyle`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Montserrat', sans-serif;
            background-color: #121212;
            display: flex;
            justify-content: center;
        }
        #root {
            width: 100%
        }
    `;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        dateBirth: '',
        gender: '',
        marketingMessages: false,
        shareData: false
    });

    const [step, setStep] = useState(1);

    const handleEmailSubmit = (email) => {
        setFormData((prevData) => ({
            ...prevData,
            email: email
        }));
        nextStep(); 
    };

    const handlePasswordSubmit = (password) => {
        setFormData((prevData) => ({
            ...prevData,
            password: password
        }));
        nextStep(); 
    };

    const handleInputs = (name, date, gender) => {
        setFormData((prevData) => ({
            ...prevData,
            name: name,
            dateBirth: date,
            gender: gender
        }));
        nextStep(); 
    }

    const handleRegister = async (marketingMessages, shareData) => {
        setFormData((prevData) => ({
            ...prevData,
            marketingMessages: marketingMessages,
            shareData: shareData
        }));

        const url = 'http://localhost:3000/user/register';

        try {
            const response = await axios.post(url, formData);
            const { user, token } = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            console.error('Error during registration:', error);
        } finally {
            setFormData({
                email: '',
                password: '',
                name: '',
                dateBirth: '',
                gender: '',
                marketingMessages: false,
                shareData: false
            });
        }
    };
    
    useEffect(() => {
        console.log("formData updated:", formData);
    }, [formData]); 

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    }

    return (
        <>
            <GlobalStyle />

            {step === 1 && (
                <Step1 
                    email={formData.email}
                    next={handleEmailSubmit}
                />
            )}

            {step === 2 && (
                <Step2 
                    password={formData.password}
                    next={handlePasswordSubmit}
                    prev={prevStep}
                />
            )}

            {step === 3 && (
                <Step3 
                    name={formData.name}
                    date={formData.dateBirth}
                    gender={formData.gender}
                    next={handleInputs}
                    prev={prevStep}
                />
            )}

            {step === 4 && (
                <Step4 
                    marketingMessages={formData.marketingMessages}
                    shareData={formData.shareData}
                    prev={prevStep}
                    submit={handleRegister}
                />
            )}
        </>
    );
};

export default Signup;
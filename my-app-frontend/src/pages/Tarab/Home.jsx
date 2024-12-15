import { createGlobalStyle } from 'styled-components';
import NotLoggedIn from './NotLoggedIn';
import LoggedIn from './LoggedIn';

const Home = () => {
    const GlobalStyle = createGlobalStyle`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: "Montserrat", sans-serif;
            background-color: #000;
            width: 100vw;
            height: 100%;
            padding: 0 10px;
        }
        #root {
            display: flex;
            flex-direction: column;
            height: 100vh;
            max-height: 100vh;
            padding-bottom: 10px;
            gap: 10px;
        }
    `;

    let token = localStorage.getItem("token");

    return(
        <>
            <GlobalStyle />

            {
                token && (
                    <LoggedIn />
                )
            }

            {
                !token && (
                    <NotLoggedIn />
                )
            }

        </>
    );
}

export default Home;
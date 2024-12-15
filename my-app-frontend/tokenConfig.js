// Client Credentials Flow (No User-Specific Data)

const clientId = '63426155c7de4320b83fba90bb8c050f';
const clientSecret = '8074f72baf1742cab2aaf8805926a71d';

async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        }),
    });

    const data = await response.json();
    console.log('Access Token:', data.access_token);
    return data.access_token;
}

getAccessToken();

// Authorization Code Flow (for User-Specific Data)

/* const clientId = '63426155c7de4320b83fba90bb8c050f';
const clientSecret = '8074f72baf1742cab2aaf8805926a71d';
const code = 'AQCUwJae2HhK0BWboqJOW8FaPblydVqCZqddNiTDaIAaJ5DUqlWp15Rw3b16G6N4Ew0bwskk04bMHL3_c_y26VtDxuACFI1Xrn_M5cLachIrxwT2B43UMfTtSVjHe8Kg1Oii7i7iJC43xBXESsWDgjd2oF40uxYyFCSwcQLr98PeemUa4ogDse7hOoPWUQdwV8m-ROv8z6cR70p5c1s';
const redirectUri = 'http://localhost:5173/';

async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
        }),
    });
    
    const data = await response.json();
    console.log('Access Token:', data.access_token);
    return data.access_token;
}

getAccessToken(); */

/*

https://accounts.spotify.com/authorize
?client_id=63426155c7de4320b83fba90bb8c050f
&response_type=code
&redirect_uri=http://localhost:5173/
&scope=user-read-private user-read-email

*/
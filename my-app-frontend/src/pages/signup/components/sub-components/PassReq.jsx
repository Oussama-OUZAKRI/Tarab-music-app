import React from 'react';
import Verified from '/verified.svg';

function PassReq({ message, isValid }) {
    const listItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '5px',
    };

    const iconWrapperStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20px',
        width: '20px',
        backgroundColor: 'transparent',
        border: isValid ? 'none' : '2px solid #b3b3b3',
        borderRadius: '50%',
    };

    const imgStyle = {
        visibility: isValid ? 'visible' : 'hidden',
        width: '20px',
        height: '20px',
    };

    return (
        <li style={listItemStyle}>
            <div style={iconWrapperStyle}>
                <img src={Verified} alt="Verified" style={imgStyle} />
            </div>
            {message}
        </li>
    );
}

export default PassReq;

import React from 'react';
import PropTypes from 'prop-types';
import s from './error.module.css';

const Error = ({ message }) => {
    return (
        <div className={s.error_container}>
            <h2>Oups ! Quelque chose s'est mal passé.</h2>
            <p>{message}</p>
        </div>
    );
};

Error.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Error;

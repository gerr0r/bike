import React from 'react';

const Button = ({ type = 'button', disabled = false, onClick, title }) => {
    return (
        <button type={type} disabled={disabled} onClick={onClick}>
            {title}
        </button>
    );
}

export default Button;

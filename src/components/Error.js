import React from 'react';

const Error = ({message}) => {
    return (
        <small className='error'>
            {message}
        </small>
    );
}

export default Error;

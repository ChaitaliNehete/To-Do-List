import React, { useEffect } from 'react';

const Alert = ({ msg, list, removeAlert }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [list]);
    return <p>{msg}</p>
}

export default Alert;
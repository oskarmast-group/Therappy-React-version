import React, { useEffect } from 'react';

const Logout = () => {

    useEffect(() => {
      localStorage.removeItem("auth");
      window.location.href = '/';
    }, []);

    return (
        <div>
        </div>
    );
}

export default Logout;
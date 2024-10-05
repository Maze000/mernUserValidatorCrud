import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/logout.css'
function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {

        fetch('/logout', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {

                    localStorage.removeItem('token');

                    navigate('/login');

                } else {

                    throw new Error('Logout failed');
                }
            })
            .catch(error => {
                console.error('Error trying to log out:', error);

            });
    };

    return (
        <button onClick={handleLogout} className='logout'>Logout</button>

    );
}

export default Logout;
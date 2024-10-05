import { useState, useEffect } from 'react';

function parseJwt(token) {
    try {
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            return payload;
        }
        return null;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

function useToken() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token')); 
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (token) {
                const payload = parseJwt(token);
                if (payload) {
                    const currentTime = Date.now() / 1000;
                    if (currentTime > payload.exp) {
                        localStorage.removeItem('token');
                        setToken(null); 
                    }
                }
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [token]);

    return { token };
}

export default useToken;


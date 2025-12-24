import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // set API base so relative requests work
    axios.defaults.baseURL = 'http://localhost:5001';

    const [authData, setAuthData] = useState(null);
    const [loading, setLoading] = useState(true);

    const setTokenHeader = (token) => {
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        setTokenHeader(token);
        axios.get('/api/auth/me')
            .then(res => {
                // keep a consistent shape: { user, token }
                setAuthData({ user: res.data, token });
            })
            .catch(() => {
                localStorage.removeItem('token');
                setTokenHeader(null);
                setAuthData(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const login = async (form) => {
        try {
            const res = await axios.post('/api/auth/login', form);
            const { token, user } = res.data;
            // persist token, set header and consistent authData shape
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setTokenHeader(token);
            setAuthData({ user, token });
        } catch (err) {
            console.error('Login error:', err);
            throw err;
        }
    };

    const signup = async (form) => {
        try {
            const res = await axios.post('/api/auth/signup', form);
            const token = res.data.token;
            // persist token and fetch user info
            localStorage.setItem('token', token);
            setTokenHeader(token);
            const me = await axios.get('/api/auth/me');
            setAuthData({ user: me.data, token });
        } catch (err) {
            if (err.response?.data?.msg === 'User already exists') {
                alert('This username is already registered. Please choose another one.');
            } else {
                alert('Signup failed. Please try again.');
            }
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTokenHeader(null);
        setAuthData(null);
    };


    return (
        <AuthContext.Provider value={{ authData, setAuthData, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    const login = async (form) => {
        try {
            const res = await axios.post('http://localhost:5001/api/auth/login', form);
            setAuthData(res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
        } catch (err) {
            console.error('Login error:', err);
            
        }
    };

    const signup = async (form) => {
        try {
            const res = await axios.post('http://localhost:5001/api/auth/signup', form);
            setAuthData(res.data);
            localStorage.setItem('token', res.data.token);
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
        setAuthData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };


    return (
        <AuthContext.Provider value={{ authData, setAuthData, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
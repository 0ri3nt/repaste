import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const { login, signup } = useContext(AuthContext);
    const [form, setForm] = useState({ email: '', password: '', username: '' });
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login(form);
            } else {
                await signup(form);
            }
            navigate('/dashboard');
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    };

    return (
        <div className="container">
            <h1>{isLogin ? 'Welcome Back to rePaste!' : 'Create Your Account'}</h1>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="button">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <div className="switch-mode">
                <p>
                    {isLogin
                        ? "Don't have an account?"
                        : 'Already have an account?'}
                    <button onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component }) => {
    const { authData } = useContext(AuthContext);

    return authData ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
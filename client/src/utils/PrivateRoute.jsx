import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component }) => {
    const { authData, loading } = useContext(AuthContext);

    // while we restore session, don't redirect — render nothing (or a spinner)
    if (loading) return null;

    return authData ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
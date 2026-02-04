import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#57575f]">
                <span className="loading loading-bars loading-lg text-white"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }

    // Login chara access korle take login page-e pathiye dibe
    return <Navigate state={location.pathname} to="/" replace></Navigate>;
};

export default PrivateRoute;
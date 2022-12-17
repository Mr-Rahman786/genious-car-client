import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/Authprovider';

const PrivateRoute = ({ children }) => {
    const {user,loding} = useContext(AuthContext);
    const location = useLocation()
    if (loding) {
        return <h1 className='text-5xl'>Loading....</h1>
    }
    if (user) {
        return children
    }
    return <Navigate to='/login' state={{from:location}}replace></Navigate>
};

export default PrivateRoute;
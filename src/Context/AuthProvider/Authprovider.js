import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const Authprovider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const creatUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
     const unsubsCribe=   onAuthStateChanged(auth, currentUser => {
            // console.log(currentUser)
            setUser(currentUser);
     })
        return () => {
            return unsubsCribe();
        }
    },[])

   
    const authInfor = {
        user,
        loading,
        creatUser,
        login,
    }

    return (
        <AuthContext.Provider value={authInfor}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;
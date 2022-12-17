import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const Authprovider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const creatUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }
    useEffect(() => {
     const unsubsCribe=   onAuthStateChanged(auth, currentUser => {
            // console.log(currentUser)
         setUser(currentUser);
         setLoading(false)
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
        logOut
    }

    return (
        <AuthContext.Provider value={authInfor}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;
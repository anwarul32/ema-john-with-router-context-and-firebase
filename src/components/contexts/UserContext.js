import React, { createContext } from 'react';
import {  createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';

const auth = getAuth(app);

export const AuthContext = createContext();


const UserContext = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }



    const logOut = () => {
        return signOut(auth);
    }


    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log('Currently login user:', currentUser);
            setUser(currentUser);
            setLoading(false);
        }) 
        return() => unSubscribe()
    },[])
    const authInfo = {user, loading, createUser, signIn, logOut}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

import { auth } from '../firebase';

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    // Email login
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Email sign-up
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Google login
    const googleProvider = new GoogleAuthProvider();
    function signInWithGoogle() {
        return signInWithPopup(auth, googleProvider);
    }

    // Logout
    function logOut() {
        return signOut(auth);
    }

    // ตรวจสอบ user change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth" , currentUser);
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserAuthContext.Provider value={{ user, logIn, signUp, signInWithGoogle, logOut }}>
            {children}
        </UserAuthContext.Provider>
    );
}

// Custom hook
export function useUserAuth() {
    return useContext(UserAuthContext);
}

import React, { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        const ckuser = JSON.parse(localStorage.getItem('currentUser'));
        setIsLoggedIn(!!ckuser);
        const localUsers = JSON.parse(localStorage.getItem('users'));
        setUsers(localUsers || []);
        setCurrentUser(ckuser ? ckuser : false);
    }
        , []);

    const login = (user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
    };

    

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('users', JSON.stringify(users));
    }, [currentUser, users]);

    const logout = () => {
        localStorage.removeItem('currentUser');
        setIsLoggedIn(false);
        setCurrentUser(false);
    };

    


    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, currentUser, users, setUsers, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

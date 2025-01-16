import {ReactNode, useEffect, useState} from 'react';
import './App.css';
import {useAuth} from "./context/AuthProvider";
import {Navigate, Outlet} from "react-router-dom";

function App({children}: { children: ReactNode }) {
    const auth = useAuth();
    if (auth.token === '') {
        return <Navigate to={'/login'}/>
    }
    return children;
}

export default App;
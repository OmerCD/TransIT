import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from "./App"
import AuthProvider from "./context/AuthProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./pages/authentication/Login";
import {Home} from "./pages/home/Home";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path={`/login`} element={<Login/>}/>
                    <Route element={<App/>}>
                        <Route path={`/`} element={<Home/>}/>
                        <Route path={`/about`} element={<div>About</div>}/>
                        <Route path={`/logout`} element={<div>Logout</div>}/>
                        <Route path={`/account`} element={<div>Account</div>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)

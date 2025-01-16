import {createContext, ReactNode, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthService} from "../services/ApiService";

export type LoginType = {
    email: string;
    password: string;
    rememberMe: boolean | undefined;
};

interface ProviderProps {
    user: string | null;
    token: string,
    login: (data: LoginType) => void;
    logout: () => void;
}

const AuthContext = createContext<ProviderProps>({
    user: null,
    token: '',
    login: () => {
    },
    logout: () => {
    }
});

export const randomAlphaNumeric = (length: number) => {
    let s = '';
    Array.from({length}).some(() => {
        s += Math.random().toString(36).slice(2);
        return s.length >= length;
    });
    return s.slice(0, length);
};

const AuthProvider = ({children}: { children: ReactNode }) => {
    const storedInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;
    const [user, setUser] = useState<string | null>(storedInfo?.email);
    const [token, setToken] = useState<string>(storedInfo?.token || '');
    const navigate = useNavigate();

    const login = (data: LoginType) => {
        const authService = useAuthService()
        authService.login(data.email, data.password).then((response) => {
            const obj = {...data, token: response.token};
            setUser(data.email);
            setToken(response.token);
            localStorage.setItem('user', JSON.stringify(obj));
            navigate('/');
        });
    }

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}
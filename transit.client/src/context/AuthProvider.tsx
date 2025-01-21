import {createContext, ReactNode, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthService} from "../services/AuthService";
import {LoginResponseModel} from "../models/login-response-model";

export type LoginType = {
    email: string;
    password: string;
    rememberMe: boolean | undefined;
};

interface ProviderProps {
    user: LoginResponseModel | null;
    token: string,
    login: (data: LoginType) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<ProviderProps>({
    user: null,
    token: '',
    login: async () => {
    },
    logout: () => {
    }
});

const AuthProvider = ({children}: { children: ReactNode }) => {
    const storedInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;
    const [user, setUser] = useState<LoginResponseModel | null>(storedInfo);
    const [token, setToken] = useState<string>(storedInfo?.token || '');
    const navigate = useNavigate();

    const login = async (data: LoginType) => {
        const authService = useAuthService()
        const response = await authService.login(data.email, data.password);
        const obj = {...response};
        setUser(response);
        setToken(response.token);
        localStorage.setItem('user', JSON.stringify(obj));
        navigate('/');
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
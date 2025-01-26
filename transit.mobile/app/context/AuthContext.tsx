import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {RegisterResponseModel} from "../../models/register-response-model";
import {AuthError, CheckAuthError, useAuthService} from "../../services/AuthService";
import {LoginResponseModel} from "../../models/login-response-model";
import StorageService from "../../services/StorageService";

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (email: string, password: string) => Promise<RegisterResponseModel | AuthError>;
    onLogin?: (email: string, password: string) => Promise<LoginResponseModel | AuthError>;
    onLogout?: () => Promise<void>;
}


const TokenKey = "my-jwt";
export const ApiUrl = `http://localhost:5157/api`;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}: { children?: ReactNode }) => {
    const authService = useAuthService();
    const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean | null }>({
        token: null,
        authenticated: null,
    });
    
    const storageService = new StorageService();

    useEffect(() => {
        const loadToken = async () => {
            const token = await storageService.getItem(TokenKey);
            if (token){
                console.log(`stored token: ${token}`);
                authService.setToken(token);
                
                setAuthState({
                    token,
                    authenticated: true
                });
            }
        };
        
        loadToken();
    }, []);

    const register = async (email: string, password: string) => {
        const result = await authService.register({
            email,
            password,
            confirmPassword: password,
            firstName: "test",
            lastName: "test",
            username: email
        });
        
        if (CheckAuthError(result)) {
            return result as AuthError;
        }

        return result as RegisterResponseModel;
    }

    const login = async (email: string, password: string) => {
        const result = await authService.login(email, password);
        if (CheckAuthError(result)) {
            return result as AuthError;
        }

        const responseModel = result as LoginResponseModel;
        console.log(`🚀 ~ file: AuthContext.tsx ~ line 77 ~ login ~ result`, responseModel);

        setAuthState({
            token: responseModel!.token,
            authenticated: true
        });

        await storageService.setItem(TokenKey, responseModel!.token);
        return result;
    }
    
    const logout = async () => {
        await storageService.deleteItem(TokenKey);

        authService.logout();
        
        setAuthState({
            token: null,
            authenticated: false
        });
    }

    const value: AuthProps = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
    
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {RegisterResponseModel} from "../../models/register-response-model";
import {AuthError, CheckAuthError, useAuthService} from "../../services/AuthService";
import {LoginResponseModel} from "../../models/login-response-model";
import StorageService from "../../services/StorageService";
import {RegisterRequestModel} from "../../models/register-request-model";

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (registerModel: RegisterRequestModel) => Promise<RegisterResponseModel | AuthError>;
    onLogin?: (email: string, password: string) => Promise<LoginResponseModel | AuthError>;
    onLogout?: () => Promise<void>;
}


const TokenKey = "my-jwt";
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
                authService.setToken(token);
                
                setAuthState({
                    token,
                    authenticated: true
                });
            }
        };
        
        loadToken();
    }, []);

    const register = async (registerModel: RegisterRequestModel) => {
        const result = await authService.register(registerModel);
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
    
import './Login.css';
import {FormEvent, useState} from "react";
import {LoginType, useAuth} from "../../context/AuthProvider";


const Login = () => {
    const [loginData, setLoginData] = useState<LoginType>({email: 'omercd@hotmail.com.tr', password: '123456', rememberMe: false});
    const auth = useAuth();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        auth.login(loginData);
    }
    return (
        <div className={`login-container`}>
            <h1>Kullanıcı Girişi</h1>
            <form onSubmit={handleSubmit}>
                <div className={`login-form`}>
                    <input type="text" placeholder="E-Posta"
                           defaultValue={loginData.email}
                           onChange={e => setLoginData({...loginData, email: e.target.value})}/>
                    <input type="password" placeholder="Şifre"
                            defaultValue={loginData.password}
                           onChange={e => setLoginData({...loginData, password: e.target.value})}/>
                    <button type="submit">Giriş</button>
                </div>
            </form>
        </div>
    )
};

export {Login};
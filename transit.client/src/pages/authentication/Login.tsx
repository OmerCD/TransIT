import './Login.css';
import {FormEvent, useState} from "react";
import {LoginType, useAuth} from "../../context/AuthProvider";
import {Spinner} from "../../components/spinner/Spinner";


const Login = () => {
    const [loginData, setLoginData] = useState<LoginType>({
        email: 'omercd@hotmail.com.tr',
        password: '123456',
        rememberMe: false
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const auth = useAuth();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await auth.login(loginData);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className={`login-main`}>
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
                        <button type="submit">{loading ? <Spinner/> : `Giriş`}</button>
                    </div>
                </form>
                {error && <div className={`login-error`}>
                    E-Posta veya şifre hatalı
                </div>}
            </div>
            <div className={`login-footer`}>
                <a href={`/register`}>Kayıt Ol</a>
            </div>
        </div>
    )
};

export {Login};
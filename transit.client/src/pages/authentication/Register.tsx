import {FormEvent, useState} from "react";
import './Register.css';
import {useAuthService} from "../../services/AuthService";

class RegisterUserInfo {
    username: string = "DeepNightBlueSky";
    email: string = "semaozturk@gmail.com";
    firstName: string = "Sema";
    lastName: string = "Danacioglu";
    password: string = "123456";
    confirmPassword: string = "123456";
}

const Register = () => {
    const [userInfo, setUserInfo] = useState<RegisterUserInfo>(new RegisterUserInfo());
    const authService = useAuthService();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const registerResponseModel = await authService.register(userInfo);
        console.log(registerResponseModel);
    }

    return (
        <div className={`register-container`}>
            <div className={`register-header`}><h1>Kayıt Ol</h1></div>
            <form onSubmit={handleSubmit} className={`register-form`}>
                <input type="text" placeholder="E-Posta" value={userInfo.email}
                       onChange={e => setUserInfo({...userInfo, email: e.target.value})}/>
                <input type="text" placeholder="Kullanıcı Adı" value={userInfo.username}
                       onChange={e => setUserInfo({...userInfo, username: e.target.value})}/>
                <input type="text" placeholder="Ad" value={userInfo.firstName}
                       onChange={e => setUserInfo({...userInfo, firstName: e.target.value})}/>
                <input type="text" placeholder="Soyad" value={userInfo.lastName}
                       onChange={e => setUserInfo({...userInfo, lastName: e.target.value})}/>
                <input type="password" placeholder="Şifre" value={userInfo.password}
                       onChange={e => setUserInfo({...userInfo, password: e.target.value})}/>
                <input type="password" placeholder="Şifre Tekrar" value={userInfo.confirmPassword}
                       onChange={e => setUserInfo({...userInfo, confirmPassword: e.target.value})}/>
                <button type="submit">Kayıt Ol</button>
            </form>
            <div className={`register-footer`}>
                <a href={`/login`}>Giriş Yap</a>
            </div>
        </div>
    );
};

export {Register};
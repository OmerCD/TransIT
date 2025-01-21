import { useAuth } from "../../context/AuthProvider";
import "./Account.css";
const Account = () => {
    const auth = useAuth();
    return (
        <div>
            <h1>Hesap</h1>
            <p>Merhaba {auth.user.firstName}</p>
        </div>
    )
}

export {Account};
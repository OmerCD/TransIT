import './Navbar.css';
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../context/AuthProvider";

const Navbar = () => {
    const auth = useAuth();
    const location = useLocation();
    return (
        <nav className={`navbar`}>
            <div className={`navbar-left`}>
                <Link className={`navbar-home ${location.pathname === `/` ? `active` : ``}`} to={`/`}>TransIT</Link>
            </div>
            <div className={`navbar-center`}>
                <ul className={`nav-links`}>
                    <li><Link to={`/about`}>Hakkımızda</Link></li>
                    <li><Link onClick={() => auth.logout()} to={`/login`}>Çıkış</Link></li>
                </ul>
            </div>
            <div className={`navbar-right`}>
                <Link to={`/account`} className={`user-icon`}>
                    <FontAwesomeIcon icon={faUser}/>
                </Link>
            </div>
        </nav>
    );
};

export {Navbar};
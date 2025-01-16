import './Navbar.css';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return (
        <nav className={`navbar`}>
            <div className={`navbar-left`}>
                <Link to={`/`}>Transit</Link>
            </div>
            <div className={`navbar-center`}>
                <ul className={`nav-links`}>
                    <li><Link to={`/`}>Anasayfa</Link></li>
                    <li><Link to={`/about`}>Hakkımızda</Link></li>
                    <li><Link to={`/logout`}>Çıkış</Link></li>
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
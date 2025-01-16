import './App.css';
import {useAuth} from "./context/AuthProvider";
import {Navigate, Outlet} from "react-router-dom";
import {Navbar} from "./components/navbar/Navbar";

function App() {
    const auth = useAuth();
    if (auth.token === '') {
        return <Navigate to={'/login'}/>
    }
    return (<><Navbar/><Outlet/></>);
}

export default App;
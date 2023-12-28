import {MyButton} from "../button/MyButton";
import {Link, Navigate} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import {useContext} from "react";

export const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }
    return (
        <div className="navbar">
            <MyButton onClick={logout} style={{marginRight: '10px'}}>Logout</MyButton>
            <MyButton>
                <Link to={'/login'}>Login</Link>
            </MyButton>
            <div className="navbar__links">
                <Link to={'/posts'}>Posts</Link>
                <Link to={'/about'}>About</Link>
            </div>
        </div>
    )
}
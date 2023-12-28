import MyInput from "../components/UI/input/MyInput";
import {MyButton} from "../components/UI/button/MyButton";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = (event) => {
        event.preventDefault();
        setIsAuth(true);
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Enter login"/>
                <MyInput type="password" placeholder="Enter password"/>
                <MyButton>Enter</MyButton>
            </form>
        </div>
    )
}
import {Navigate, Route, Routes} from "react-router-dom";
import React, {useContext} from "react";
import {privateRoutes, publicRoutes} from "../router/route";
import {AuthContext} from "../context/AuthContext";

export const AppRouter = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    console.log(isAuth);
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                        exact={route.exact}
                    />
                )}
                <Route path="/login" element={<Navigate to={'/'}/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                        exact={route.exact}
                    />
                )}
                <Route path="/*" element={<Navigate to={'/login'}/>}/>
            </Routes>
    )
}
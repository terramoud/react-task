import {Posts} from "../pages/Posts";
import {PostIdPage} from "../pages/PostIdPage";
import {About} from "../pages/About";
import {ErrorPage} from "../pages/ErrorPage";
import {Login} from "../pages/Login";

export const privateRoutes = [
    {path: '/', component: <Posts />, exact: true},
    {path: '/posts', component: <Posts />, exact: true},
    {path: '/posts/:id', component: <PostIdPage />, exact: true},
    {path: '/about', component: <About />, exact: true},
    {path: '*', component: <ErrorPage />},
]

export const publicRoutes = [
    {path: '/login', component: <Login />, exact: true},
]
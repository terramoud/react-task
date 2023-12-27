import {Route, Routes} from "react-router-dom";
import {Posts} from "../pages/Posts";
import {About} from "../pages/About";
import {ErrorPage} from "../pages/ErrorPage";
import React from "react";
import {PostIdPage} from "../pages/PostIdPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Posts />} />
            <Route exact path="/posts" element={<Posts />} />
            <Route exact path="/posts/:id" element={<PostIdPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}
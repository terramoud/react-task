import {Route, Routes} from "react-router-dom";
import {Posts} from "../pages/Posts";
import {About} from "../pages/About";
import {ErrorPage} from "../pages/ErrorPage";
import React from "react";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}
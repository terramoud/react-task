import './styles/App.css';
import React from "react";
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import {Navbar} from "./components/UI/Navbar";
import {AppRouter} from "./components/AppRouter";


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    )
}

export default App;
import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";


export default function Navbar() {
    return (
        <nav className="c-navbar">
            <div className="c-navbar__logo">
                <NavLink to="/" exact className="c-navbar__logo-link">My Locations</NavLink>
            </div>
        </nav>
    );
}
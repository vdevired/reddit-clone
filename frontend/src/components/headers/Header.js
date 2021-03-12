// Unauthenticated header
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <div className="header__section">
                <Link to="/" className="header__logo"></Link>
            </div>

            <div className="header__section">
                <div className="header__search">
                    <i className="fa fa-search"></i>
                    <input placeholder="Search" />
                </div>
            </div>

            <div className="header__section">
                <button className="btn btn--secondary">Log In</button>
                <button className="btn btn--primary">Sign Up</button>
                <button className="btn btn--header">
                    <i className="fa fa-user"></i>
                    <i className="fa fa-sort-down"></i>
                </button>
            </div>
        </div>
    );
};

export default Header;

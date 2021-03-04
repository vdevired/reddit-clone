// The box in which the form sits

import React from "react";
import authImg from "../../static/img/auth-img.png";

const AuthContainer = ({ formTitle, Form, onSubmit, onClose }) => {
    return (
        <div className="auth-container">
            <img
                src={authImg}
                className="auth-container__image"
                alt="auth-img"
            />
            <div className="auth-container__main">
                <p className="auth-container__title">{formTitle}</p>
                <p className="auth-container__subtitle">
                    By continuing, you agree to our{" "}
                    <a className="link" href="#">
                        User Agreement
                    </a>{" "}
                    and{" "}
                    <a className="link" href="#">
                        Privacy Policy
                    </a>
                    .
                </p>
                {/* Continue with google and continue with apple buttons */}
                <Form onSubmit_={onSubmit}></Form>
            </div>
            <button onClick={onClose}>
                <i className="far fa-times close"></i>
            </button>
        </div>
    );
};

export default AuthContainer;

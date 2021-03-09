// Encapsulates the entire sign up experience

import React, { useState, useContext } from "react";
import AuthContainer from "./AuthContainer";
import SignUpEmailForm from "./SignUpEmailForm";
import SignUp2 from "./SignUp2";
import SignUp3 from "./SignUp3";
import axios from "axios";
import { backendUrl } from "../../static/js/constants";

import globalContext from "../../context/globalContext";

const SignUp = () => {
    const [curPage, setCurPage] = useState(1);
    const [email, setEmail] = useState("");

    const onSubmitPage1 = (data) => {
        // Check whether we can call this or not in SignUpEmailForm
        setCurPage(2);
        setEmail(data.email);
    };

    const onSubmit = async (data) => {
        // Page 2's submit - also the final submit
        if (email.length) {
            data = {
                ...data,
                email,
            };
        }

        try {
            await axios.post(`${backendUrl}/api/users`, data);
            setCurPage(3);
        } catch (err) {
            if (err.response == null) {
                // Toast to check internet connection
            }
            // Else error 400, no need to show error message as request was malicious - they went past JS validation
        }
    };

    const { hideSignUpFunc } = useContext(globalContext);

    return (
        <>
            {curPage === 1 && (
                <AuthContainer
                    formTitle="Sign Up"
                    Form={SignUpEmailForm}
                    onSubmit={onSubmitPage1}
                    onClose={hideSignUpFunc}
                />
            )}
            {curPage === 2 && (
                <SignUp2 setCurPage={setCurPage} onSubmit={onSubmit} />
            )}
            {/* Pass setCurPage directly here as no intermediate component (AuthContainer) or need for setEmail. And we need it for back button. */}
            {curPage === 3 && <SignUp3 />}
        </>
    );
};

export default SignUp;

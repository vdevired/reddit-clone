// Encapsulates entire login experience
import React, { useContext } from "react";
import AuthContainer from "../AuthContainer";
import LoginForm from "./LoginForm";
import axios from "axios";
import { backendUrl } from "../../../static/js/constants";
import globalContext from "../../../context/globalContext";

const Login = () => {
    const { login } = useContext(globalContext);

    const onSubmit = async (data) => {
        // Returns true if login was successful, false if 401
        try {
            const { data: resData } = await axios.post(
                `${backendUrl}/rpc/login`,
                data
            );
            login(resData);
            return true;
        } catch (err) {
            if (!err.response) {
                // Toast to check internet connection
            }
            // Error 401
            return false;
        }
    };

    return (
        <AuthContainer
            formTitle="Login"
            Form={LoginForm}
            onSubmit={onSubmit}
            onClose={null}
        />
    );
};

export default Login;

// The form, to be rendered in AuthContainer

import React, { useState, useEffect } from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";

const LoginForm = ({ onSubmit }) => {
    const { register, watch, handleSubmit } = useForm();

    // Username stuff
    // Only validate length, no regex validation
    const username = watch("username", "");
    const [hasAttemptedUsername, setHasAttemptedUsername] = useState(false); // Only show error checkmark after this is true

    const isUsernameBad =
        hasAttemptedUsername && (username.length < 3 || username.length > 20);
    const isUsernameGood =
        hasAttemptedUsername && username.length >= 3 && username.length <= 20;

    const [error401, setError401] = useState({
        username: false,
        password: false,
    }); // Has a login been attempted, if so, was it error 401?
    const usernameErrorMessages = [
        {
            show: isUsernameBad,
            text: "Username must be between 3 and 20 characters",
        },
        {
            show: error401.username,
            text: "Incorrect username or password ",
        },
    ];

    // No Password Validation as Reddit does not show error message for password on login
    const password = watch("username", "");

    // If you get error 401, and then change username such that it is between 3 and 20 characters, isGood should be true but for password it should
    // still be false. That is why error401 is an object
    useEffect(() => {
        if (error401.username) setError401({ username: false, password: true });
    }, [username]);

    const onSubmitWrapper = async (data) => {
        const loginSuccessful = await onSubmit(data);
        if (!loginSuccessful) setError401({ username: true, password: true });
    };

    return (
        <form onSubmit={handleSubmit(onSubmitWrapper)} noValidate>
            <Input
                name="username"
                type="text"
                placeholder="USERNAME"
                formRef={register({
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                })}
                isBad={isUsernameBad || error401.username}
                isGood={isUsernameGood && !error401.username}
                setHasAttempted={setHasAttemptedUsername}
                errorMessages={usernameErrorMessages}
            />
            <Input
                name="password"
                type="password"
                placeholder="PASSWORD"
                formRef={register({ required: true })}
                isBad={error401.password}
            />
            <button
                type="submit"
                className="btn btn--primary"
                disabled={isUsernameBad || password.length === 0}
            >
                Log In
            </button>
        </form>
    );
};

export default LoginForm;

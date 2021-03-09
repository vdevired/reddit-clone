// AuthContainer and SignUpEmailForm together make up SignUp1

import React, { useState, useCallback, useContext } from "react";
import Input from "./Input";
import useAxiosGet from "../../hooks/useAxiosGet";
import _ from "lodash";
import { useForm } from "react-hook-form";

import globalContext from "../../context/globalContext";

const SignUp2 = ({ setCurPage, onSubmit }) => {
    const { register, watch, handleSubmit } = useForm();

    // Username stuff
    const username = watch("username", "");
    const [usernameQuery, setUsernameQuery] = useState(""); // The string used to ask backend if username is unique
    const [hasAttemptedUsername, setHasAttemptedUsername] = useState(false);
    const isUsernameRightLength = username.length >= 3 && username.length <= 20;

    const regex = new RegExp("^[A-Za-z0-9_-]+$");
    const isUsernameValid = regex.test(username);

    const { data } = useAxiosGet(
        `/rpc/isUsernameUnique?username=${usernameQuery}`,
        true,
        false,
        isUsernameRightLength && isUsernameValid
    );
    const isUsernameUnique = data?.unique || false;

    const debouncedSetter = useCallback(
        _.debounce((q) => setUsernameQuery(q), 500),
        [setUsernameQuery]
    );

    const isUsernameBad =
        hasAttemptedUsername &&
        (!isUsernameRightLength || !isUsernameValid || !isUsernameUnique);
    const isUsernameGood =
        hasAttemptedUsername &&
        isUsernameRightLength &&
        isUsernameValid &&
        isUsernameUnique;
    const errorMessagesUsername = [
        {
            show: hasAttemptedUsername && !isUsernameRightLength,
            text: "Username must be between 3 and 20 characters.",
        },
        {
            show:
                hasAttemptedUsername &&
                isUsernameRightLength &&
                !isUsernameValid,
            text:
                "Letters, numbers, dashes, and underscores only. Please try again without symbols.",
        },
        {
            show:
                hasAttemptedUsername &&
                isUsernameRightLength &&
                isUsernameValid &&
                !isUsernameUnique,
            text: "That username has already been taken.",
        },
    ];

    // Password stuff
    const password = watch("password", "");
    const [hasAttemptedPassword, setHasAttemptedPassword] = useState(false);
    const isPasswordValid = password.length >= 6;

    const isPasswordBad = hasAttemptedPassword && !isPasswordValid;
    const isPasswordGood = hasAttemptedPassword && isPasswordValid;
    const errorMessagesPassword = [
        {
            show: hasAttemptedPassword && !isPasswordValid,
            text: "Password must be at least 6 characters.",
        },
    ];

    const { hideSignUpFunc } = useContext(globalContext);

    return (
        <div className="sign-up-2">
            <div className="sign-up-2__header">
                <p className="sign-up-2__title">Choose your username</p>
                <p className="sign-up-2__subtitle">
                    Your username is how other community members will see you.
                    This name will be used to credit you for things you share on
                    Reddit. What should we call you?
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name="username"
                    type="text"
                    placeholder="USERNAME"
                    formRef={register({
                        required: true,
                        minLength: 3,
                        maxLength: 20,
                    })}
                    isBad={isUsernameBad}
                    isGood={isUsernameGood}
                    setHasAttempted={setHasAttemptedUsername}
                    errorMessages={errorMessagesUsername}
                    debouncedSetter={debouncedSetter}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="PASSWORD"
                    formRef={register({ required: true, minLength: 6 })}
                    isBad={isPasswordBad}
                    isGood={isPasswordGood}
                    setHasAttempted={setHasAttemptedPassword}
                    errorMessages={errorMessagesPassword}
                />
                <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={
                        !isUsernameRightLength ||
                        !isUsernameValid ||
                        !isUsernameUnique ||
                        !isPasswordValid
                    }
                >
                    Sign Up
                </button>
            </form>
            <div className="sign-up-2__footer">
                <a
                    className="link link--secondary"
                    onClick={() => setCurPage(1)}
                >
                    Back
                </a>
            </div>
            <button className="close" onClick={hideSignUpFunc}>
                <i className="far fa-times"></i>
            </button>
        </div>
    );
};

export default SignUp2;

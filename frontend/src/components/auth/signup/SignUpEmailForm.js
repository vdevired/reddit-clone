import React, { useState, useCallback, useContext } from "react";
import Input from "../Input";
import { validateEmail } from "../../../static/js/utils";
import _ from "lodash";
import useAxiosGet from "../../../hooks/useAxiosGet";
import { useForm } from "react-hook-form";
import globalContext from "../../../context/globalContext";

const SignUpEmailForm = ({ onSubmit }) => {
    const { hideSignUpFunc, showLoginFunc } = useContext(globalContext);
    const { register, watch, handleSubmit } = useForm();

    const email = watch("email", "");
    const [emailQuery, setEmailQuery] = useState(""); // Not updated instantly like email. Used to query backend to check if email is unique
    const [hasAttempted, setHasAttempted] = useState(false); // Only show error checkmark after this is true

    const debouncedSetter = useCallback(
        _.debounce((q) => setEmailQuery(q), 500),
        [setEmailQuery]
    );

    const isEmailValid = validateEmail(email);
    const { data } = useAxiosGet(
        `/rpc/isEmailUnique?email=${emailQuery}`,
        true,
        false,
        isEmailValid
    );
    const isEmailUnique = data?.unique || false;

    const isBad =
        hasAttempted && email.length !== 0 && (!isEmailValid || !isEmailUnique);
    const isGood = hasAttempted && isEmailValid && isEmailUnique;

    const errorMessages = [
        {
            show: hasAttempted && email.length !== 0 && !isEmailValid,
            text: "Please fix your email to continue.",
        },
        {
            show: hasAttempted && isEmailValid && !isEmailUnique,
            text: "That email has already been taken.",
        },
    ];

    const toggleSignUp = () => {
        hideSignUpFunc();
        showLoginFunc();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
                name="email"
                type="email"
                placeholder="EMAIL"
                formRef={register}
                isBad={isBad}
                isGood={isGood}
                setHasAttempted={setHasAttempted}
                errorMessages={errorMessages}
                debouncedSetter={debouncedSetter}
            />
            <button
                type="submit"
                className="btn btn--primary"
                disabled={
                    email.length !== 0 && (!isEmailUnique || !isEmailUnique)
                }
            >
                Continue
            </button>
            <p className="auth-container__midtitle">
                Already a redditor?{" "}
                <a className="link link--strong" onClick={toggleSignUp}>
                    LOG IN
                </a>
            </p>
        </form>
    );
};

export default SignUpEmailForm;

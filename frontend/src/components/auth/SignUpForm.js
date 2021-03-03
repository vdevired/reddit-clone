import React, { useState, useCallback } from "react";
import { validateEmail } from "../../static/js/utils";
import _ from "lodash";
import useAxiosGet from "../../hooks/useAxiosGet";

const SignUpForm = () => {
    const [email, setEmail] = useState(""); // What is typed in the input element
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

    const isBad = hasAttempted && (!isEmailValid || !isEmailUnique);
    const isGood = hasAttempted && isEmailValid && isEmailUnique;

    const handleSubmit = () => {};

    return (
        <form onSubmit={handleSubmit}>
            <div
                className={`input ${isBad && "input--bad"} ${
                    isGood && "input--good"
                }`}
            >
                <input
                    type="email"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        debouncedSetter(e.target.value);
                    }}
                    onBlur={() => setHasAttempted(true)}
                />
                {isBad && <i className="fas fa-exclamation"></i>}
                {isGood && <i class="far fa-check"></i>}
            </div>
            {hasAttempted && !isEmailValid && (
                <p className="error-text">Please fix your email to continue.</p>
            )}
            {hasAttempted && isEmailValid && !isEmailUnique && (
                <p className="error-text">This email has already been taken.</p>
            )}
            <button type="submit" className="btn btn--primary">
                Continue
            </button>
        </form>
    );
};

export default SignUpForm;

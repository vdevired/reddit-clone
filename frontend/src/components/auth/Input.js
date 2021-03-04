import React from "react";
import {v4 as uuidv4} from "uuid";

const Input = ({
    name,
    type,
    placeholder,
    formRef,
    isBad,
    isGood,
    setHasAttempted,
    errorMessages, // An array of objects, with message key and show key
    debouncedSetter,
}) => {
    return (
        <>
            <div
                className={`input ${isBad && "input--bad"} ${
                    isGood && "input--good"
                }`}
            >
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    ref={formRef}
                    onChange={(e) => {
                        if (debouncedSetter) debouncedSetter(e.target.value);
                    }}
                    onBlur={() => {
                        if (setHasAttempted) setHasAttempted(true);
                    }}
                />
                {isBad && <i className="fas fa-exclamation"></i>}
                {isGood && <i className="far fa-check"></i>}
            </div>
            {errorMessages.map(
                ({ text, show }) => show && <p key={uuidv4()} className="error-text">{text}</p>
            )}
        </>
    );
};

Input.defaultProps = {
    setHasAttempted: null,
    errorMessages: [],
    debouncedSetter: null,
};

export default Input;

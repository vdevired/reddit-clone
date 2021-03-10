import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";

import globalContext from "./globalContext";
import {
    globalReducer,
    SHOW_SIGN_UP,
    HIDE_SIGN_UP,
    SHOW_LOGIN,
    HIDE_LOGIN,
} from "./globalReducer";

const GlobalProvider = (props) => {
    const history = useHistory();
    const [globalState, dispatch] = useReducer(globalReducer, {
        authUser: null,
        checkedAuth: false,
        showSignUp: false,
        showLogin: true,
    });

    const showSignUpFunc = () => {
        dispatch({ type: SHOW_SIGN_UP });
    };

    const hideSignUpFunc = () => {
        dispatch({ type: HIDE_SIGN_UP });
    };

    const showLoginFunc = () => {
        dispatch({ type: SHOW_LOGIN });
    };

    const hideLoginFunc = () => {
        dispatch({ type: HIDE_LOGIN });
    };

    return (
        <globalContext.Provider
            value={{
                authUser: globalState.authUser,
                checkedAuth: globalState.checkedAuth,
                showSignUp: globalState.showSignUp,
                showLogin: globalState.showLogin,
                showSignUpFunc,
                hideSignUpFunc,
                showLoginFunc,
                hideLoginFunc,
            }}
        >
            {props.children}
        </globalContext.Provider>
    );
};

export default GlobalProvider;

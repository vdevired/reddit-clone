import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";

import globalContext from "./globalContext";
import { globalReducer, SHOW_SIGN_UP, HIDE_SIGN_UP } from "./globalReducer";

const GlobalProvider = (props) => {
    const history = useHistory();
    const [globalState, dispatch] = useReducer(globalReducer, {
        authUser: null,
        checkedAuth: false,
        showSignUp: true,
    });

    const showSignUpFunc = () => {
        dispatch({ type: SHOW_SIGN_UP });
    };

    const hideSignUpFunc = () => {
        dispatch({ type: HIDE_SIGN_UP });
    };

    return (
        <globalContext.Provider
            value={{
                authUser: globalState.authUser,
                checkedAuth: globalState.checkedAuth,
                showSignUp: globalState.showSignUp,
                showSignUpFunc,
                hideSignUpFunc,
            }}
        >
            {props.children}
        </globalContext.Provider>
    );
};

export default GlobalProvider;

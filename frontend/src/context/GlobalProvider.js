import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";

import { backendUrl } from "../static/js/constants";
import { authAxios } from "../static/js/utils";
import globalContext from "./globalContext";
import {
    globalReducer,
    SHOW_SIGN_UP,
    HIDE_SIGN_UP,
    SHOW_LOGIN,
    HIDE_LOGIN,
    LOGIN,
    LOGOUT,
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

    const login = async (resData) => {
        localStorage.setItem("accessToken", resData.accessToken);
        localStorage.setItem("refreshToken", resData.refreshToken);
        const url = `${backendUrl}/me/`;

        const { data: user } = await authAxios.get(url);
        dispatch({ type: LOGIN, user });
        history.push("/");
    };

    const checkAuth = async () => {
        const url = `${backendUrl}/rpc/me/`;
        try {
            const { data: user } = await authAxios.get(url);
            dispatch({ type: LOGIN, user });
        } catch (err) {
            dispatch({ type: LOGOUT });
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({ type: LOGOUT });
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
                login,
                checkAuth,
                logout,
            }}
        >
            {props.children}
        </globalContext.Provider>
    );
};

export default GlobalProvider;

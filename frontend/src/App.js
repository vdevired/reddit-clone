import { Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import SignUp from "./components/auth/signup/SignUp";
import Login from "./components/auth/login/Login";

import CreateCommunity from "./components/CreateCommunity";

import globalContext from "./context/globalContext";

function App() {
    const { showSignUp, showLogin, checkAuth, checkedAuth } = useContext(
        globalContext
    );

    useEffect(() => {
        checkAuth();
    }, []);

    // We don't want to commit to either of the headers before validating access token. Otherwise rapidly swapping them out could create a weird look
    if (!checkedAuth) {
        return null;
    }

    return (
        <>
            {/*<CreateCommunity />*/}
            {showSignUp && <SignUp />}
            {showLogin && <Login />}
            <BrowserRouter></BrowserRouter>
        </>
    );
}

export default App;

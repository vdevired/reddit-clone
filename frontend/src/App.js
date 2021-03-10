import { Route } from "react-router-dom";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";

import SignUp from "./components/auth/signup/SignUp";
import Login from "./components/auth/login/Login";

import CreateCommunity from "./components/CreateCommunity";

import globalContext from "./context/globalContext";

function App() {
    const { showSignUp, showLogin } = useContext(globalContext);
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

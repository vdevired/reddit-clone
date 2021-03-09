import { Route } from "react-router-dom";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";

import SignUp from "./components/auth/SignUp";
import CreateCommunity from "./components/CreateCommunity";

import globalContext from "./context/globalContext";

function App() {
    const { showSignUp } = useContext(globalContext);
    return (
        <>
            <CreateCommunity />
            {showSignUp && <SignUp />}
            <BrowserRouter></BrowserRouter>
        </>
    );
}

export default App;

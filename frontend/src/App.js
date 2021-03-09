import { Route } from "react-router-dom";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";

import SignUp from "./components/auth/SignUp";

import globalContext from "./context/globalContext";

function App() {
    const { showSignUp } = useContext(globalContext);
    return (
        <>
            {showSignUp && <SignUp />}
            <BrowserRouter></BrowserRouter>
        </>
    );
}

export default App;

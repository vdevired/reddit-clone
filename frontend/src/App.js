import { Route } from "react-router-dom";
import AuthContainer from "./components/auth/AuthContainer";
import SignUpForm from "./components/auth/SignUpForm";

function App() {
    return (
        <Route
            path="/"
            render={(props) => (
                <AuthContainer
                    {...props}
                    formTitle="Sign Up"
                    Form={SignUpForm}
                />
            )}
        />
    );
}

export default App;

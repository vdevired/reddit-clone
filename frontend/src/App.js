import { Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";

function App() {
    return <Route path="/" component={SignUp} />;
}

export default App;

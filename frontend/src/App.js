import { Route } from "react-router-dom";
import HomeBox from "./components/right-sidebar/HomeBox";

function App() {
    return <Route path="/" component={HomeBox} />;
}

export default App;

import { Route } from "react-router-dom";
import TodaysCommunities from "./components/TodaysCommunities";

function App() {
    return <Route path="/" component={TodaysCommunities} />;
}

export default App;

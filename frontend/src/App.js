import { Route } from "react-router-dom";
import TrendingCommunities from "./components/TrendingCommunities";

function App() {
    return <Route path="/" component={TrendingCommunities} />;
}

export default App;

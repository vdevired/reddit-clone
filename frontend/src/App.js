import { Route } from "react-router-dom";
import Header from "./components/headers/Header";
import CardPost from "./components/posts/CardPost";
import SortBar from "./components/SortBar";

function App() {
    return <Route path="/" component={SortBar} />;
}

export default App;

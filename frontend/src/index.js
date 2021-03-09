import React from "react";
import ReactDOM from "react-dom";
import "./static/css/index.css";
import App from "./App";

import GlobalProvider from "./context/GlobalProvider";

ReactDOM.render(
    <React.StrictMode>
        <GlobalProvider>
            <App />
        </GlobalProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

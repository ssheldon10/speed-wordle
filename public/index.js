import React from "react";
import ReactDOM from "react-dom/client";
import {
    HashRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import "./index.css";
import App from "../src/App";

const gameContainer = document.getElementById("wordle");
const gameRoot = ReactDOM.createRoot(gameContainer);
gameRoot.render(
    <React.StrictMode>
        <App />
        {/* <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <h1>:( oops</h1>
                            <App />
                        </div>
                    }
                    // <Navigate replace to={`/4/${getRndInteger(1, 65536)}`} />
                />
                <Route path="/:num_games/:seed" element={<App />} />
            </Routes>
        </Router> */}
    </React.StrictMode>
);

// gameRoot.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

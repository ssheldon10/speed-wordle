import React from "react";
import ReactDOM from "react-dom/client";
import {
    HashRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import "./index.css";
import App from "./App";

function getRndInteger(min, max) {
    const val = Math.floor(Math.random() * (max - min)) + min;
    return val;
}

const gameContainer = document.getElementById("wordle");
const gameRoot = ReactDOM.createRoot(gameContainer);
gameRoot.render(
    <Router>
        <Routes>
            <Route
                path="/"
                element={
                    <Navigate replace to={`/4/${getRndInteger(1, 65536)}`} />
                }
            />
            <Route path="/:num_games/:seed" element={<App />} />
        </Routes>
    </Router>
);

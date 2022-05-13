import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useParams,
  } from "react-router-dom";

import './index.css'
// import App from './App'
import Game from './Game'


function App(props) {
    const {num_games, seed} = useParams();
    if (num_games == null)  {
        return (
            <Game num_games={4} rng_seed="null"/>
        );
    } else {
        return (
            <Game num_games={num_games} rng_seed={seed}/>
        );
    }
}

const domContainer = document.getElementById('wordle');
const root = ReactDOM.createRoot(domContainer);
root.render(
    <Router>
    <Routes>
        <Route 
        path="/"
        element={<App />}
        />
        <Route
        path="/:num_games/:seed"
        element={<App />}
        />
    </Routes>
    </Router>
);
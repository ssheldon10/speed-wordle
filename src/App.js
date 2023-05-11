import React from "react";
import { useParams, Navigate } from "react-router-dom";

import useTimer from "easytimer-react-hook";
import Header from "./Header";
import Game from "./Game";

function getRndInteger(min, max) {
    const val = Math.floor(Math.random() * (max - min)) + min;
    return val;
}

function App(props) {
    // const { num_games, seed } = useParams();
    const [timer, isTargetAchieved] = useTimer();

    // if (num_games == null || seed == null) {
    //     return <Navigate replace to={`/4/${getRndInteger(1, 65536)}`} />;
    // }

    let num_games = 4;
    let seed = getRndInteger(1, 65536);

    return (
        <div className="App" key={seed}>
            <Game num_games={num_games} rng_seed={seed} timer={timer} />
        </div>
    );
}

export default App;

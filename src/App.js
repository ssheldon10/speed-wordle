import React from 'react'
import { useParams } from 'react-router-dom'

import useTimer from 'easytimer-react-hook'
import Header from './Header'
import Game from './Game'


function App(props) {
    const {num_games, seed} = useParams();
    const [timer, isTargetAchieved] = useTimer();

    return (
        <div className="App" key={seed}>
            <Header timer={timer} key={seed}/>
            <Game num_games={num_games} rng_seed={seed} timer={timer}/>
        </div>
    );
}

export default App
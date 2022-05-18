import React from 'react'
import { Link } from 'react-router-dom'

function getRndInteger(min, max) {
    const val = Math.floor(Math.random() * (max - min) ) + min;
    return val;
}

function Header(props) {

    return(
        <div className="header">
            <div id="leftTabs">
                <h1>Spordle</h1>
                <p>- for all your speed wordle needs</p>
                <Link to={`/4/${getRndInteger(1, 65536)}`}>Home</Link>
            </div>
            <div id="timer">{props.timer.getTimeValues().toString()}</div>
      </div>
    );
}

export default Header
import React, {Component} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

import Board from './Board'
import Keyboard from './Keyboard'
import La from './La'
import Ta from './Ta'

function randomWords(n, func) {
    var ids = [];

    for (let i = 0; i  < n; i++) {
        const idx = Math.floor(func() * La.length);
        if (ids.indexOf(idx) !== -1) {
            i--;
        } else {
            ids.push(idx);
        }
    }
    return ids.map((v) => La[v].toUpperCase());

}

function validateAnswer(guess) {
    if (guess.length > 5) {
        alert("Somehow word is too long nice job");
        return false;
    } else if (guess.length !== 5) {
        alert("Not enough letters!");
        return false;
    } else if (!(Ta.includes(guess.toLowerCase()) || La.includes(guess.toLowerCase()))){
        alert("Not a valid word!");
        return false;
    } else {
        return true;
    }
}

function initMap() {
    var m = new Map();
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 26; i++) {
        m.set(abc[i],  "default");
    }
    return m;
}




class Game extends Component {

    constructor(props) {
        super(props);

        var rng_seed = props.rng_seed;
        if (props.rng_seed === "null") {
            rng_seed = Math.seedrandom();
            this.rng = Math.random;
        } else {
            this.rng = new Math.seedrandom(props.seed);
        }

        this.state = {
            seed: rng_seed,
            rng: this.rng,
            words: randomWords(this.props.num_games, this.rng),
            guesses: [],
            curr_guess: "",
            curr_guess_idx: 0,
            boards: Array(parseInt(props.num_games)).fill(false),
            keyMap: initMap(),
            won: null,
            finished: false,
        };
        this.curr_guess = "";
        this.num_guesses = Math.ceil(parseInt(props.num_games)*1.25) + 3;

    }

    

    handleAnswer(event) {
        if (!this.state.finished) {
            if (event.key.toLowerCase() === "enter") {
                event.preventDefault();
                if (validateAnswer(this.state.curr_guess)) {
                    this.setState((prevState) => ({
                        curr_guess: "",
                        guesses: [...prevState.guesses, prevState.curr_guess], 
                        curr_guess_idx: prevState.curr_guess_idx + 1,
                    }));
                    this.checkGameStatus(this.state.curr_guess);
                }
            } else if (event.key === "Backspace" || event.key === "del") {
                this.setState((prevState) => ({
                    curr_guess: prevState.curr_guess.slice(0, -1),
                }));
            } else if (this.state.curr_guess.length < 5 && /^[a-zA-Z]$/.test(event.key)) {
                this.setState((prevState) => ({
                    curr_guess: prevState.curr_guess + event.key.toUpperCase(),
                }));
            }
        }
    }

    checkGameStatus(guess) {
        const boards = this.state.boards.slice();
        const idx = this.state.words.indexOf(guess);
        if (idx !== -1) {
            boards[idx] = true;
            this.setState({
                boards: boards,
            });

            if (boards.indexOf(false) === -1) {
                this.finishGame(true);
            }
        } else if (this.state.curr_guess_idx >= this.num_guesses-1) {
            this.finishGame(false);
        }
    }

    finishGame(won){
        // alert("Nice job! Game done in "+(this.state.curr_guess_idx-1)+"/"+(this.props.num_guesses));
        this.setState({
            finished: true,
            won: won,
        });
    }

    processLetters(guess, correct) {
        var classes = Array(5).fill("default");
        for (let i = 0; i < correct.length; i++) {
            const guess_c = guess[i];
            const curr_c = correct[i];
            if (guess_c === curr_c) {
                classes[i] = "correct";
                this.state.keyMap.set(guess_c, "correct");
            } else if (correct.indexOf(guess_c) !== -1) {
                classes[i] = "close";
                this.state.keyMap.set(guess_c, "close");
            } else {
                this.state.keyMap.set(guess_c, "unused");
                classes[i] = "default";
            }
        }
        return classes;
    }


    renderBoard(correct, num_guesses, finished) {
        return <Board correct={correct} 
            num_guesses={num_guesses} 
            key={correct} 
            guesses={this.state.guesses} 
            curr={this.state.curr_guess} 
            g_idx={this.state.curr_guess_idx} 
            checkFunc={this.processLetters.bind(this)}
            finished={finished}
        />;
    }

    renderKeyboard() {
        return <Keyboard keyStatus={this.state.keyMap} action={this.handleAnswer.bind(this)}/>;
    }

    
    render() {

        const boards = [...Array(parseInt(this.props.num_games)).keys()].map((idx) => {
            return this.renderBoard(this.state.words[idx], this.num_guesses, this.state.boards[idx]);
        });

        return (
            <div className="app" tabIndex="0" onKeyDown={this.handleAnswer.bind(this)}>
                <Link to={`${this.props.num_games}/${this.state.seed}`}/>
                <div className="boards">
                    {boards}
                </div>
                {this.renderKeyboard()}
                
            </div>
        );

    }

    componentDidUpdate() {
        if (this.state.finished === true) {
            if (this.state.won) {
                alert("Nice job! Won in " + this.state.curr_guess_idx + "/" + this.num_guesses);
            } else {
                alert("OOPS YOU LOST SUCKA X/" + this.num_guesses);
            }
        }
    }
}

export default Game
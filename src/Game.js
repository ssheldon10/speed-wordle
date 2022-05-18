import React, {Component} from 'react'

import Board from './Board'
import Keyboard from './Keyboard'
import La from './La'
import Ta from './Ta'

// Function that checks parameters of guess to make sure it is a valid 5 letter word
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

// Function that initalizes keymap for each alphabet letter with "default" status
function initMap() {
    var m = new Map();
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 26; i++) {
        m.set(abc[i],  "default");
    }
    m.set("Del",  "default");
    m.set("Enter",  "default");

    return m;
}


class Game extends Component {

    constructor(props) {
        super(props);
        this.rng = new Math.seedrandom(props.rng_seed);

        props.timer.reset();
        props.timer.stop();
        

        this.state = {
            rng_seed: props.rng_seed,
            rng: this.rng,
            words: this.randomWords(this.props.num_games, this.rng),
            guesses: [],
            curr_guess: "",
            curr_guess_idx: 0,
            boards: Array(parseInt(props.num_games)).fill(false),
            keyMaps: Array(parseInt(props.num_games)).fill(initMap()),
            won: null,
            finished: false,
            started: false,
        };
        this.curr_guess = "";
        this.num_guesses = Math.ceil(parseInt(props.num_games)*1.25) + 3;

    }

    randomWords(n, func) {
        var ids = [];
    
        for (let i = 0; i  < n; i++) {
            var val = func();
            const idx = Math.floor(val * La.length);
            if (ids.indexOf(idx) !== -1) {
                i--;
            } else {
                ids.push(idx);
            }
        }
        return ids.map((v) => La[v].toUpperCase());
    
    }

    

    handleAnswer(event) {
        if (!this.state.finished) {
            if (event.key.toLowerCase() === "enter") {
                // Stop the default repsonse of submitting the form
                // This line prevents submitting an empty guess
                event.preventDefault();

                // Make sure the guess is a valid word before updating the state
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

    // Updates the status of the game upon receiving a valid guess
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
            this.setState({
                boards: Array(parseInt(this.props.num_games)).fill(true),
            });
        }
    }


    finishGame(won){
        this.setState({
            finished: true,
            won: won,
        });
    }


    processLetters(guess, correct, idx) {
        var classes = Array(5).fill("default");
        var newMap = new Map(this.state.keyMaps[idx]);
        for (let i = 0; i < correct.length; i++) {
            const guess_c = guess[i];
            const curr_c = correct[i];
            var status = "default";
            if (guess_c === curr_c) {
                classes[i] = "correct";
                status = "correct";
            } else if (correct.indexOf(guess_c) !== -1) {
                classes[i] = "close";
                status = "close";
            } else {
                classes[i] = "unused";
                status = "unused";
            }
            newMap.set(guess_c, status);
        }

        this.setState((prevState) => ({
            keyMaps: [...prevState.keyMaps.slice(0, idx), newMap, ...prevState.keyMaps.slice(idx+1)]
        }));

        return classes;
    }


    renderBoard(idx, correct, num_guesses, finished) {
        return <Board correct={correct} 
            num_guesses={num_guesses} 
            listId={idx}
            key={correct} 
            guesses={this.state.guesses} 
            curr={this.state.curr_guess} 
            g_idx={this.state.curr_guess_idx} 
            checkFunc={this.processLetters.bind(this)}
            finished={finished}
        />;
    }

    renderKeyboard() {
        return (
            <Keyboard 
                keyStatus={this.state.keyMaps}
                action={this.handleAnswer.bind(this)}
                num_games={this.props.num_games}
            />
        );
    }

    
    render() {

        const boards = [...Array(parseInt(this.props.num_games)).keys()].map((idx) => {
            return this.renderBoard(idx, this.state.words[idx], this.num_guesses, this.state.boards[idx]);
        }); 

        return (
            <div className="app" tabIndex="0" key={this.props.rng_seed} onKeyDown={this.handleAnswer.bind(this)}>
                <div className="boards">
                    {boards}
                </div>
                {this.renderKeyboard()}
                
            </div>
        );

    }

    componentDidUpdate() {
        // if (this.state.rng_seed !== this.props.rng_seed) {
        //     this.setState({
        //         rng_seed: this.props.rng_seed,
        //     });
        // }

        if (this.state.started === false && this.state.curr_guess !== "") {
            this.setState({
                started: true,
            });
            this.props.timer.start();
        } 
        if (this.state.finished === true) {
            this.props.timer.pause();
            if (this.state.won) {
                alert(`Nice job! Won in ${this.state.curr_guess_idx}/${this.num_guesses}\nDuration: ${this.props.timer.getTimeValues().toString()}`);
            } else {
                alert("OOPS YOU LOST SUCKA X/" + this.num_guesses);
            }
            this.props.timer.stop();
        }
    }
}

export default Game
import React, {Component} from 'react'
import Word from './Word'

class Board extends Component {

    renderWord(w, g, idx) {
        var status = "none";
        var guess = g;
        if (idx === this.props.g_idx) {
            guess = this.props.curr;
        } else if (idx <= this.props.g_idx) {
            status = "default";
        }

        return <Word 
                correct={w} 
                guess={guess} 
                key={idx} 
                listId={idx}
                boardId={this.props.listId}
                status={status}
                checkFunc={this.props.checkFunc}
                g_idx={this.props.g_idx}
                keyMap={this.props.keyMap}
            />;
        
    }

    getClass() {
        return "board " + (this.props.finished ? "finished" : "default");
    }

    shouldComponentUpdate() {
        return !this.props.finished;
    }

    render() {
        const guesses = [...Array(parseInt(this.props.num_guesses)).keys()].map((idx) => {
            return this.renderWord(this.props.correct, this.props.guesses[idx], idx);
        });

        return (
            <div className={this.getClass()}> 
                <div className="overlay"/>
                {guesses} 
                <div className="solution">{this.props.correct}</div>
            </div>
        );
    }
}

export default Board
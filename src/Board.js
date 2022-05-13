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
                status={status}
                checkFunc={this.props.checkFunc}
                g_idx={this.props.g_idx}
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
                {this.props.correct}
                {guesses} 
            </div>
        );
    }
}

export default Board
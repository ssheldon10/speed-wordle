import React, {Component} from 'react'

class Letter extends Component {
    getClasses() {
        return "letter "+ this.props.type;
    }
    
    render() {
        return (
            <div className={this.getClasses()}>
                {this.props.value}
            </div>
        );
    }
}

class Word extends Component {

    renderLetter(curr, correct, idx, class_val) {
        return <Letter type={class_val} value={curr} correct={correct} key={idx} />;
    }

    processLetters(guess, correct) {
        var classes = Array(5).fill("default");
        for (let i = 0; i < correct.length; i++) {
            const guess_c = guess[i];
            const curr_c = correct[i];
            if (guess_c === curr_c) {
                classes[i] = "correct";
            } else if (correct.indexOf(guess_c) !== -1) {
                classes[i] = "close";
            } else {
                classes[i] = "default";
            }
        }
        return classes;
    }

    getClasses() {
        return "word "+ this.props.status;
    }

    shouldComponentUpdate() {
        return (this.props.listId === this.props.g_idx);
    }

    render() {
        const correct = this.props.correct;

        const classes = (this.props.status === "none") ? Array(5).fill("default") : (this.props.checkFunc(this.props.guess, this.props.correct));

        const letters = [...correct].map((c, idx) => {
            const g = this.props.guess;
            if (g == null) {
                return this.renderLetter(null, c,  idx, classes[idx]);
            } else {
                return this.renderLetter(g[idx], c,  idx, classes[idx]);
            }
        });

       

        return (
            <div className={this.getClasses()}>
                {letters}
            </div>
        );
    }
}

export default Word
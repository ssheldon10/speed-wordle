import React, {Component} from 'react'

class Key extends Component {

    handleClick() {
        this.props.action(new KeyboardEvent('keypress', {'key': this.props.val.toLowerCase()}))
    }

    render() {
        const len = [...this.props.status].length;
        const indicators = [...this.props.status].map((status, idx) => {
            return (
                <div className="keyIndicator" data-size={len} data-status={status.get(this.props.val)} key={idx}/> 
            );
        });

        return (
            <div className="key" data-size={this.props.size}>
                <div className="indicators" >
                    {indicators}
                </div>
                <button className="keycap" data-size={this.props.size} onClick={ () => {this.handleClick()}}>
                    {this.props.val}
                </button>
                
            </div>

        );
    }
}

class Keyboard extends Component  {

    renderKey(letter, size) {
        // var status = ["default"];
        // if (letter !== "Enter" && letter !== "Del") {
        //     status = [this.props.keyStatus.get(letter)];
        // }
        return (
            <Key 
                val={letter} 
                size={size} 
                status={this.props.keyStatus} 
                key={letter} 
                action={this.props.action}
                num_games={this.props.num_games}
            />
        );
    }

    render() {
        return (
            <div className="keyboard">
                <div className="row">
                    { [..."QWERTYUIOP"].map((c, i) => {
                        return this.renderKey(c, 1);
                    })}  
                </div>
                <div className="row">
                    <div className="spacer" data-size="1.5"/>
                    { [..."ASDFGHJKL"].map((c, i) => {
                        return this.renderKey(c, 1);
                    })}  
                </div>
                <div className="row">
                    {this.renderKey("Del", 1.5)}
                    { [..."ZXCVBNM"].map((c, i) => {
                        return this.renderKey(c, 1);
                    })}
                    {this.renderKey("Enter", 1.5)}
                </div>
            </div>
        );
    }
}

export default Keyboard
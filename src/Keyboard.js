import React, {Component} from 'react'

class Keycap extends Component {

    handleClick() {
        this.props.action(new KeyboardEvent('keypress', {'key': this.props.val.toLowerCase()}))
    }

    render() {
        return (
            <div className="key">
                <div className="indicators" >
                    <div className="keyIndicator" data-size="4" style={{background: "rgb(162, 255, 162)"}}/>
                    <div className="keyIndicator" data-size="4" style={{background: "rgb(255, 238, 162)"}}/>
                    <div className="keyIndicator" data-size="4" style={{background: "rgb(255, 238, 162)"}}/>
                    <div className="keyIndicator" data-size="4" style={{background: "rgb(162, 255, 162)"}}/>
                </div>
                <button className="keycap" data-status={this.props.status} data-size={this.props.size} onClick={ () => {this.handleClick()}}>
                    {this.props.val}
                </button>
                
            </div>

        );
    }
}

class Keyboard extends Component  {

    renderKeycap(letter, size) {
        var status = "default";
        if (letter !== "Enter" && letter !== "Del") {
            status = this.props.keyStatus.get(letter);
        }
        return <Keycap val={letter} size={size} status={status} key={letter} action={this.props.action}/>;
    }

    render() {
        return (
            <div className="keyboard">
                <div className="row">
                    { [..."QWERTYUIOP"].map((c, i) => {
                        return this.renderKeycap(c, 1);
                    })}  
                </div>
                <div className="row">
                    <div className="spacer" data-size="1.5"/>
                    { [..."ASDFGHJKL"].map((c, i) => {
                        return this.renderKeycap(c, 1);
                    })}  
                </div>
                <div className="row">
                    {this.renderKeycap("Del", 1.5)}
                    { [..."ZXCVBNM"].map((c, i) => {
                        return this.renderKeycap(c, 1);
                    })}
                    {this.renderKeycap("Enter", 1.5)}
                </div>
            </div>
        );
    }
}

export default Keyboard
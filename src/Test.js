import React from 'react'

function  Test(props) {

    var rng = new Math.seedrandom(props.seed);

    return (
        <div>
            <p>{props.seed}</p>
            <div>
                {rng()}
            </div>
        </div>
    );
}

export default Test
import React, { Component } from 'react';


class Player extends Component{
    constructor(props){
        super(props)
        this.state = {
            turn: this.props.turn,
        }
    }

    //AI code here
    render(){
        return(
            <div></div>
        )
    }
}

export default Player
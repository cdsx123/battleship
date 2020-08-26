import React, { Component } from 'react';
import GameBoard from './GameBoard'
import Player from './Player'

class App extends Component{
    constructor(){
        super()
        this.state = {
            turn: 0,
            'attackPos1': '',
            'attackPos2': '',
            'board1': Array(100),
            'board2': Array(100)
        }
    }



    render(){
        return(
            <React.Fragment>
            
                <GameBoard 
                boardNum = '1' 
                invisible = {false}/>
                
                <GameBoard 
                boardNum = '2' 
                invisible = {true} />

                <Player turn={this.state.turn}/>
            </React.Fragment>
        )
    }

}

export default App
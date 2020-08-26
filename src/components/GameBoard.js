import React, { Component } from 'react';
import Ship from './Ship'
import Player from './Player'

class GameBoard extends Component{
    constructor(props){
        super(props)
        this.state = {
            turn: 1,
            attackPos: '',
            board: 
            [
                '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '',
            ],
            shipLength: {
                'Carrier': 5,
                'Battleship': 4, 
                'Cruiser': 3, 
                'Submarine': 3, 
                'Destroyer': 2,
            },
            shipNames: [
                'Carrier',
                'Battleship',
                'Cruiser',
                'Submarine',
                'Destroyer',
            ],
            sunkShips: {
                'Carrier': false,
                'Battleship': false,
                'Cruiser': false,
                'Submarine': false,
                'Destroyer': false,
            },
            allSunk: false,
            hitPos: {
                'Carrier': 0,
                'Battleship': 0,
                'Cruiser': 0,
                'Submarine': 0,
                'Destroyer': 0,
            },
            numHits: {
                'Carrier': 0,
                'Battleship': 0,
                'Cruiser': 0,
                'Submarine': 0,
                'Destroyer': 0,
            }
        }
    }

    checkSunk = () => {
        
        this.setState(prevState => {

            let number = 0;
            const hits = prevState.numHits
            const newSunk = prevState.sunkShips
            let isAllSunk = false

            for(let key in hits){
                if(hits[key] >= prevState.shipLength[key]){
                    newSunk[key] = true
                }
            }

            for (let key in newSunk){
                if(newSunk[key]){
                    number += 1
                }
            }

            if(number >= 5){
                isAllSunk = true
            }
            return({
                allSunk: isAllSunk,
                sunkShips: newSunk
            })
        }, 
        () => {
            if(this.state.allSunk){
                this.gameEnd()
            }
        })
    }

    gameEnd = () => {
        if(this.props.boardNum === '2'){
            alert('Player 1 Wins')
        } else{
            alert('Player 2 Wins!')
        }
        
    }

    place = (coords, shipName) => {
        const length = this.state.shipLength[shipName]
        this.setState(prevState => {
            
            const newBoard = prevState.board;
            for (let i = 0; i < newBoard.length; i++){
                newBoard[i] = newBoard[i].replace(shipName, "");
            }
            for(let i = -1; i < length-1; i++){
                newBoard[coords+i] = shipName
            }
            
            return({
                board: newBoard
            })
        })
    }

    recieveAttack = (coords) => {
        

        this.setState(prevState => {
            const newBoard = prevState.board;
            for(let i = 0; i < 5; i++){
                const shipName = prevState.shipNames[i]
                if(newBoard[coords] === shipName){
                    for(let index = 1; index < 6; index++){
                        if (newBoard[coords - index] !== shipName){
                            let newTurn = prevState.turn
                            newTurn++
                            const newPos = prevState.hitPos
                            newPos[shipName] = index - 1
                            newBoard[coords] = 'hit'
                            const newNum = prevState.numHits
                            newNum[shipName] += 1
                            return({
                                board: newBoard,
                                hitPos: newPos,
                                numHits: newNum,
                                turn: newTurn,
                            })
                        } 
                    }
                } else if (newBoard[coords] === ''){
                    newBoard[coords] = 'attacked'
                    let newTurn = prevState.turn
                    newTurn++
                    return({
                        board: newBoard,
                        turn: newTurn,
                    })
                }
            }    
        },
        () => {        console.log(this.state.turn)
            this.checkSunk()}
        )

    }

   

    componentDidMount() {
        let index = 0;
        for(let i = 1; i < 50; i += 10){
            this.place(i, this.state.shipNames[index])
            index++
        }
    }

     handleClick = (event) => {

            const id = event.target.id.slice(0, event.target.id.length - 1)

            this.setState({attackPos: id},

                () => {if(this.state.board[this.state.attackPos] !== 'attacked' && this.state.board[this.state.attackPos] !== 'hit'){
                    if(this.state.turn === this.props.boardNum % 2 || this.state.turn === (this.props.boardNum % 2) + 2){
                        this.recieveAttack(this.state.attackPos)
                    }
                }}
            )
        }
        
        
        
    

    render(){
        
        let boxes = this.state.board.map((box, index) => {
            let boxClass = 'box';
            let text = '';
            if (box === 'attacked') {
                boxClass = 'box attacked'
            } else if(box === 'hit'){
                boxClass = 'box hit'
                text = 'X'
            } 
            for(let i = 0; i < 5; i++){
                if(this.props.invisible && box === this.state.shipNames[i]){
                    boxClass = 'box'
                } else if(box === this.state.shipNames[i]){
                    boxClass = 'box shipBox'
                }
            }
            
            return (
                <div 
                    className = {boxClass} 
                    key = {index} 
                    id = {index + this.props.boardNum}>{text}</div>
            )
        })
        let ships = []
        
        for(let i = 0; i < 5; i++) {
            let name = this.state.shipNames[i]
            let shipClass = false
            if(this.props.invisible === true){
                shipClass = 'invisible'
            }
            ships.push(<Ship 
            boxes ={this.state.shipLength[name]} 
            key={name + this.props.boardNum} 
            name={name + this.props.boardNum}
            pos={this.state.hitPos[name]}
            invisible={shipClass}
            />)
        }
        return(
            <React.Fragment>
                <div className='board' onClick={this.handleClick}>
                    {boxes}
                    {ships}
                </div>
                <Player turn={this.state.turn}/>
            </React.Fragment>
        )
    }
}

export default GameBoard

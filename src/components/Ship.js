import React, { Component } from 'react';



class Ship extends Component {
  constructor(props){
    super(props)

    this.state = {
      boxes: [],
      hit: 0,
    }
    this.hit = this.hit.bind(this)

  }

  hit(pos) {
    this.setState(prevState => {
        let newLength = prevState.boxes
        newLength[pos] = 'hit'
        console.log('hit at ' + pos)
        return({
          boxes: newLength,
          hit: prevState.hit + 1
        })
    })
    
    
  }

  componentDidMount(){
      this.setState(() => {
        let newLength = []
        for(let i = 0; i < this.props.boxes; i++){
        newLength.push('')
        }
        return({
          boxes: newLength
        })
      })
  }

  componentDidUpdate(){

    if (!this.state.boxes[this.props.pos]){
      this.hit(this.props.pos)
    }
      
    }
  

  render(){
    // let divClass = this.props.invisible ? 'ship invisible' : 'ship'
    //   let items = []
    //   let boxes = this.state.boxes
    //   for(let i = 0; i < boxes.length; i++){

    //     let className = 'shipBox';
    //     if(boxes[i]){
    //       className = 'shipBox hit'
    //     } 
    //     items.push(<div className={className} key={i} id={this.props.name}></div>)
    //   }
    return (
      <div>
        {/*className={divClass}*/}
        {/* {items} */}
      </div>
    );
  }
}

export default Ship;

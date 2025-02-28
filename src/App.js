import React, { Component } from 'react';

import Snake from './snake';
import Food from './Food';
import Score from './Score';
import Aux from './hoc/Auxiliary';


const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}
const initialState = {
  food: getRandomCoordinates(),
  speed: 100,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ]
}

class App extends Component {

  state = initialState;

  componentDidMount(){
    setInterval(this.move, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(){
    this.onBorderImpact();
    this.onCollapsing();
    this.onEating();
  }

  onKeyDown = (event) =>  {
    event = event || window.event;
    switch (event.keyCode) {
     case 38:
       this.setState({direction: 'UP'});
       break;
     case 40:
       this.setState({direction: 'DOWN'});
       break;
     case 37:
       this.setState({direction: 'LEFT'});
       break;
     case 39:
       this.setState({direction: 'RIGHT'});
       break;
   }
  }

  move = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length -1];
    switch (this.state.direction) {
         case 'RIGHT':
           head = [head[0] + 2, head[1]];
           break;
         case 'LEFT':
           head = [head[0] - 2, head[1]];
           break;
         case 'DOWN':
           head = [head[0], head[1] + 2];
           break;
         case 'UP':
           head = [head[0], head[1] - 2];
           break;
       }
    dots.push(head);
    dots.shift();
    this.setState({
     snakeDots: dots
   })
  }

  onBorderImpact(){
    let head = this.state.snakeDots[this.state.snakeDots.length -1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  //if the snake eats itself
  onCollapsing() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    })
  }

  onEating() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlarge();
      this.increaseSpeed();
    }
  }

  enlarge() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  onGameOver() {
      alert(`Game Over. Your score is ${this.state.snakeDots.length -2}`);
      this.setState(initialState)
    }

  render() {
      return (
        <div >
        <Score  score={this.state.snakeDots.length -2} />

        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots}></Snake>
          <Food dot={this.state.food}></Food>
        </div>
        </div>
      );
    }
}

export default App;

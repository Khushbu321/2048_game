import React, { Component } from 'react';
import './App.css';
import Rows from './Rows';
import Cell from './Cell';

class App extends Component {
  constructor(props){
    super(props);
    const arr = [[4,4,8,8,16],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    this.state = {
        arr : arr
    }
}

componentDidMount = () => {
    let arr = this.state.arr;
    const obj = this.getRowColumn();
    const obj2 = this.getRowColumn();
    arr[obj.row][obj.col] = 2;
    arr[obj2.row][obj2.col] = 2;
    this.setState({ 
      arr : arr
    });
    document.addEventListener('keydown', this.getKeyPressed);
  }
  
  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.getKeyPressed);
  }


getRowColumn = () => {
  const obj = {};
  const finalArray = [];
  let arr = this.state.arr;
  for(var i = 0; i<5 ;i++){
    for(var j = 0; j<5 ;j++){
      if(arr[i][j] === 0){
        finalArray.push(`${i}-${j}`);
      }
    }
  }

  let randomNo =  Math.floor(Math.random() * Math.floor(finalArray.length));
  if(finalArray[randomNo]){
  var value = finalArray[randomNo];
  var no = value.split("-");
  obj.row = Number(no[0]);
  obj.col = Number(no[1]);
  }
  else{
    alert("Game Over");
  }
  return obj;
}

getKeyPressed = (e) => {
  if(e.keyCode === 37){
    this.moveLeft();
  }
  else if(e.keyCode === 38){
    this.moveUp();
  }
  else if(e.keyCode === 39){
    this.moveRight();
  }
  else if(e.keyCode === 40){
    this.moveDown();
  }
}

lastElement = (arr) => {
  return arr.slice(-1)[0];
}

moveLeft = () => {
  var arr = this.state.arr;
  var lastAdded = false;
  var res = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
   for(var i = 0 ; i < 5; i++){
     var queue = [];
     for(var j = 0; j < 5;j++){
      if(arr[i][j] === this.lastElement(queue) && lastAdded === false){
        queue.pop();
        queue.push(arr[i][j] * 2);
        lastAdded = true;
      }
      else if(arr[i][j] > 0){  
        queue.push(arr[i][j]);
        lastAdded = false;
      }  
     }
     queue = queue.concat(Array(5-queue.length).fill(0));
     res[i] = queue;
    }
    const obj = this.getRowColumn();
    res[obj.row][obj.col] = 2;
    this.setState({
     arr: res
    });
  }

moveUp = () => {
  var arr = this.state.arr;
  var lastAdded = false;
  var res = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
   for(var j = 0 ; j < 5; j++){
     var queue = [];
     for(var i = 0; i < 5;i++){  
      if(arr[i][j] === this.lastElement(queue) && lastAdded === false){
        queue.pop();
        queue.push(arr[i][j] * 2);
        lastAdded = true; 
      }
      else if(arr[i][j] > 0){  
        queue.push(arr[i][j]);
        lastAdded = false;
      }
     }
     for(var k = 0; k < 5 ;k++){
     queue = queue.concat(Array(5-queue.length).fill(0));
     res[k][j] = queue[k]; 
     }
    }
  const obj = this.getRowColumn();
  res[obj.row][obj.col] = 2;
   this.setState({
    arr: res
  });
}

moveRight = () => {
  var arr = this.state.arr;
  var lastAdded = false;
  var res = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
   for(var i = 4 ; i >= 0 ;i--){
     var queue = [];
     for(var j = 4; j >= 0 ;j--){  
      if(arr[i][j] === this.lastElement(queue) && lastAdded === false){
        queue.pop();
        queue.push(arr[i][j] * 2);
        lastAdded = true;
      }
      else if(arr[i][j] > 0){  
        queue.push(arr[i][j]);
        lastAdded = false;
      }
     }
     queue = queue.concat(Array(5-queue.length).fill(0));
     for(var k = 4,r = 0; k >= 0, r < 5; k--, r++){
      res[i][k] = queue[r]; 
    }
   }
  const obj = this.getRowColumn();
  res[obj.row][obj.col] = 2;
   this.setState({
    arr: res
  });
}

moveDown = () => {
  var arr = this.state.arr;
  var lastAdded = false;
  var res = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
  for(var j = 4 ; j >= 0; j--){
    var queue = [];
    for(var i = 4; i >= 0;i --){
    if(arr[i][j] === this.lastElement(queue)  && lastAdded === false){
      queue.pop();
      queue.push(arr[i][j] * 2);
      lastAdded = true;
    }
    else if(arr[i][j] > 0){  
      queue.push(arr[i][j]);
      lastAdded = false;
    }  
    }
    queue = queue.concat(Array(5-queue.length).fill(0));
    for(var k = 4,r = 0; k >= 0, r < 5 ;k--, r++){
      res[k][j] = queue[r]; 
    }
  }
  const obj = this.getRowColumn();
  res[obj.row][obj.col] = 2;
  this.setState({
   arr: res
 });
}

renderCells(row, rowIndex) {
  return (
    row.map((cell, cellIndex) => <Cell key={`${rowIndex}-${cellIndex}`} className={`Cell cell-${cell}`}>{cell}</Cell>)
  );  
}

renderRows() {
    return this.state.arr.map((row, rowIndex) => {
      return (
        <Rows className = "Rows" key={rowIndex}>
            {this.renderCells(row, rowIndex)}
        </Rows>
      )
    })
  }

render() {
  return (
    <div className="App">
    <div className ="table">
    {this.renderRows()}
    </div>
    </div>
  );
}
}


export default App;

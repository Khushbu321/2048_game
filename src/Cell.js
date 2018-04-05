import React, { Component } from 'react';

class Cell extends Component {
 constructor(props){
     super(props);
     this.state = {
         randomNoGenerated: true
     };
 }

 renderChildren = (children) => {
   if(children === 0){
     return null;
   }
   return children;
 }

  render() {
    return (
      <div className = {`${this.props.className}`}>
        {this.renderChildren(this.props.children)}
      </div>
    );
  }
}

export default Cell;

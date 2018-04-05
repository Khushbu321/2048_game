import React, { Component } from 'react';

class Rows extends Component {
  render() {
    return (
      <div className={`${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Rows;

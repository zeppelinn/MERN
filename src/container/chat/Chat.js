import React, { Component } from 'react'

export default class Chat extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h2>{this.props.match.params.user}</h2>
      </div>
    )
  }
}

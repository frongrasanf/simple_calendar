import React, { Component } from 'react';

class ScheduledList extends Component {

  handleDelete = () => {
    console.log("props", this.props)
    console.log("here")
    this.props.onDelete(this.props.data.id)
  }
  render() {
    console.log("props", this.props)
    return (
      <div>
        {this.props.data.title}
        <button onClick={this.handleDelete}>Delete</button>
      </div>

    )
  }
}

export default ScheduledList;

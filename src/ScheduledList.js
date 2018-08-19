import React, { Component } from 'react';

class ScheduledList extends Component {

  handleDelete = () => {
    this.props.onDelete(this.props.data.id)
  }
  displayListDate(date) {
    return date.split("-")[2].split("T")[0]
  }
  render() {
    console.log("props", this.props)
    const { data } = this.props
    return (
      <div>
        {this.displayListDate(data.start_at)}日:
        {data.title}
        <button onClick={this.handleDelete}>Delete</button>
      </div>

    )
  }
}

export default ScheduledList;

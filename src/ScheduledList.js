import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class ScheduledList extends Component {
  handleDelete = () => {
    this.props.onDelete(this.props.data.id)
  }
  displayListDate(date) {
    return date.split("-")[2].split("T")[0]
  }
  render() {
    const { data } = this.props
    return (
      <div>
        {this.displayListDate(data.start_at)}日:
        {data.title}
        <Button color="secondary" onClick={this.handleDelete}>削除</Button>
      </div>

    )
  }
}

export default ScheduledList;

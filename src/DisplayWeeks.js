import React, { Component } from 'react';
import moment from 'moment';

class DisplayWeeks extends Component {
  constructor(props) {
    super(props)
  }
  setSelectedDay(i) {
    return this.props.setSelectedDay(i)
  }
  changeToDisplayStyle(day) {
    let array = day.split("/")
    return array[array.length - 1]
  }
  render() {
    let { displayDays } = this.props
    let weekNum = displayDays.length / 7
    let array = []
    for (let i = 0; i < weekNum; i++) {
      let num = i * 7
      array.push(displayDays.slice(num, num + 7))
    }

    return (
      <div className="Display-weeks">
        {array.map((dayArray, i) => {
          return (
            <div className="Week-row">
              {dayArray.map((day) => {
                return (
                  <div onClick={e => this.setSelectedDay(day)} className="Day-box">
                    {this.changeToDisplayStyle(day)}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default DisplayWeeks;

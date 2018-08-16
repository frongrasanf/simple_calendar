import React, { Component } from 'react';

class DisplayWeeks extends Component {
  render() {
    console.log("called")
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
                  <div className="Day-box">
                    {day}
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

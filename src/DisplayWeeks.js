import React, { Component } from 'react';

class DisplayWeeks extends Component {
  constructor(props) {
    super(props)
  }
  click(i) {
    console.log("i", i)
    return this.props.setSelectedDay(i)
  }
  render() {
    console.log("called")
    console.log("this", this.props)
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
                  <div onClick={e => this.click(day)} className="Day-box">
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

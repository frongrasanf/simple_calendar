import React, { Component } from 'react';
import './Main.css';
import moment from 'moment';

class Main extends Component {
  constructor() {
    super()
    const today = moment()
    const month = today.month()
    const year = today.year()
    const firstDay = moment().year(year).month(month).date(1)
    this.state = {
      today: today,
      month: month,
      year: year,
      firstDay: firstDay,
      displayDays: []
    }
  }

  componentWillMount() {
    console.log("will")
    const { firstDay, month, displayDays } = this.state
    let tempDay = firstDay
    let wday = firstDay.day();
    let tempMonth = month

    let dayArray = [];
    // 1日よりも前の日を入れる
    for (let i = 0; i < wday; i++) {
      let beforeDay = tempDay.subtract(wday - i, 'days').format("D")
      dayArray.push(beforeDay)
      tempDay.add(wday - i, 'days').format("D")
    }

    let nextMonth = tempMonth + 1
    let flag = true
    while(flag = true) {
      let day = tempDay.format("D")
      dayArray.push(day)
      tempDay.add(1, 'days').format("D")
      tempMonth = tempDay.month()
      if (tempDay.day() === 0) {
        if (tempMonth === nextMonth) {
          flag = false
          break;
        }
      }
    }
    this.setState({
      displayDays: dayArray
    })
  }
  render() {
    console.log("state", this.state)
    const weekInfo = (
      <div className="Week-info">
        <div className="Week-row">
          <div className="Day-box Sunday">Sun</div>
          <div className="Day-box">Mon</div>
          <div className="Day-box">Tue</div>
          <div className="Day-box">Wed</div>
          <div className="Day-box">Thu</div>
          <div className="Day-box">Fri</div>
          <div className="Day-box Saturday">Sat</div>
        </div>
      </div>
    )

    return (
      <div>
        <div className="Calendar-header">
          <div className="Calendar-header-text">xx月</div>
        </div>
        <div className="Calendar-body">
          {weekInfo}
        </div>
      </div>
    );
  }
}

export default Main;

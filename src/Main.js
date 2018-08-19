import React, { Component } from 'react';
import './Main.css';
import DisplayWeeks from './DisplayWeeks';
import moment from 'moment';
import axios from 'axios';

class Main extends Component {
  constructor() {
    super()
    const today = moment()
    const month = today.month()
    const year = today.year()
    const firstDay = today.startOf('month')
    this.state = {
      today: today,
      month: month,
      year: year,
      firstDay: firstDay,
      displayDays: [],
      newScheduleTitle: "",
      selectedDay: "",
      scheduleList: []
    }
    this.moveToNextMonth = this.moveToNextMonth.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setSelectedDay = this.setSelectedDay.bind(this)
  }
  handleChange(e) {
    this.setState({newScheduleTitle: e.target.value});
  }
  handleSubmit() {
  }
  // propsで渡ってきたslectedDayを日付として扱いたい
  setSelectedDay(day) {
    console.log("here", day)
    let array = day.split("/")
    let someday = moment().year(array[0]).month(array[1] - 1).date(array[2]).format("YYYY/M/D")
    this.setState({
      selectedDay: someday
    })
  }
  moveToNextMonth() {
    const { firstDay, month, displayDays, year } = this.state
    let tsugi = month + 1
    let tempYear = year
    let firstDay2 = ""
    // 12月から1月の場合
    if (tsugi == 12) {
      tsugi = 0
      tempYear = tempYear + 1
      firstDay2 = moment().year(tempYear).month(tsugi).date(1)
    } else {
      firstDay2 = moment().year(tempYear).month(tsugi).date(1)
    }

    //ここから表示する日付を計算
    let tempDay = firstDay2;
    let wday = firstDay2.day();
    let tempMonth = tsugi

    let dayArray = [];
    //1日よりも前の日を入れる
    for (let i = 0; i < wday; i++) {
      let beforeDay = tempDay.subtract(wday - i, 'days').format("YYYY/M/D")
      dayArray.push(beforeDay)
      tempDay.add(wday - i, 'days').format("YYYY/M/D")
    }

    let flag = true
    while(flag = true) {
      let day = tempDay.format("YYYY/M/D")
      dayArray.push(day)
      tempDay.add(1, 'days').format("YYYY/M/D")
      // 12月を表示する場合、ここは11
      let tsugi2 = tempDay.month()
      if (tempDay.day() === 0) {
        if (tsugi2 === tsugi + 1) {
          flag = false
          break;
        } else if (tsugi === 11 && tsugi2 === 0) {
          flag = false
          break;
        }
      }
    }
    this.setState({
      month: tsugi,
      year: tempYear,
      displayDays: dayArray,
      selectedDay: ""
    })
  }

  componentWillMount() {
    const { firstDay, month, displayDays } = this.state
    let tempDay = firstDay
    let wday = firstDay.day();
    let tempMonth = month

    let dayArray = [];
    // 1日よりも前の日を入れる
    for (let i = 0; i < wday; i++) {
      let beforeDay = tempDay.subtract(wday - i, 'days').format("YYYY/M/D")
      dayArray.push(beforeDay)
      tempDay.add(wday - i, 'days').format("YYYY/M/D")
    }

    let nextMonth = tempMonth + 1
    let flag = true
    while(flag = true) {
      let day = tempDay.format("YYYY/M/D")
      dayArray.push(day)
      tempDay.add(1, 'days').format("YYYY/M/D")
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
  componentDidMount() {
    const ApiEndpoint = 'http://localhost:3003'
    axios.get(ApiEndpoint)
    .then((res) => {
      this.setState({ scheduleList: res.data})
    })
  }
  render() {
    const { scheduleList } = this.state

    const displayList = scheduleList.map((list) => {
      return (
        <h5>{list.title}</h5>
      )
    })

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
          <button className="Month-button">先月</button>
          <button className="Month-button" onClick={this.moveToNextMonth}>次月</button>
          <div className="Calendar-header-text">{this.state.year}年 {this.state.month + 1}月</div>
        </div>
        <div className="Calendar-body">
          {weekInfo}
          <DisplayWeeks
            setSelectedDay={this.setSelectedDay}
            moveToNextMonth={this.moveToNextMonth}
            displayDays={this.state.displayDays}
          />
        </div>
        <div>
          <h1>here</h1>
          {displayList}
        </div>
        <form>
          <label>
            Title:
            <textarea name="title" value={this.state.newScheduleTitle} onChange={this.handleChange} />
          </label>
          <div>{this.state.selectedDay}</div>
          <button onClick={this.handleSubmit}>save</button>
        </form>
      </div>
    );
  }
}

export default Main;

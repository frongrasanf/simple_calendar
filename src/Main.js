import React, { Component } from 'react';
import './Main.css';
import DisplayWeeks from './DisplayWeeks';
import ScheduledList from './ScheduledList';
import moment from 'moment';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import ENV from './.env';

const ApiEndpoint = "https://intense-fortress-41067.herokuapp.com/"

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
      scheduleList: [],
      isShown: false
    }
    this.moveToNextMonth = this.moveToNextMonth.bind(this)
    this.moveToPreviousMonth = this.moveToPreviousMonth.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.setSelectedDay = this.setSelectedDay.bind(this)
    this.setScheduleList = this.setScheduleList.bind(this)
  }

  handleChange(e) {
    this.setState({newScheduleTitle: e.target.value});
  }
  handleSubmit(e) {
    let params = new URLSearchParams()
    const input = this.state.newScheduleTitle
    const time = this.state.selectedDay
    params.append('title', input)
    params.append('start_at', time)
    axios.post(ApiEndpoint + "schedules", params)
    .then((res) => {
      this.setState({
        scheduleList: res.data,
        newScheduleTitle: ""
      })
    })
    e.preventDefault()
  }

  deleteList(id) {
    axios.delete(ApiEndpoint + `schedules/${id}`)
    .then((res) => {
      this.setState({
        scheduleList: res.data,
        newScheduleTitle: ""
      })
    })
  }
  // propsで渡ってきたslectedDayを日付として扱いたい
  setSelectedDay(day) {
    let array = day.split("-")
    let someday = moment().year(array[0]).month(array[1] - 1).date(array[2]).format("YYYY-M-D")
    this.setState({
      selectedDay: someday,
      isShown: true
    })
  }
  moveToNextMonth() {
    const { month, year } = this.state
    let tsugi = month + 1
    let tempYear = year
    let firstDay2 = ""
    // 12月から1月の場合
    if (tsugi === 12) {
      tsugi = 0
      tempYear = tempYear + 1
      firstDay2 = moment().year(tempYear).month(tsugi).date(1)
    } else {
      firstDay2 = moment().year(tempYear).month(tsugi).date(1)
    }

    //ここから表示する日付を計算
    let tempDay = firstDay2;
    let wday = firstDay2.day();

    let dayArray = [];
    //1日よりも前の日を入れる
    for (let i = 0; i < wday; i++) {
      let beforeDay = tempDay.subtract(wday - i, 'days').format("YYYY-M-D")
      dayArray.push(beforeDay)
      tempDay.add(wday - i, 'days').format("YYYY-M-D")
    }

    let flag = true
    while(flag = true) {
      let day = tempDay.format("YYYY-M-D")
      dayArray.push(day)
      tempDay.add(1, 'days').format("YYYY-M-D")
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
      selectedDay: "",
      isShown: false
    })

    let queryDate = moment().year(tempYear).month(tsugi).date(1).format("YYYY-M-D")

    axios.get(ApiEndpoint+ `?date=${queryDate}`)
    .then((res) => {
      this.setState({ scheduleList: res.data})
    })
  }
  moveToPreviousMonth() {
    const { month, year } = this.state
    let mae = month - 1
    let tempYear = year
    let firstDay3 = ""
    // 12月から1月の場合
    if (mae === -1) {
      mae = 11
      tempYear = tempYear - 1
      firstDay3 = moment().year(tempYear).month(mae).date(1)
    } else {
      firstDay3 = moment().year(tempYear).month(mae).date(1)
    }

    //ここから表示する日付を計算
    let tempDay = firstDay3;
    let wday = firstDay3.day();

    let dayArray = [];
    //1日よりも前の日を入れる
    for (let i = 0; i < wday; i++) {
      let beforeDay = tempDay.subtract(wday - i, 'days').format("YYYY-M-D")
      dayArray.push(beforeDay)
      tempDay.add(wday - i, 'days').format("YYYY-M-D")
    }

    let flag = true
    while(flag = true) {
      let day = tempDay.format("YYYY-M-D")
      dayArray.push(day)
      tempDay.add(1, 'days').format("YYYY-M-D")
      // 12月を表示する場合、ここは11
      let mae2 = tempDay.month()
      if (tempDay.day() === 0) {
        if (mae2 === mae + 1) {
          flag = false
          break;
        } else if (mae === 11 && mae2 === 0) {
          flag = false
          break;
        }
      }
    }
    this.setState({
      month: mae,
      year: tempYear,
      displayDays: dayArray,
      selectedDay: "",
      isShown: false
    })
    let queryDate = moment().year(tempYear).month(mae).date(1).format("YYYY-M-D")
    axios.get(ApiEndpoint+ `?date=${queryDate}`)
    .then((res) => {
      this.setState({ scheduleList: res.data})
    })

  }

  componentWillMount() {
    const { firstDay, month } = this.state
    let tempDay = firstDay
    let wday = firstDay.day();
    let tempMonth = month

    let dayArray = [];
    // 1日よりも前の日を入れる
    for (let i = 0; i < wday; i++) {
      let beforeDay = tempDay.subtract(wday - i, 'days').format("YYYY-M-D")
      dayArray.push(beforeDay)
      tempDay.add(wday - i, 'days').format("YYYY-M-D")
    }

    let nextMonth = tempMonth + 1
    let flag = true
    while(flag = true) {
      let day = tempDay.format("YYYY-M-D")
      dayArray.push(day)
      tempDay.add(1, 'days').format("YYYY-M-D")
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
  setScheduleList() {
    axios.get(ApiEndpoint)
    .then((res) => {
      this.setState({ scheduleList: res.data})
    })
  }
  componentDidMount() {
    this.setScheduleList()
  }

  render() {
    const { scheduleList } = this.state
    const displayList = scheduleList.map((list) => {
      return (
        <ScheduledList data={list} onDelete={this.deleteList}/>
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
          <p className="Calendar-header-text">{this.state.year}年 {this.state.month + 1}月</p>
          <Button className="Month-button" onClick={this.moveToPreviousMonth}>先月</Button>
          <Button className="Month-button" onClick={this.moveToNextMonth}>次月</Button>
        </div>
        <div className="Calendar-body">
          {weekInfo}
          <DisplayWeeks
            setSelectedDay={this.setSelectedDay}
            moveToNextMonth={this.moveToNextMonth}
            displayDays={this.state.displayDays}
          />
        </div>
        <div className="Api-field">
        { this.state.isShown
          ? <form className="New-schedule-form">
              <TextField
                value={this.state.selectedDay}
                inputProps={{readOnly: true}}
              />
              <TextField
                label="タイトルを入力"
                type="text"
                name="title"
                value={this.state.newScheduleTitle}
                onChange={this.handleChange}
              />
              <Button onClick={this.handleSubmit} color="primary">保存
              </Button>
            </form>
          : <div className="New-schedule-info">
              日付をクリックして予定を登録できます
            </div>
        }
          <div className="Schedule-list">
            {this.state.month + 1}月の予定一覧
            {displayList}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

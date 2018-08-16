import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
  render() {
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

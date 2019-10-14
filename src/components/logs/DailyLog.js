import React from 'react';
import {MDBCardTitle} from 'mdbreact';
import BaseLog from './BaseLog';
import moment from 'moment';

export default class DailyLog extends BaseLog {
  constructor(props) {
    super(props);
    this.state = {
      actualDates: [],
      expiredDates: []
    };
  }
  static getDerivedStateFromProps(props, state) {
    let actualDates = [];
    let expiredDates = [];
    props.logsState.tasks.map(task=>{
      if (
        task. logType === 'daily' &&
        moment(task.date).format('L') >= moment().format('L')
      ) {
        actualDates.push(new Date(task.date));
      } else if (
        task. logType === 'daily' &&
        moment(task.date).format('L') < moment().format('L') &&
        task.status !== 3
      ) {
        expiredDates.push(new Date(task.date));
      }
    });
    return {...state, actualDates, expiredDates};
  }
  getCustomInput = ()=>{
    let selectedDate = moment(this.props.logsState.dates.daily)
      .format('MMMM Do YYYY dddd');
    return (
      <MDBCardTitle sub tag="h6" selected={null}>
        <span onClick={this.closeNewTask}>{selectedDate}</span>
      </MDBCardTitle>
    );
  };
  getHighlightWithRanges = ()=>{
    return [
      {'day--highlighted-custom-2': this.state.actualDates},
      {'day--highlighted-custom-1': this.state.expiredDates}
    ];
  };
}

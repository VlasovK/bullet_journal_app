import React from 'react';
import {MDBCardTitle} from 'mdbreact';
import BaseLog from './BaseLog';
import moment from 'moment';

export default class WeeklyLog extends BaseLog {
  constructor(props) {
    super(props);
    this.state = {
      selectedDates: [],
      actualDates: [],
      expiredDates: []
    };
  }
  static getDerivedStateFromProps(props, state) {
    let {tasks, dates: {weekly: currentLogDate}} = props.logsState;
    let selectedDates =[];
    let actualDates = [];
    let expiredDates = [];
    for (let i = 1; i < 8; i++) {
      selectedDates.push(new Date(moment(currentLogDate).day(i)));
    }
    tasks.map((task) => {
      if (
        task. logType === 'weekly' &&
        moment(task.date).format('L') >= moment().startOf('isoWeek').format('L')
      ) {
        for (let i = 1; i < 8; i++) {
          actualDates.push(new Date(moment(task.date).day(i)));
        }
      } else if (
        task. logType === 'weekly' &&
        moment(task.date).format('L') < moment().startOf('isoWeek').format('L')
      ) {
        for (let i = 1; i < 8; i++) {
          expiredDates.push(new Date(moment(task.date).day(i)));
        }
      }
    });
    return {...state, selectedDates, actualDates, expiredDates};
  }
  handleDatePicker = (date) => {
    let data = {logType: 'weekly', date: moment(date).startOf('isoWeek')};
    this.props.setLogDate(data);
  };
  getCustomInput = () => {
    let currentLogDate = this.props.logsState.dates.weekly;
    let firstDayOfWeek = currentLogDate.format('MMM Do YYYY');
    let lastDayOfWeek = moment(currentLogDate)
      .endOf('isoWeek')
      .format('MMM Do YYYY');
    let weekNum = currentLogDate.isoWeek();
    let selectedDate = `${firstDayOfWeek} - ${lastDayOfWeek} (#${weekNum})`;

    return (
      <MDBCardTitle sub tag="h6">
        <span onClick={this.closeNewTask}>{selectedDate}</span>
      </MDBCardTitle>
    );
  };
  getHighlightWithRanges = () => {
    let {selectedDates, actualDates, expiredDates} = this.state;
    return [
      {'react-datepicker__day--highlighted': selectedDates},
      {'day--highlighted-custom-2': actualDates},
      {'day--highlighted-custom-1': expiredDates}
    ];
  };
}

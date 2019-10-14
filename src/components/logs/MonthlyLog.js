import React from 'react';
import {MDBCardTitle} from 'mdbreact';
import BaseLog from './BaseLog';
import moment from 'moment';

export default class MonthlyLog extends BaseLog {
  getCustomInput = ()=>{
    let currentLogDate = this.props.logsState.dates.monthly;
    let selectedDate =  moment(currentLogDate).format('MMMM YYYY');
    return (
      <MDBCardTitle sub tag="h6">
        <span onClick={this.closeNewTask}>{selectedDate}</span>
      </MDBCardTitle>
    );
  };
}

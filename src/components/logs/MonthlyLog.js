import React from 'react';
import ReactDOM from 'react-dom';
import {MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon}
  from 'mdbreact';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TaskContainer from '../../containers/logs/TaskContainer';
import NewTaskContainer from '../../containers/logs/NewTaskContainer';
import EditTaskContainer from '../../containers/logs/EditTaskContainer';
import * as moment from 'moment';
import DatePicker, {registerLocale} from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
registerLocale('en-GB', enGB);

export default class MonthlyLog extends React.Component {
  componentDidMount() {
    this.props.getMonthlyLog();
  }
  handleDatePicker = date=>{
    let data = {month: moment(date).month(), year: moment(date).year()};
    this.props.setMonthlyLogDate(data);
    this.props.getMonthlyLog();
  };
  addAnotherTask = ()=>{
    this.props.setCurrentLogTask('newMonthlyTask');
  };
  saveNewTask = task=>{
    this.props.addMonthlyLogTask(task);
  };
  editTask = task=>{
    this.props.editMonthlyLogTask(task);
  };
  deleteTask = id=>{
    this.props.deleteMonthlyLogTask(id);
  };
  closeNewTask = ()=>{
    this.props.setCurrentLogTask({});
  };
  getTasks = ()=>{
    let { monthlyLog, currentLogTask } = this.props.logsState;
    return monthlyLog.data.map((task, index)=>{
      if (typeof currentLogTask === 'string' || currentLogTask.id !== task.id) {
        return (
          <TaskContainer key={index} task={task} />
        );
      } else {
        return (
          <EditTaskContainer
            key={index}
            logType={'monthlyLog'}
            editTask={this.editTask}
            deleteTask={this.deleteTask} />
        );
      }
    });
  };
  showExpiredTask = ()=>{
    let {year, month} = this.props.logsState.busyDates.monthly.expired[0];
    let data = {year, month};
    this.props.setMonthlyLogDate(data);
    this.props.getMonthlyLog();
  };
  getCustomInput = ()=>{
    let {year, month} = this.props.logsState.monthlyLog;
    let selectedDate =  moment().set({month, year}).format('MMMM YYYY');
    return (
      <MDBCardTitle sub tag="h6">
        <span onClick={this.closeNewTask}>{selectedDate}</span>
      </MDBCardTitle>
    );
  };
  // getHighlightWithRanges = ()=>{
  //   let actualDates = [new Date('09/01/2019')];
  //   let expiredDates = [];
  //   this.props.logsState.busyDates.monthly.actual.forEach(date=>{
  //     // actualDates.push(date.month);
  //   });
  //   this.props.logsState.busyDates.monthly.expired.forEach(date=>{
  //     // expiredDates.push(date.month);
  //   });
  //   return [
  //     {'react-datepicker__month-text--highlighted-custom-2': actualDates},
  //     {'react-datepicker__month-text--highlighted-custom-1': expiredDates}
  //   ];
  // };
  render() {
    let {year, month} = this.props.logsState.monthlyLog;
    let customInput = this.getCustomInput();
    let tasks = this.getTasks();
    // let highlightWithRanges = this.getHighlightWithRanges();
    let newTask = this.props.logsState.currentLogTask === 'newMonthlyTask';
    return (
      <div className="table-card animated fadeIn">
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className="monthly-log-title">
              <MDBCardTitle>
                Monthly Log
                {!!this.props.logsState.busyDates.monthly.expired.length &&
                  <div className="expired-tasks" onClick={this.showExpiredTask}>
                    <MDBIcon
                      icon="exclamation-triangle"
                      className="icon-exclamation ml-2 mr-1" />
                    <span className="">expired tasks</span>
                  </div>}
              </MDBCardTitle>
              <DatePicker
                showMonthYearPicker
                customInput={customInput}
                locale="en-GB"
                className="date-picker"
                selected={new Date(moment().month(month).year(year))}
                // highlightDates={highlightWithRanges}
                todayButton="This month"
                onChange={this.handleDatePicker} />
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        <PerfectScrollbar className="scroll-tasks mt-2">
          {tasks}
          {!newTask &&
            <MDBContainer onClick={this.addAnotherTask}>
              <MDBCard className="add-task-card">
                <MDBCardBody>
                  <MDBCardText className="text-center">
                    <MDBIcon icon="plus mr-2" />
                    Add {!!tasks.length && 'another '}task
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>}
          {newTask &&
            <NewTaskContainer
              closeNewTask={this.closeNewTask}
              saveNewTask={this.saveNewTask} />}
        </PerfectScrollbar>
      </div>
    );
  }
}

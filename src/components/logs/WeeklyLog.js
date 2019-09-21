import React from 'react';
import ReactDOM from 'react-dom';
import {MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon} from 'mdbreact';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TaskContainer from '../../containers/logs/TaskContainer';
import NewTaskContainer from '../../containers/logs/NewTaskContainer';
import EditTaskContainer from '../../containers/logs/EditTaskContainer';
import * as moment from 'moment';
import DatePicker, {registerLocale} from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
registerLocale('en-GB', enGB);

export default class WeeklyLog extends React.Component {
  componentDidMount() {
    this.props.getWeeklyLog();
  }
  handleDatePicker = date=>{
    let week = moment(date).isoWeek();
    let year = moment(date).year();
    //set correct date at the border week of the year
    if (moment(date).month() === 11 && week === 1)
      year += 1;
    if (moment(date).month() === 0 && week > 5)
      year -= 1;
    let data = {week, year};
    this.props.setWeeklyLogDate(data);
    this.props.getWeeklyLog();
  };
  addAnotherTask = ()=>{
    this.props.setCurrentLogTask('newWeeklyTask');
  };
  saveNewTask = task=>{
    this.props.addWeeklyLogTask(task);
  };
  editTask = task=>{
    this.props.editWeeklyLogTask(task);
  };
  deleteTask = id=>{
    this.props.deleteWeeklyLogTask(id);
  };
  closeNewTask = ()=>{
    this.props.setCurrentLogTask({});
  };
  getTasks = ()=>{
    let { weeklyLog, currentLogTask } = this.props.logsState;
    return weeklyLog.data.map((task, index)=>{
      if (typeof currentLogTask === 'string' || currentLogTask.id !== task.id) {
        return (
          <TaskContainer key={index} task={task} />
        );
      } else {
        return (
          <EditTaskContainer
            key={index}
            logType={'weeklyLog'}
            editTask={this.editTask}
            deleteTask={this.deleteTask} />
        );
      }
    });
  };
  showExpiredTask = ()=>{
    let {year, week} = this.props.logsState.busyDates.weekly.expired[0];
    let data = {year, week};
    this.props.setWeeklyLogDate(data);
    this.props.getWeeklyLog();
  };
  getCustomInput = ()=>{
    let {week, year} = this.props.logsState.weeklyLog;
    let firstDayOfWeek = moment().week(week).year(year).day(1).format('MMM Do YYYY');
    let lastDayOfWeek = moment().week(week).year(year).day(7).format('MMM Do YYYY');
    let selectedDate = `${firstDayOfWeek} - ${lastDayOfWeek} (#${week})`;
    return (
      <MDBCardTitle sub tag="h6">
        <span onClick={this.closeNewTask}>{selectedDate}</span>
      </MDBCardTitle>
    );
  };
  getHighlightWithRanges = ()=>{
    let {week, year} = this.props.logsState.weeklyLog;
    let selectedDates =[];
    let actualDates = [];
    let expiredDates = [];
    for (let i=1; i<8; i++)
    selectedDates.push(new Date( moment().week(week).year(year).day(i)));
    this.props.logsState.busyDates.weekly.actual.forEach(date=>{
      for (let i=1; i<8; i++)
        actualDates.push(
          new Date(moment().week(date.week).year(date.year).day(i).format('MM DD YYYY'))
        );
    });
    this.props.logsState.busyDates.weekly.expired.forEach(date=>{
      for (let i=1; i<8; i++)
        expiredDates.push(
          new Date(moment().week(date.week).year(date.year).day(i).format('MM DD YYYY'))
        );
    });
    return [
      {'react-datepicker__day--highlighted': selectedDates},
      {'react-datepicker__day--highlighted-custom-2': actualDates},
      {'react-datepicker__day--highlighted-custom-1': expiredDates}
    ];
  };
  render() {
    let customInput = this.getCustomInput();
    let tasks = this.getTasks();
    let highlightWithRanges = this.getHighlightWithRanges();
    let newTask = this.props.logsState.currentLogTask === 'newWeeklyTask';
    return (
      <div className="table-card animated fadeIn">
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className="weekly-log-title">
              <MDBCardTitle>
                Weekly Log
                {!!this.props.logsState.busyDates.weekly.expired.length &&
                  <div className="expired-tasks" onClick={this.showExpiredTask}>
                    <MDBIcon
                      icon="exclamation-triangle"
                      className="icon-exclamation ml-2 mr-1" />
                    <span className="">expired tasks</span>
                  </div>}
              </MDBCardTitle>
              <DatePicker
                showWeekNumbers
                customInput={customInput}
                locale="en-GB"
                className="date-picker"
                disabledKeyboardNavigation
                highlightDates={highlightWithRanges}
                todayButton="This week"
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

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


export default class DailyLog extends React.Component {
  componentDidMount() {
    this.props.getDailyLog();
  }
  handleDatePicker = date=>{
    this.props.setDailyLogDate(moment(date));
    this.props.getDailyLog();
  };
  addAnotherTask = ()=>{
    this.props.setCurrentLogTask('newDailyTask');
  };
  saveNewTask = task=>{
    this.props.addDailyLogTask(task);
  };
  editTask = task=>{
    this.props.editDailyLogTask(task);
  };
  deleteTask = id=>{
    this.props.deleteDailyLogTask(id);
  };
  closeNewTask = ()=>{
    this.props.setCurrentLogTask({});
  };
  getTasks = ()=>{
    let { dailyLog, currentLogTask } = this.props.logsState;
    return dailyLog.data.map((task, index)=>{
      if (typeof currentLogTask === 'string' || currentLogTask.id !== task.id) {
        return (
          <TaskContainer key={index} task={task} />
        );
      } else {
        return (
          <EditTaskContainer
            key={index}
            logType={'dailyLog'}
            editTask={this.editTask}
            deleteTask={this.deleteTask} />
        );
      }
    });
  };
  getCustomInput = ()=>{
    let selectedDate = moment(this.props.logsState.dailyLog.date).format('MMMM Do YYYY dddd');
    return (
      <MDBCardTitle sub tag="h6" selected={null}>
        <span onClick={this.closeNewTask}>{selectedDate}</span>
      </MDBCardTitle>
    );
  };
  getHighlightWithRanges = ()=>{
    let actualDates = [];
    let expiredDates = [];
    this.props.logsState.busyDates.daily.actual.forEach(date=>{
      actualDates.push(new Date(date));
    });
    this.props.logsState.busyDates.daily.expired.forEach(date=>{
      expiredDates.push(new Date(date));
    });
    return [
      {'react-datepicker__day--highlighted-custom-2': actualDates},
      {'react-datepicker__day--highlighted-custom-1': expiredDates}
    ];
  };
  render() {
    let customInput = this.getCustomInput();
    let tasks = this.getTasks();
    let highlightWithRanges = this.getHighlightWithRanges();
    let newTask = this.props.logsState.currentLogTask === 'newDailyTask';
    return (
      <div className="table-card animated fadeIn">
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className="daily-log-title">
              <MDBCardTitle>
                Daily Log
                {!!this.props.logsState.busyDates.daily.expired.length &&
                  <MDBIcon
                    icon="exclamation-triangle"
                    className="icon-exclamation ml-2" />}
              </MDBCardTitle>
              <DatePicker
                customInput={customInput}
                locale="en-GB"
                className="date-picker"
                selected={new Date(this.props.logsState.dailyLog.date)}
                highlightDates={highlightWithRanges}
                todayButton="Today"
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

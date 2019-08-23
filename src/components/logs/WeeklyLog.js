import React from 'react';
import ReactDOM from 'react-dom';
import {MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon} from 'mdbreact';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TaskContainer from '../../containers/logs/TaskContainer';
import NewTaskContainer from '../../containers/logs/NewTaskContainer';
import EditTaskContainer from '../../containers/logs/EditTaskContainer';
import * as moment from 'moment';

export default class WeeklyLog extends React.Component {
  componentDidMount() {
    this.props.getWeeklyLog();
  }
  changeDate = ()=>{
    console.log( 'change_date' );
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
          <TaskContainer
            key={index}
            task={task} />
        );
      } else {
        return (
          <EditTaskContainer
            key={index}
            editTask={this.editTask}
            deleteTask={this.deleteTask} />
        );
      }
    });
  };
  render() {
    let {week, year} = this.props.logsState.weeklyLog;
    let firstDayOfWeek = moment().week(week).year(year).day(1).format('MMM Do YYYY');
    let lastDayOfWeek = moment().week(week).year(year).day(7).format('MMM Do YYYY');
    let selectedDate = `${firstDayOfWeek} - ${lastDayOfWeek} (#${week})`;
    let tasks = this.getTasks();
    let newTask = this.props.logsState.currentLogTask === 'newWeeklyTask';
    return (
      <div className="table-card animated fadeIn">
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className="weekly-log-title">
              <MDBCardTitle>Weekly Log</MDBCardTitle>
              <MDBCardTitle
                sub tag="h6"
                className="date-selector"
                onClick={this.changeDate}>
                {selectedDate}
              </MDBCardTitle>
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

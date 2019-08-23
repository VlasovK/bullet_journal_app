import React from 'react';
import ReactDOM from 'react-dom';
import {MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon} from 'mdbreact';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TaskContainer from '../../containers/logs/TaskContainer';
import NewTaskContainer from '../../containers/logs/NewTaskContainer';
import EditTaskContainer from '../../containers/logs/EditTaskContainer';
import * as moment from 'moment';

export default class MonthlyLog extends React.Component {
  componentDidMount() {
    this.props.getMonthlyLog();
  }
  changeDate = ()=>{
    console.log( 'change_date' );
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
    let {year, month} = this.props.logsState.monthlyLog;
    let selectedDate =  moment().set({month, year}).format('MMMM YYYY');
    let tasks = this.getTasks();
    let newTask = this.props.logsState.currentLogTask === 'newMonthlyTask';
    return (
      <div className="table-card animated fadeIn">
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className="monthly-log-title">
              <MDBCardTitle>Monthly Log</MDBCardTitle>
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

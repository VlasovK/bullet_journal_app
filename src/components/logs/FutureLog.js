import React from 'react';
import ReactDOM from 'react-dom';
import {MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon} from 'mdbreact';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TaskContainer from '../../containers/logs/TaskContainer';
import NewTaskContainer from '../../containers/logs/NewTaskContainer';
import EditTaskContainer from '../../containers/logs/EditTaskContainer';
import * as moment from 'moment';

export default class FutureLog extends React.Component {
  componentDidMount() {
    this.props.getFutureLog();
  }
  addAnotherTask = ()=>{
    this.props.setCurrentLogTask('newFutureTask');
  };
  saveNewTask = task=>{
    this.props.addFutureLogTask(task);
  };
  editTask = task=>{
    this.props.editFutureLogTask(task);
  };
  deleteTask = id=>{
    this.props.deleteFutureLogTask(id);
  };
  closeNewTask = ()=>{
    this.props.setCurrentLogTask({});
  };
  getTasks = ()=>{
    let { futureLog, currentLogTask } = this.props.logsState;
    return futureLog.data.map((task, index)=>{
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
    let tasks = this.getTasks();
    let newTask = this.props.logsState.currentLogTask === 'newFutureTask';
    return (
      <div className="table-card animated fadeIn">
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className="future-log-title">
              <MDBCardTitle>Future Log</MDBCardTitle>
              <MDBCardTitle tag="h6" sub>
                Sometime
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

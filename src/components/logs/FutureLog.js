import React from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon
} from 'mdbreact';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TaskContainer from '../../containers/logs/TaskContainer';
import NewTaskContainer from '../../containers/logs/NewTaskContainer';
import EditTaskContainer from '../../containers/logs/EditTaskContainer';

export default class FutureLog extends React.Component {
  addAnotherTask = () => {
    this.props.setCurrentTask('newFutureTask');
  };
  saveNewTask = (task) => {
    this.props.addTask(task);
  };
  editTask = (task) => {
    this.props.editTask(task);
  };
  deleteTask = (id) => {
    this.props.removeTask(id);
  };
  closeNewTask = () => {
    this.props.setCurrentTask({});
  };
  sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (a.status === b.status) {
        return (a.mark - b.mark);
      }
      return (a.status - b.status);
    });
  };
  renderTasks = () => {
    let {tasks, currentTask} = this.props.logsState;
    tasks = tasks.filter((task) => task.logType === 'future');
    tasks = this.sortTasks(tasks);
    return tasks.map((task)=>{
      if (typeof currentTask === 'string' || currentTask.id !== task.id) {
        return <TaskContainer key={task.id} task={task} />;
      }
      return (
        <EditTaskContainer
          key={task.id}
          logType={'future'}
          editTask={this.editTask}
          deleteTask={this.deleteTask}
        />
      );
    });
  };
  render() {
    let tasks = this.renderTasks();
    let newTask = this.props.logsState.currentTask === 'newFutureTask';
    return (
      <div className="table-card animated fadeIn">
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className="future-log-title">
              <MDBCardTitle>Future Log</MDBCardTitle>
              <MDBCardTitle tag="h6" sub className="mt-5-px mb-2-px">
                Someday
              </MDBCardTitle>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        <PerfectScrollbar className="scroll-tasks mt-2">
          {tasks}
          {!newTask && (
            <MDBContainer onClick={this.addAnotherTask}>
              <MDBCard className="add-task-card">
                <MDBCardBody>
                  <MDBCardText className="text-center">
                    <MDBIcon icon="plus mr-2" />
                    Add {!!tasks.length && 'another '}task
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          )}
          {newTask && (
            <NewTaskContainer
              closeNewTask={this.closeNewTask}
              saveNewTask={this.saveNewTask}
              logType='future'
            />
          )}
        </PerfectScrollbar>
      </div>
    );
  }
}

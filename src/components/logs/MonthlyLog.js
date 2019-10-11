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
import moment from 'moment';
import DatePicker, {registerLocale} from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
registerLocale('en-GB', enGB);

export default class MonthlyLog extends React.Component {
  handleDatePicker = (date) => {
    let data = {logType: 'monthly', date: moment(date)};
    this.props.setLogDate(data);
  };
  addAnotherTask = () => {
    this.props.setCurrentTask('newMonthlyTask');
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
  renderTasks = ()=>{
    let {
      tasks,
      currentTask,
      dates: {monthly: currentLogDate}
    } = this.props.logsState;
    tasks = tasks.filter((task) => (
      task.logType === 'monthly' &&
      task.date === currentLogDate.format('L')
    ));
    tasks = this.sortTasks(tasks);
    return tasks.map((task, index) => {
      if (typeof currentTask === 'string' || currentTask.id !== task.id) {
        return <TaskContainer key={index} task={task} />;
      } else {
        return (
          <EditTaskContainer
            key={index}
            logType={'monthly'}
            editTask={this.editTask}
            deleteTask={this.deleteTask}
          />
        );
      }
    });
  };
  showExpiredTask = () => {
    let {year, month} = this.props.logsState.busyDates.monthly.expired[0];
    let data = {year, month};
    this.props.setLogDate(data);
    this.props.getTasks();
  };
  getCustomInput = () => {
    let currentLogDate = this.props.logsState.dates.monthly;
    let selectedDate =  moment(currentLogDate).format('MMMM YYYY');
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
  //     {'month-text--highlighted-custom-2': actualDates},
  //     {'month-text--highlighted-custom-1': expiredDates}
  //   ];
  // };
  render() {
    let currentLogDate = this.props.logsState.dates.monthly;
    let customInput = this.getCustomInput();
    let tasks = this.renderTasks();
    // let highlightWithRanges = this.getHighlightWithRanges();
    let newTask = this.props.logsState.currentTask === 'newMonthlyTask';
    return (
      <div className="table-card animated fadeIn">
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className="monthly-log-title">
              <MDBCardTitle>
                Monthly Log
                {!!this.props.logsState.busyDates.monthly.expired.length && (
                  <div className="expired-tasks" onClick={this.showExpiredTask}>
                    <MDBIcon
                      icon="exclamation-triangle"
                      className="icon-exclamation ml-2 mr-1"
                    />
                    <span className="">expired tasks</span>
                  </div>
                )}
              </MDBCardTitle>
              <DatePicker
                showMonthYearPicker
                customInput={customInput}
                locale="en-GB"
                className="date-picker"
                selected={new Date(moment(currentLogDate))}
                // highlightDates={highlightWithRanges}
                todayButton="This month"
                onChange={this.handleDatePicker} />
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
              logType='monthly'
            />
          )}
        </PerfectScrollbar>
      </div>
    );
  }
}

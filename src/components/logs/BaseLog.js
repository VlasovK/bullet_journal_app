import DatePicker, {registerLocale} from 'react-datepicker';
import EditTaskContainer from '../../containers/logs/EditTaskContainer';
import enGB from 'date-fns/locale/en-GB';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBContainer,
  MDBIcon
} from 'mdbreact';
import moment from 'moment';
import NewTaskContainer from '../../containers/logs/NewTaskContainer';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React from 'react';
import TaskContainer from '../../containers/logs/TaskContainer';
registerLocale('en-GB', enGB);

export default class BaseLog extends React.Component {
  handleDatePicker = date=>{
    let data = {logType: this.props.logType, date: moment(date)};
    this.props.setLogDate(data);
  };
  addAnotherTask = ()=>{
    this.props.setCurrentTask(this.props.logType);
  };
  saveNewTask = task=>{
    this.props.addTask(task);
  };
  editTask = task=>{
    this.props.editTask(task);
  };
  deleteTask = id=>{
    this.props.removeTask(id);
  };
  closeNewTask = ()=>{
    this.props.setCurrentTask({});
  };
  sortTasks = tasks=>{
    return tasks.sort((a, b)=>{
      if (a.status === b.status) {
        return (a.mark - b.mark);
      }
      return (a.status - b.status);
    });
  };
  showExpiredTask = ()=>{
    let sortedByDateTasks = this.state.expiredDates.sort((a, b)=>{
      if (a > b) {
        return 1
      }
      return -1;
    });
    this.handleDatePicker(new Date(sortedByDateTasks[0]));
  };
  capitalizeFirstLetter = text=>{
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
  };
  renderTasks = ()=>{
    let {logType} = this.props;
    let {
      currentTask,
      dates: {[logType]: currentLogDate},
      tasks
    } = this.props.logsState;
    tasks = tasks.filter(task=>(
      task.logType === logType &&
      task.date === currentLogDate.format('L')
    ));
    tasks = this.sortTasks(tasks);
    return tasks.map(task=>{
      if (typeof currentTask === 'string' || currentTask.id !== task.id) {
        return <TaskContainer key={task.id} task={task} />;
      }
      return (
        <EditTaskContainer
          key={task.id}
          logType={logType}
          editTask={this.editTask}
          deleteTask={this.deleteTask}
        />
      );
    });
  };
  render() {
    let {logsState ,logType} = this.props;
    let newTask = logsState.currentTask === logType;
    let customInput = this.getCustomInput
      ? this.getCustomInput()
      : false;
    let tasks = this.renderTasks();
    let highlightWithRanges = this.getHighlightWithRanges
      ? this.getHighlightWithRanges()
      : [];
    let todayButtonText = logType === 'daily'
      ? 'Today'
      : logType === 'weekly'
      ? 'This week'
      : 'This month';
    return (
      <div className="table-card animated fadeIn">
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className={`${logType}-log-title`}>
              <MDBCardTitle>
                {this.capitalizeFirstLetter(logType)} Log
                {(logType === 'daily' || logType === 'weekly') &&
                  !!this.state.expiredDates.length && (
                  <div className="expired-tasks" onClick={this.showExpiredTask}>
                    <MDBIcon
                      icon="exclamation-triangle"
                      className="icon-exclamation ml-2 mr-1"
                    />
                    <span>expired tasks</span>
                  </div>
                )}
              </MDBCardTitle>
              {logType !== 'future' && (
                <DatePicker
                  showMonthYearPicker={logType === 'monthly'}
                  showWeekNumbers={logType === 'weekly'}
                  customInput={customInput}
                  locale="en-GB"
                  className="date-picker"
                  selected={new Date(logsState.dates[logType])}
                  highlightDates={highlightWithRanges}
                  todayButton={todayButtonText}
                  onChange={this.handleDatePicker}
                />
              )}
              {logType === 'future' && (
                <MDBCardTitle tag="h6" sub className="mt-5-px mb-2-px">
                  Someday
                </MDBCardTitle>
              )}
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
              logType={logType}
            />
          )}
        </PerfectScrollbar>
      </div>
    );
  }
}

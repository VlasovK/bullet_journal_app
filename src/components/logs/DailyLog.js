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

export default class DailyLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualDates: [],
      expiredDates: []
    };
  }
  static getDerivedStateFromProps(props, state) {
    let actualDates = [];
    let expiredDates = [];
    props.logsState.tasks.map((task) => {
      if (
        task. logType === 'daily' &&
        moment(task.date).format('L') >= moment().format('L')
      ) {
        actualDates.push(new Date(task.date));
      } else if (
        task. logType === 'daily' &&
        moment(task.date).format('L') < moment().format('L') &&
        task.status !== 3
      ) {
        expiredDates.push(new Date(task.date));
      }
    });
    return {...state, actualDates, expiredDates};
  }
  handleDatePicker = (date) => {
    let data = {logType: 'daily', date: moment(date)};
    this.props.setLogDate(data);
  };
  addAnotherTask = () => {
    this.props.setCurrentTask('newDailyTask');
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
    let {
      tasks,
      currentTask,
      dates: {daily: currentLogDate}
    } = this.props.logsState;
    tasks = tasks.filter((task) => (
      task.logType === 'daily' &&
      task.date === currentLogDate.format('L')
    ))
    tasks = this.sortTasks(tasks);
    return tasks.map((task, index) => {
      if (typeof currentTask === 'string' || currentTask.id !== task.id) {
        return <TaskContainer key={index} task={task} />;
      } else {
        return (
          <EditTaskContainer
            key={index}
            logType={'daily'}
            editTask={this.editTask}
            deleteTask={this.deleteTask}
          />
        );
      }
    });
  };
  showExpiredTask = () => {
    let sortedByDateTasks = this.state.expiredDates.sort((a, b) => {
      if (a > b) {
        return 1
      }
      return -1;
    });
    this.handleDatePicker(new Date(sortedByDateTasks[0]));
  };
  getCustomInput = () => {
    let selectedDate = moment(this.props.logsState.dates.daily)
      .format('MMMM Do YYYY dddd');
    return (
      <MDBCardTitle sub tag="h6" selected={null}>
        <span onClick={this.closeNewTask}>{selectedDate}</span>
      </MDBCardTitle>
    );
  };
  getHighlightWithRanges = () => {
    return [
      {'day--highlighted-custom-2': this.state.actualDates},
      {'day--highlighted-custom-1': this.state.expiredDates}
    ];
  };
  render() {
    let customInput = this.getCustomInput();
    let tasks = this.renderTasks();
    let highlightWithRanges = this.getHighlightWithRanges();
    let newTask = this.props.logsState.currentTask === 'newDailyTask';
    return (
      <div className="table-card animated fadeIn">
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className="daily-log-title">
              <MDBCardTitle>
                Daily Log
                {!!this.state.expiredDates.length && (
                  <div className="expired-tasks" onClick={this.showExpiredTask}>
                    <MDBIcon
                      icon="exclamation-triangle"
                      className="icon-exclamation ml-2 mr-1"
                    />
                    <span>expired tasks</span>
                  </div>
                )}
              </MDBCardTitle>
              <DatePicker
                customInput={customInput}
                locale="en-GB"
                className="date-picker"
                selected={new Date(this.props.logsState.dates.daily)}
                highlightDates={highlightWithRanges}
                todayButton="Today"
                onChange={this.handleDatePicker}
              />
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
              logType='daily'
            />
          )}
        </PerfectScrollbar>
      </div>
    );
  }
}

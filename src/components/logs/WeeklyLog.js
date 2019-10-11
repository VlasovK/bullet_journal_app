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

export default class WeeklyLog extends React.Component {
  handleDatePicker = (date) => {
    let data = {logType: 'weekly', date: moment(date).startOf('isoWeek')};
    this.props.setLogDate(data);
  };
  addAnotherTask = ()=>{
    this.props.setCurrentTask('newWeeklyTask');
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
    tasks = tasks.filter((task) => {
      return task.logType === 'weekly'; // && date === date
    });
    tasks = this.sortTasks(tasks);
    return tasks.map((task, index) => {
      if (typeof currentTask === 'string' || currentTask.id !== task.id) {
        return <TaskContainer key={index} task={task} />;
      }
      return (
        <EditTaskContainer
          key={index}
          logType={'weekly'}
          editTask={this.editTask}
          deleteTask={this.deleteTask}
        />
      );
    });
  };
  showExpiredTask = ()=>{
    let {year, week} = this.props.logsState.busyDates.weekly.expired[0];
    let data = {year, week};
    this.props.setLogDate(data);
    this.props.getTasks();
  };
  getCustomInput = () => {
    let currentLogDate = this.props.logsState.dates.weekly;
    let firstDayOfWeek = currentLogDate.format('MMM Do YYYY');
    let lastDayOfWeek = moment(currentLogDate)
      .endOf('isoWeek')
      .format('MMM Do YYYY');
    let weekNum = currentLogDate.isoWeek();
    let selectedDate = `${firstDayOfWeek} - ${lastDayOfWeek} (#${weekNum})`;

    return (
      <MDBCardTitle sub tag="h6">
        <span onClick={this.closeNewTask}>{selectedDate}</span>
      </MDBCardTitle>
    );
  };
  getHighlightWithRanges = ()=>{
    return [];
    // let {week, year} = this.props.logsState.weekly;
    // let selectedDates =[];
    // let actualDates = [];
    // let expiredDates = [];
    // for (let i=1; i<8; i++)
    // selectedDates.push(new Date( moment().week(week).year(year).day(i)));
    // this.props.logsState.busyDates.weekly.actual.forEach(date=>{
    //   for (let i=1; i<8; i++)
    //     actualDates.push(
    //       new Date(moment().week(date.week).year(date.year).day(i).format('MM DD YYYY'))
    //     );
    // });
    // this.props.logsState.busyDates.weekly.expired.forEach(date=>{
    //   for (let i=1; i<8; i++)
    //     expiredDates.push(
    //       new Date(moment().week(date.week).year(date.year).day(i).format('MM DD YYYY'))
    //     );
    // });
    // return [
    //   {'react-datepicker__day--highlighted': selectedDates},
    //   {'day--highlighted-custom-2': actualDates},
    //   {'day--highlighted-custom-1': expiredDates}
    // ];
  };
  render() {
    let customInput = this.getCustomInput();
    let tasks = this.renderTasks();
    // let highlightWithRanges = this.getHighlightWithRanges();
    let newTask = this.props.logsState.currentTask === 'newWeeklyTask';
    return (
      <div className="table-card animated fadeIn">
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className="weekly-log-title">
              <MDBCardTitle>
                Weekly Log
                {!!this.props.logsState.busyDates.weekly.expired.length && (
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
                showWeekNumbers
                customInput={customInput}
                locale="en-GB"
                className="date-picker"
                disabledKeyboardNavigation
                // highlightDates={highlightWithRanges}
                todayButton="This week"
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
              logType={'weekly'}
            />
          )}
        </PerfectScrollbar>
      </div>
    );
  }
}

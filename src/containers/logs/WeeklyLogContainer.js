import React from 'react';
import {connect} from 'react-redux';
import {setWeeklyLogDate, setCurrentLogTask, getWeeklyLog, addWeeklyLogTask,
  editWeeklyLogTask, deleteWeeklyLogTask} from '../../store/logs/actions';
import WeeklyLog from '../../components/logs/WeeklyLog';

class WeeklyLogContainer extends React.Component {
  render() {
    return (
      <WeeklyLog
        logsState={this.props.logsState}
        logType={this.props.logType}
        setWeeklyLogDate={this.props.setWeeklyLogDate}
        setCurrentLogTask={this.props.setCurrentLogTask}
        getWeeklyLog={this.props.getWeeklyLog}
        addWeeklyLogTask={this.props.addWeeklyLogTask}
        editWeeklyLogTask={this.props.editWeeklyLogTask}
        deleteWeeklyLogTask={this.props.deleteWeeklyLogTask} />
    );
  }
}

let mapStateToProps = state=>{
  return {
    logsState: state.logsState
  };
};
let mapDispatchToProps = {setWeeklyLogDate, setCurrentLogTask, getWeeklyLog,
  addWeeklyLogTask, editWeeklyLogTask, deleteWeeklyLogTask};
export default connect(mapStateToProps, mapDispatchToProps)(WeeklyLogContainer);

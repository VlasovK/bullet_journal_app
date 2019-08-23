import React from 'react';
import {connect} from 'react-redux';
import {setCurrentLogTask, getWeeklyLog, addWeeklyLogTask, editWeeklyLogTask,
  deleteWeeklyLogTask} from '../../store/logs/actions';
import WeeklyLog from '../../components/logs/WeeklyLog';

class WeeklyLogContainer extends React.Component {
  render() {
    return (
      <WeeklyLog
        logsState={this.props.logsState}
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
let mapDispatchToProps = {setCurrentLogTask, getWeeklyLog, addWeeklyLogTask,
  editWeeklyLogTask, deleteWeeklyLogTask};
export default connect(mapStateToProps, mapDispatchToProps)(WeeklyLogContainer);
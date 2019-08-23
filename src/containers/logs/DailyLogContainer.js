import React from 'react';
import {connect} from 'react-redux';
import {setCurrentLogTask, getDailyLog, addDailyLogTask, editDailyLogTask,
  deleteDailyLogTask} from '../../store/logs/actions';
import DailyLog from '../../components/logs/DailyLog';

class DailyLogContainer extends React.Component {
  render() {
    return (
      <DailyLog
        logsState={this.props.logsState}
        setCurrentLogTask={this.props.setCurrentLogTask}
        getDailyLog={this.props.getDailyLog}
        addDailyLogTask={this.props.addDailyLogTask}
        editDailyLogTask={this.props.editDailyLogTask}
        deleteDailyLogTask={this.props.deleteDailyLogTask} />
    );
  }
}

let mapStateToProps = state=>{
  return {
    logsState: state.logsState
  };
};
let mapDispatchToProps = {setCurrentLogTask, getDailyLog, addDailyLogTask,
  editDailyLogTask, deleteDailyLogTask};
export default connect(mapStateToProps, mapDispatchToProps)(DailyLogContainer);
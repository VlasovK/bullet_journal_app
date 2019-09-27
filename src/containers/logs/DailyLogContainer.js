import React from 'react';
import {connect} from 'react-redux';
import {setDailyLogDate, setCurrentLogTask, getDailyLog, addDailyLogTask,
  editDailyLogTask, deleteDailyLogTask} from '../../store/logs/actions';
import DailyLog from '../../components/logs/DailyLog';

class DailyLogContainer extends React.Component {
  render() {
    return (
      <DailyLog
        logsState={this.props.logsState}
        logType={this.props.logType}
        setDailyLogDate={this.props.setDailyLogDate}
        setCurrentLogTask={this.props.setCurrentLogTask}
        getDailyLog={this.props.getDailyLog}
        addDailyLogTask={this.props.addDailyLogTask}
        editDailyLogTask={this.props.editDailyLogTask}
        deleteDailyLogTask={this.props.deleteDailyLogTask}
      />
    );
  }
}

let mapStateToProps = state=>({logsState: state.logsState});
let mapDispatchToProps = {setDailyLogDate, setCurrentLogTask, getDailyLog,
  addDailyLogTask, editDailyLogTask, deleteDailyLogTask};
export default connect(mapStateToProps, mapDispatchToProps)(DailyLogContainer);

import React from 'react';
import {connect} from 'react-redux';
import {setCurrentLogTask, getMonthlyLog, addMonthlyLogTask, editMonthlyLogTask,
  deleteMonthlyLogTask} from '../../store/logs/actions';
import MonthlyLog from '../../components/logs/MonthlyLog';

class MonthlyLogContainer extends React.Component {
  render() {
    return (
      <MonthlyLog
        logsState={this.props.logsState}
        setCurrentLogTask={this.props.setCurrentLogTask}
        getMonthlyLog={this.props.getMonthlyLog}
        addMonthlyLogTask={this.props.addMonthlyLogTask}
        editMonthlyLogTask={this.props.editMonthlyLogTask}
        deleteMonthlyLogTask={this.props.deleteMonthlyLogTask} />
    );
  }
}

let mapStateToProps = state=>{
  return {
    logsState: state.logsState
  };
};
let mapDispatchToProps = {setCurrentLogTask, getMonthlyLog, addMonthlyLogTask,
  editMonthlyLogTask, deleteMonthlyLogTask};
export default connect(mapStateToProps, mapDispatchToProps)(MonthlyLogContainer);

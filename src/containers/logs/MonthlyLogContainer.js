import React from 'react';
import {connect} from 'react-redux';
import {
  setLogDate,
  setCurrentTask,
  addTask,
  editTask,
  removeTask
} from '../../store/logs/actions';
import MonthlyLog from '../../components/logs/MonthlyLog';

class MonthlyLogContainer extends React.Component {
  render() {
    return (
      <MonthlyLog
        logsState={this.props.logsState}
        logType={this.props.logType}
        setLogDate={this.props.setLogDate}
        setCurrentTask={this.props.setCurrentTask}
        addTask={this.props.addTask}
        editTask={this.props.editTask}
        removeTask={this.props.removeTask}
      />
    );
  }
}

let mapStateToProps = (state) => ({logsState: state.logsState});
let mapDispatchToProps = {
  setLogDate,
  setCurrentTask,
  addTask,
  editTask,
  removeTask
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthlyLogContainer);

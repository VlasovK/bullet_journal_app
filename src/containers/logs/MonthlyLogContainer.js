import {
  addTask,
  editTask,
  removeTask,
  setCurrentTask,
  setLogDate
} from '../../store/logs/actions';
import {connect} from 'react-redux';
import MonthlyLog from '../../components/logs/MonthlyLog';
import React from 'react';

function MonthlyLogContainer(props) {
  return (
    <MonthlyLog
      addTask={props.addTask}
      editTask={props.editTask}
      logsState={props.logsState}
      logType={props.logType}
      removeTask={props.removeTask}
      setCurrentTask={props.setCurrentTask}
      setLogDate={props.setLogDate}
    />
  );
}

let mapStateToProps = state=>({logsState: state.logsState});
let mapDispatchToProps = {
  addTask,
  editTask,
  removeTask,
  setLogDate,
  setCurrentTask
};
export default connect(
  mapStateToProps, mapDispatchToProps
)(MonthlyLogContainer);

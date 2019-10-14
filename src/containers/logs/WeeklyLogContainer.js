import React from 'react';
import {connect} from 'react-redux';
import {
  setLogDate,
  setCurrentTask,
  addTask,
  editTask,
  removeTask
} from '../../store/logs/actions';
import WeeklyLog from '../../components/logs/WeeklyLog';

function WeeklyLogContainer(props) {
  return (
    <WeeklyLog
      logsState={props.logsState}
      logType={props.logType}
      setLogDate={props.setLogDate}
      setCurrentTask={props.setCurrentTask}
      addTask={props.addTask}
      editTask={props.editTask}
      removeTask={props.removeTask}
    />
  );
}

let mapStateToProps = state=>({logsState: state.logsState});
let mapDispatchToProps = {
  setLogDate,
  setCurrentTask,
  addTask,
  editTask,
  removeTask
};
export default connect(mapStateToProps, mapDispatchToProps)(WeeklyLogContainer);

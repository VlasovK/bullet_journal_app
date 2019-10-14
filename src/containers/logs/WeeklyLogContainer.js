import {
  addTask,
  editTask,
  removeTask,
  setCurrentTask,
  setLogDate
} from '../../store/logs/actions';
import {connect} from 'react-redux';
import React from 'react';
import WeeklyLog from '../../components/logs/WeeklyLog';

function WeeklyLogContainer(props) {
  return (
    <WeeklyLog
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
  setCurrentTask,
  setLogDate
};
export default connect(mapStateToProps, mapDispatchToProps)(WeeklyLogContainer);

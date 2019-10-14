import {
  addTask,
  editTask,
  removeTask,
  setCurrentTask,
  setLogDate
} from '../../store/logs/actions';
import {connect} from 'react-redux';
import DailyLog from '../../components/logs/DailyLog';
import React from 'react';

function DailyLogContainer(props) {
  return (
    <DailyLog
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
export default connect(mapStateToProps, mapDispatchToProps)(DailyLogContainer);

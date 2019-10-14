import {
  addTask,
  editTask,
  removeTask,
  setCurrentTask
} from '../../store/logs/actions';
import {connect} from 'react-redux';
import FutureLog from '../../components/logs/FutureLog';
import React from 'react';

function FutureLogContainer(props) {
  return (
    <FutureLog
      addTask={props.addTask}
      editTask={props.editTask}
      logsState={props.logsState}
      logType={props.logType}
      removeTask={props.removeTask}
      setCurrentTask={props.setCurrentTask}
    />
  );
}

let mapStateToProps = state=>({logsState: state.logsState});
let mapDispatchToProps = {
  addTask,
  editTask,
  removeTask,
  setCurrentTask
};
export default connect(mapStateToProps, mapDispatchToProps)(FutureLogContainer);

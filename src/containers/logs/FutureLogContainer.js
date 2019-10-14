import React from 'react';
import {connect} from 'react-redux';
import {
  setCurrentTask,
  addTask,
  editTask,
  removeTask
} from '../../store/logs/actions';
import FutureLog from '../../components/logs/FutureLog';

function FutureLogContainer(props) {
  return (
    <FutureLog
      logType={props.logType}
      logsState={props.logsState}
      setCurrentTask={props.setCurrentTask}
      addTask={props.addTask}
      editTask={props.editTask}
      removeTask={props.removeTask}
    />
  );
}

let mapStateToProps = (state) => ({logsState: state.logsState});
let mapDispatchToProps = {
  setCurrentTask,
  addTask,
  editTask,
  removeTask
};
export default connect(mapStateToProps, mapDispatchToProps)(FutureLogContainer);

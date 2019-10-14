import {connect} from 'react-redux';
import NewTask from '../../components/logs/NewTask';
import React from 'react';

function NewTaskContainer(props) {
  return (
    <NewTask
      closeNewTask={props.closeNewTask}
      logsState={props.logsState}
      logType={props.logType}
      saveNewTask={props.saveNewTask}
    />
  );
}

let mapStateToProps = state=>({logsState: state.logsState});
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(NewTaskContainer);

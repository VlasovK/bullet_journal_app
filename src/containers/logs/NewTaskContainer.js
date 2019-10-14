import React from 'react';
import {connect} from 'react-redux';
import NewTask from '../../components/logs/NewTask';

function NewTaskContainer(props) {
  return (
    <NewTask
      logsState={props.logsState}
      closeNewTask={props.closeNewTask}
      saveNewTask={props.saveNewTask}
      logType={props.logType}
    />
  );
}

let mapStateToProps = state=>({logsState: state.logsState});
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(NewTaskContainer);
